import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { CalendarEvent, TimeBlock } from '../../hooks/useAlDiaState';

interface CalendarioViewProps {
    agenda: CalendarEvent[];
    timeBlocks: TimeBlock[];
}

export const CalendarioView = ({ agenda, timeBlocks }: CalendarioViewProps) => {
    // console.log('TimeBlocks ready for V2 visualization:', timeBlocks.length);
    const [viewMode, setViewMode] = useState<'month' | 'week'>('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [nowLinePos, setNowLinePos] = useState(new Date().getHours() * 50 + (new Date().getMinutes() / 60) * 50);

    // Actualizar la línea de "Ahora" cada minuto
    useState(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setNowLinePos(now.getHours() * 50 + (now.getMinutes() / 60) * 50);
        }, 60000);
        return () => clearInterval(interval);
    });

    const goToToday = () => setCurrentDate(new Date());

    // Auxiliares para cálculo de fechas
    /* const startOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para que empiece en Lunes
        return new Date(d.setDate(diff));
    };

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => {
        const first = new Date(year, month, 1).getDay();
        return first === 0 ? 6 : first - 1; // Ajuste para Lunes
    }; */

    const nextPeriod = () => {
        const next = new Date(currentDate);
        if (viewMode === 'month') next.setMonth(next.getMonth() + 1);
        else next.setDate(next.getDate() + 7);
        setCurrentDate(next);
    };

    const prevPeriod = () => {
        const prev = new Date(currentDate);
        if (viewMode === 'month') prev.setMonth(prev.getMonth() - 1);
        else prev.setDate(prev.getDate() - 7);
        setCurrentDate(prev);
    };

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    // Renderizado Sugerido
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
            {/* HEADER DEL CALENDARIO */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '0.8rem 1.2rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'rgba(255, 140, 66, 0.1)', color: 'var(--domain-orange)', padding: '10px', borderRadius: '14px' }}>
                        <CalendarIcon size={20} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-carbon)' }}>
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#AAA', fontWeight: 600 }}>
                            {viewMode === 'month' ? 'Vista Mensual' : 'Vista Semanal'}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                        onClick={goToToday}
                        style={{ background: '#F0EBE6', border: 'none', padding: '6px 14px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 900, color: 'var(--domain-orange)', cursor: 'pointer', marginRight: '8px' }}
                    >
                        HOY
                    </button>

                    <div style={{ display: 'flex', background: '#F5F5F5', padding: '4px', borderRadius: '12px', marginRight: '0.5rem' }}>
                        <button 
                            onClick={() => setViewMode('week')}
                            style={{ padding: '6px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 800, background: viewMode === 'week' ? 'white' : 'transparent', color: viewMode === 'week' ? 'var(--domain-orange)' : '#AAA', boxShadow: viewMode === 'week' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
                            SEMANA
                        </button>
                        <button 
                            onClick={() => setViewMode('month')}
                            style={{ padding: '6px 12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 800, background: viewMode === 'month' ? 'white' : 'transparent', color: viewMode === 'month' ? 'var(--domain-orange)' : '#AAA', boxShadow: viewMode === 'month' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
                            MES
                        </button>
                    </div>
                    
                    <button onClick={prevPeriod} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #EEE', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={16} /></button>
                    <button onClick={nextPeriod} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #EEE', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} /></button>
                </div>
            </div>

            {/* GRID DEL CALENDARIO */}
            <div className="glass-card" style={{ padding: '0.8rem', background: 'white', minHeight: '400px', overflowY: 'auto' }}>
                {viewMode === 'week' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0', maxHeight: '500px', overflowY: 'auto', position: 'relative' }}>
                        {/* Horas */}
                        <div style={{ display: 'grid', gridTemplateRows: 'repeat(24, 50px)' }}>
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} style={{ fontSize: '0.65rem', color: '#CCC', fontWeight: 800, textAlign: 'right', paddingRight: '10px' }}>
                                    {String(i).padStart(2, '0')}:00
                                </div>
                            ))}
                        </div>
                        {/* Columnas de Días */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#F9F9F9', position: 'relative' }}>
                            {/* Línea de tiempo "Ahora" */}
                            <div style={{ position: 'absolute', top: `${nowLinePos}px`, left: 0, right: 0, height: '2px', background: '#FF4D4D', zIndex: 10, pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', left: '-5px', top: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: '#FF4D4D' }} />
                            </div>

                            {dayNames.map((name, idx) => (
                                <div key={idx} style={{ background: 'white', minHeight: '1200px', position: 'relative' }}>
                                    <div style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #F0F0F0', fontWeight: 900, color: 'var(--text-carbon)', fontSize: '0.75rem' }}>
                                        {name}
                                    </div>
                                    <div style={{ position: 'relative', height: '1200px' }}>
                                        {/* Ejemplo de bloques (simulado) */}
                                        {idx === 0 && (
                                            <div style={{ position: 'absolute', top: '450px', left: '2px', right: '2px', height: '100px', background: 'var(--domain-orange)', borderRadius: '8px', color: 'white', padding: '6px', fontSize: '0.6rem', fontWeight: 900, boxShadow: '0 4px 10px rgba(255,140,66,0.3)', zIndex: 2 }}>
                                                ENFOQUE ALPHA
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {/* Líneas horizontales de hora */}
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} style={{ position: 'absolute', top: `${(i)*50}px`, left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.03)', pointerEvents: 'none' }} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                        {dayNames.map(day => (
                            <div key={day} style={{ textAlign: 'center', color: '#888', fontWeight: 900, fontSize: '0.7rem', padding: '10px 0' }}>{day}</div>
                        ))}
                        {/* Placeholder para días del mes */}
                        {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} style={{ 
                                height: '100px', 
                                border: '1px solid #F0F0F0', 
                                borderRadius: '16px', 
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#BBB' }}>{i + 1}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PANEL LATERAL / RESUMEN */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="glass-card" style={{ background: 'white' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={18} color="var(--domain-orange)" /> Estadísticas de Tiempo
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ background: '#FDF8F5', padding: '1rem', borderRadius: '16px' }}>
                            <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>Focus Time</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '1.4rem', fontWeight: 900, color: 'var(--domain-orange)' }}>24.5h</p>
                        </div>
                        <div style={{ background: '#F5FCF9', padding: '1rem', borderRadius: '16px' }}>
                            <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>Descanso</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '1.4rem', fontWeight: 900, color: '#10B981' }}>12.2h</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ background: 'white' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1rem' }}>Próximos Eventos</h3>
                    {agenda.slice(0, 3).map(event => (
                        <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F5F5F5' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{event.title}</span>
                            <span style={{ fontSize: '0.85rem', color: '#BBB', fontWeight: 800 }}>{event.startTime}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
