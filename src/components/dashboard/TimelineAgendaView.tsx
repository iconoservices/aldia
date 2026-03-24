import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight, CalendarDays, Filter, Trash2, X } from 'lucide-react';

interface TimelineAgendaViewProps {
    calendarEvents: any[];
    projects: any[];
    rutinas?: any[];
    habits?: any[];
    timeBlocks?: any[];
    onRemoveEvent?: (id: number) => void;
    onUpdateEvent?: (id: number, updates: any) => void;
    onRemoveRoutine?: (id: number) => void;
    onUpdateRoutine?: (id: number, updates: any) => void;
    onRemoveTimeBlock?: (id: number) => void;
    onUpdateTimeBlock?: (id: number, updates: any) => void;
    missions?: any[];
    onToggleMission?: (id: number) => void;
    onToggleHabit?: (id: number, dayIdx: number) => void;
    onToggleRoutineItem?: (routineId: number, itemId: number) => void;
}

export const TimelineAgendaView = ({ 
    calendarEvents, projects, rutinas = [], habits = [], timeBlocks = [], missions = [], 
    onRemoveEvent, onUpdateEvent, onRemoveRoutine, onUpdateRoutine, onRemoveTimeBlock, onUpdateTimeBlock, 
    onToggleMission, onToggleHabit, onToggleRoutineItem 
}: TimelineAgendaViewProps) => {
    const [viewMode, setViewMode] = useState<'timeline' | 'month' | 'appointments' | 'tasks'>('timeline');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editingItem, setEditingItem] = useState<{ type: 'calendar' | 'routine' | 'timeblock', data: any } | null>(null);
    
    // Estado para edición
    const [editTitle, setEditTitle] = useState('');
    const [editStart, setEditStart] = useState('');
    const [editEnd, setEditEnd] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Sincronizar estado de edición al abrir el modal
    useEffect(() => {
        if (editingItem) {
            const { type, data } = editingItem;
            if (type === 'calendar') {
                setEditTitle(data.title || '');
                setEditStart(data.startTime || '');
                setEditEnd(data.endTime || '');
            } else if (type === 'routine') {
                setEditTitle(data.title || '');
                setEditStart(data.startTime || '');
                setEditEnd(data.endTime || '');
            } else if (type === 'timeblock') {
                setEditTitle(data.label || '');
                setEditStart(data.start || '');
                setEditEnd(data.end || '');
            }
        }
    }, [editingItem]);
    
    // Formato YYYY-MM-DD local para comparación con eventos e identificación de día
    const todayStr = selectedDate.toLocaleDateString('en-CA');
    const dayIdx = (selectedDate.getDay() + 6) % 7; // 0=Lunes, ..., 6=Domingo
    const isActualToday = todayStr === new Date().toLocaleDateString('en-CA');
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // 1. Auto-scroll al momento actual — dispara en mount y al cambiar de vista
    useEffect(() => {
        if (viewMode !== 'timeline' || !isActualToday) return;
        
        const scrollToNow = () => {
            const container = scrollRef.current;
            if (!container) return;
            const now = new Date();
            // 60px por hora, offset para centrar la línea roja
            const targetPx = Math.max(0, (now.getHours() * 60 + now.getMinutes()) - 80);
            container.scrollTop = targetPx;
        };

        // Primer intento inmediato
        scrollToNow();
        // Segundo intento diferido (asegura que el DOM está pintado)
        const timer = setTimeout(scrollToNow, 300);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewMode, isActualToday]);

    // 2. Navegación
    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const changeMonth = (months: number) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + months);
        setSelectedDate(newDate);
    };

    // Helper: convierte "HH:MM" a minutos desde medianoche → directo a px (1 min = 1 px)
    const toMin = (t?: string) => {
        if (!t) return -1;
        const [hh, mm] = t.split(':').map(Number);
        return hh * 60 + (mm || 0);
    };

    // 3. Filtrar entregas del proyecto para el día seleccionado
    const dayDeliveries = useMemo(() => {
        const delivs: any[] = [];
        projects.forEach(p => {
            (p.objectives || []).forEach((obj: any) => {
                if (obj.dueDate === todayStr) delivs.push({ ...obj, projectName: p.name, projectColor: p.color, type: 'objective' });
                (obj.nodes || []).forEach((node: any) => {
                    if (node.dueDate === todayStr) delivs.push({ ...node, projectName: p.name, projectColor: p.color, type: 'meta' });
                });
            });
        });
        return delivs;
    }, [projects, todayStr]);

    // 4. Eventos y Misiones con hora
    const dayEvents = useMemo(() => {
        const items = (calendarEvents || []).filter(e => e.date === todayStr).map(e => ({
            ...e,
            itemType: 'event',
            color: e.color || '#3b82f6',
            startMin: toMin(e.startTime),
            endMin: toMin(e.endTime)
        }));
        return items.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    }, [calendarEvents, todayStr]);

    // 5. Rutinas del día con Reset Visual
    const dayRutinas = useMemo(() => {
        return rutinas.filter(r => r.isActive && r.repeatDays?.includes(dayIdx)).map(r => ({
            ...r,
            items: (r.items || []).map((it: any) => ({
                ...it,
                // Si la fecha de completado no es HOY, se muestra como no completado visualmente
                completed: it.completed && it.completedDate === todayStr
            }))
        }));
    }, [rutinas, dayIdx, todayStr]);

    // 5.1 Misiones (Tareas) unificadas para la lista superior
    const dayMissions = useMemo(() => {
        // Solo Misiones (Tareas específicas con fecha o repetición)
        const dayMissionsList = (missions || []).filter(m => {
            if (m.dueDate === todayStr) return true;
            if (m.repeatDays?.includes(dayIdx)) return true;
            return false;
        }).map(m => ({ ...m, type: 'mission' }));

        return dayMissionsList.sort((a, b) => (a.dueTime || '99:99').localeCompare(b.dueTime || '99:99'));
    }, [missions, todayStr, dayIdx]);

    // 6. Vista Mensual Logic
    const monthDays = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const padding = firstDay === 0 ? 6 : firstDay - 1;
        
        return {
            padding: Array.from({ length: padding }),
            days: Array.from({ length: daysInMonth }).map((_, i) => i + 1)
        };
    }, [selectedDate]);

    const currentTime = new Date();
    const currentPos = (currentTime.getHours() * 60) + currentTime.getMinutes();

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
            {/* Header / Navigation */}
            <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid #E2E8F0', borderRadius: '0 0 24px 24px', zIndex: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-carbon)' }}>
                            {viewMode === 'month' ? monthNames[selectedDate.getMonth()] : todayStr}
                        </h2>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
                            {viewMode.toUpperCase()}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => viewMode === 'month' ? changeMonth(-1) : changeDate(-1)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
                        <button onClick={() => setSelectedDate(new Date())} style={{ background: '#F1F5F9', border: 'none', borderRadius: '10px', padding: '8px 12px', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer' }}>HOY</button>
                        <button onClick={() => viewMode === 'month' ? changeMonth(1) : changeDate(1)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer' }}><ChevronRight size={18} /></button>
                    </div>
                </div>

                {/* View Switcher */}
                <div style={{ display: 'flex', gap: '2px', background: '#F1F5F9', padding: '3px', borderRadius: '14px', marginBottom: '1rem', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <button onClick={() => setViewMode('timeline')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', padding: '8px 4px', border: 'none', borderRadius: '10px', background: viewMode === 'timeline' ? 'white' : 'transparent', fontSize: '0.65rem', fontWeight: 900, color: viewMode === 'timeline' ? 'var(--domain-orange)' : '#64748B', transition: 'all 0.2s', boxShadow: viewMode === 'timeline' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', flexShrink: 1, minWidth: 0 }}>
                        <Clock size={12} /> TIMELINE
                    </button>
                    <button onClick={() => setViewMode('month')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', padding: '8px 4px', border: 'none', borderRadius: '10px', background: viewMode === 'month' ? 'white' : 'transparent', fontSize: '0.65rem', fontWeight: 900, color: viewMode === 'month' ? 'var(--domain-orange)' : '#64748B', transition: 'all 0.2s', boxShadow: viewMode === 'month' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', flexShrink: 1, minWidth: 0 }}>
                        <CalendarDays size={12} /> MES
                    </button>
                    <button onClick={() => setViewMode('appointments')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', padding: '8px 4px', border: 'none', borderRadius: '10px', background: viewMode === 'appointments' ? 'white' : 'transparent', fontSize: '0.65rem', fontWeight: 900, color: viewMode === 'appointments' ? 'var(--domain-orange)' : '#64748B', transition: 'all 0.2s', boxShadow: viewMode === 'appointments' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', flexShrink: 1, minWidth: 0 }}>
                        <Filter size={12} /> CITAS
                    </button>
                    <button onClick={() => setViewMode('tasks')} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', padding: '8px 4px', border: 'none', borderRadius: '10px', background: viewMode === 'tasks' ? 'white' : 'transparent', fontSize: '0.65rem', fontWeight: 900, color: viewMode === 'tasks' ? 'var(--domain-orange)' : '#64748B', transition: 'all 0.2s', boxShadow: viewMode === 'tasks' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', flexShrink: 1, minWidth: 0 }}>
                        <Calendar size={12} /> TAREAS
                    </button>
                </div>

                {/* Resumen de Entregas (Solo hoy/seleccionado) */}
                <AnimatePresence>
                    {viewMode !== 'month' && dayDeliveries.length > 0 && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}
                        >
                            {dayDeliveries.map((d, i) => (
                                <div key={i} style={{ background: 'white', border: `1px solid ${d.projectColor || '#E2E8F0'}`, padding: '10px 14px', borderRadius: '14px', minWidth: '130px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.6rem', fontWeight: 800, color: d.projectColor }}>ENTREGA</div>
                                        <Calendar size={10} color={d.projectColor} opacity={0.6} />
                                    </div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-carbon)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.title}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }} ref={scrollRef}>
                {viewMode === 'timeline' && (
                    <div style={{ position: 'relative', minHeight: '1440px' }}>
                        {/* Current Time Line */}
                        {isActualToday && (
                            <div style={{ position: 'absolute', top: currentPos, left: 0, right: 0, height: '2px', background: '#ef4444', zIndex: 10, pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', left: 62, top: -9, background: '#ef4444', color: 'white', fontSize: '0.6rem', padding: '2px 5px', borderRadius: '4px', fontWeight: 900 }}>AHORA</div>
                            </div>
                        )}

                        {/* Rutinas — overlay */}
                        {dayRutinas.map(r => {
                            const startPx = toMin(r.startTime);
                            const endPx = toMin(r.endTime);
                            if (startPx < 0 || endPx <= startPx) return null;
                            const h = endPx - startPx;
                            return (
                                <div 
                                    key={`rtbg-${r.id}`} 
                                    onClick={() => setEditingItem({ type: 'routine', data: r })}
                                    style={{ position: 'absolute', top: startPx, left: 60, right: 0, height: h, background: `${r.color}10`, borderLeft: `4px solid ${r.color}50`, zIndex: 1, display: 'flex', alignItems: 'flex-start', paddingLeft: '10px', paddingTop: '6px', overflow: 'hidden', cursor: 'pointer' }}
                                >
                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: r.color, opacity: 0.7 }}>{r.title} · {r.startTime}–{r.endTime}</span>
                                </div>
                            );
                        })}

                        {/* TimeBlocks — overlay */}
                        {timeBlocks.map((b: any) => {
                            const startPx = toMin(b.start);
                            const endPx = toMin(b.end);
                            if (startPx < 0 || endPx <= startPx) return null;
                            const h = endPx - startPx;
                            return (
                                <div 
                                    key={`blkbg-${b.id}`} 
                                    onClick={() => setEditingItem({ type: 'timeblock', data: b })}
                                    style={{ position: 'absolute', top: startPx, left: 60, right: 0, height: h, background: `${b.color}06`, borderLeft: `2px dashed ${b.color}40`, zIndex: 1, display: 'flex', alignItems: 'flex-end', paddingLeft: '10px', paddingBottom: '4px', overflow: 'hidden', cursor: 'pointer' }}
                                >
                                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: b.color, opacity: 0.5 }}>{b.label}</span>
                                </div>
                            );
                        })}

                        {/* Citas — overlay */}
                        {dayEvents.map((item: any) => {
                            const startPx = item.startMin;
                            const endPx = item.endMin;
                            if (startPx < 0) return null;
                            const evH = endPx > startPx ? endPx - startPx : 52;
                            return (
                                <motion.div
                                    key={`ev-${item.id}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{ position: 'absolute', top: startPx, left: 64, right: 6, height: evH, background: item.color || '#6366F1', borderRadius: '12px', padding: '6px 10px', color: 'white', zIndex: 5, boxShadow: '0 4px 12px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}
                                    onClick={() => setEditingItem({ type: 'calendar', data: item })}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '4px' }}>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <Clock size={11} />
                                                {item.title}
                                            </div>
                                            <div style={{ fontSize: '0.6rem', opacity: 0.85 }}>{item.startTime} - {item.endTime || '...'}</div>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onRemoveEvent) onRemoveEvent(item.id);
                                            }}
                                            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', padding: '4px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Hora grid lines */}
                        {hours.map(h => (
                            <div key={h} style={{ height: '60px', borderBottom: '1px solid #F1F5F9', display: 'flex', position: 'relative' }}>
                                <div style={{ width: '60px', flexShrink: 0, fontSize: '0.68rem', color: '#94A3B8', textAlign: 'right', paddingRight: '10px', paddingTop: '6px', fontWeight: 700 }}>
                                    {h.toString().padStart(2, '0')}:00
                                </div>
                                <div style={{ flex: 1 }} />
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'appointments' && (
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#64748B', marginBottom: '10px' }}>CITAS Y AGENDA</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {dayEvents.length > 0 ? dayEvents.map((e: any) => (
                                <div 
                                    key={e.id} 
                                    onClick={() => setEditingItem({ type: 'calendar', data: e })}
                                    style={{ background: 'white', padding: '16px', borderRadius: '18px', borderLeft: `6px solid ${e.color}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-carbon)' }}>{e.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {e.startTime} - {e.endTime}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            if (onRemoveEvent) onRemoveEvent(e.id);
                                        }}
                                        style={{ background: '#FEF2F2', border: 'none', borderRadius: '10px', padding: '8px', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )) : (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#CBD5E1', fontSize: '0.8rem', fontWeight: 700 }}>No hay citas para hoy</div>
                            )}
                        </div>
                    </div>
                )}

                {viewMode === 'month' && (
                    <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                        {dayNames.map(day => (
                            <div key={day} style={{ textAlign: 'center', color: '#CBD5E1', fontWeight: 900, fontSize: '0.65rem', padding: '8px 0' }}>{day}</div>
                        ))}
                        {monthDays.padding.map((_, i) => (
                            <div key={`p-${i}`} style={{ height: '70px', opacity: 0 }} />
                        ))}
                        {monthDays.days.map(day => {
                            const dateStr = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                            const isToday = dateStr === new Date().toLocaleDateString('en-CA');
                            const hasEvents = (calendarEvents || []).some(e => e.date === dateStr);
                            
                            return (
                                <div 
                                    key={day} 
                                    onClick={() => {
                                        const newDate = new Date(selectedDate);
                                        newDate.setDate(day);
                                        setSelectedDate(newDate);
                                        setViewMode('timeline');
                                    }}
                                    style={{ 
                                        height: '70px', 
                                        border: isToday ? '2px solid var(--domain-orange)' : '1px solid #F1F5F9', 
                                        borderRadius: '12px', 
                                        padding: '6px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        background: isToday ? 'rgba(255,140,66,0.05)' : 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: isToday ? 'var(--domain-orange)' : '#64748B' }}>{day}</span>
                                    {hasEvents && <div style={{ width: '6px', height: '6px', borderRadius: '3px', background: 'var(--domain-orange)', marginTop: '4px' }} />}
                                </div>
                            );
                        })}
                    </div>
                )}

                {viewMode === 'tasks' && (
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#64748B', marginBottom: '10px' }}>TAREAS PARA ESTE DÍA</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {dayMissions.length > 0 ? dayMissions.map((m: any) => (
                                <div 
                                    key={m.id} 
                                    style={{ 
                                        background: 'white', 
                                        padding: '14px 18px', 
                                        borderRadius: '20px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                        border: m.completed ? '1px solid #E2E8F0' : '1px solid transparent',
                                        opacity: m.completed ? 0.7 : 1
                                    }}
                                >
                                    <button 
                                        onClick={() => onToggleMission?.(m.id)}
                                        style={{ 
                                            width: '24px', height: '24px', borderRadius: '8px', 
                                            border: m.completed ? 'none' : '2px solid #E2E8F0',
                                            background: m.completed ? 'var(--domain-green)' : 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {m.completed && <X size={14} color="white" strokeWidth={4} />}
                                    </button>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: m.completed ? '#94A3B8' : 'var(--text-carbon)', textDecoration: m.completed ? 'line-through' : 'none' }}>
                                            {m.text}
                                        </div>
                                        {m.dueTime && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                                <Clock size={10} color="var(--domain-orange)" />
                                                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--domain-orange)' }}>{m.dueTime}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div style={{ padding: '3rem', textAlign: 'center', color: '#CBD5E1' }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800 }}>No hay misiones para hoy</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.7rem', fontWeight: 600 }}>Tus hábitos y rutinas están en la pestaña Vida</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Polymorphic Action Modal */}
            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}
                        onClick={() => setEditingItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', borderRadius: '28px', padding: '1.8rem', width: '100%', maxWidth: '380px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-carbon)' }}>
                                    {editingItem.type === 'calendar' ? 'Editar Cita' : editingItem.type === 'routine' ? 'Editar Rutina' : 'Editar Bloque'}
                                </h3>
                                <button onClick={() => setEditingItem(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: '8px', color: '#64748B', display: 'flex' }}><X size={18} /></button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>{editingItem.type === 'timeblock' ? 'Nombre del Bloque' : 'Título'}</label>
                                    <input 
                                        type="text" 
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="Nombre..."
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #F1F5F9', fontSize: '0.9rem', fontWeight: 700, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Inicio</label>
                                        <input 
                                            type="time" 
                                            value={editStart}
                                            onChange={(e) => setEditStart(e.target.value)}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '2px solid #F1F5F9', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Fin</label>
                                        <input 
                                            type="time" 
                                            value={editEnd}
                                            onChange={(e) => setEditEnd(e.target.value)}
                                            style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '2px solid #F1F5F9', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button
                                    onClick={() => {
                                        if (editingItem.type === 'calendar' && onUpdateEvent) {
                                            onUpdateEvent(editingItem.data.id, { title: editTitle, startTime: editStart, endTime: editEnd });
                                        } else if (editingItem.type === 'routine' && onUpdateRoutine) {
                                            onUpdateRoutine(editingItem.data.id, { title: editTitle, startTime: editStart, endTime: editEnd });
                                        } else if (editingItem.type === 'timeblock' && onUpdateTimeBlock) {
                                            onUpdateTimeBlock(editingItem.data.id, { label: editTitle, start: editStart, end: editEnd });
                                        }
                                        setEditingItem(null);
                                    }}
                                    style={{ width: '100%', background: 'linear-gradient(135deg, var(--domain-orange), #FF8C00)', color: 'white', border: 'none', borderRadius: '14px', padding: '14px', fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 126, 0, 0.25)', transition: 'transform 0.2s' }}
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    onClick={() => {
                                        if (editingItem.type === 'calendar' && onRemoveEvent) onRemoveEvent(editingItem.data.id);
                                        else if (editingItem.type === 'routine' && onRemoveRoutine) onRemoveRoutine(editingItem.data.id);
                                        else if (editingItem.type === 'timeblock' && onRemoveTimeBlock) onRemoveTimeBlock(editingItem.data.id);
                                        setEditingItem(null);
                                    }}
                                    style={{ width: '100%', background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '14px', padding: '12px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    <Trash2 size={16} /> Eliminar {editingItem.type === 'calendar' ? 'Cita' : editingItem.type === 'routine' ? 'Rutina' : 'Bloque'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
