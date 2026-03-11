import type { CalendarEvent } from '../../hooks/useAlDiaState';
import { Clock } from 'lucide-react';

interface UpcomingListProps {
    agenda: CalendarEvent[];
    hideOnEmpty?: boolean;
    title?: string;
}

export const UpcomingList = ({ agenda, title = "Agenda" }: UpcomingListProps) => {
    // Obtener la hora actual para filtrar eventos pasados
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    const todayStr = now.toLocaleDateString('en-CA');
    const upcomingEvents = agenda.filter(event => {
        if (event.date && event.date !== todayStr) return false;
        const [endH, endM] = event.endTime.split(':').map(Number);
        const endTimeMinutes = endH * 60 + endM;
        return endTimeMinutes > currentTimeMinutes;
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));

    // No ocultamos el componente entero, solo mostramos estado vacío si no hay citas

    return (
        <div style={{ marginBottom: '1.2rem' }}>
            <h3 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '12px',
                fontSize: '1.2rem',
                fontWeight: 900,
                color: 'var(--text-carbon)',
                textTransform: 'none'
            }}>
                {title}
            </h3>
            <div className="upcoming-list" style={{ display: 'grid', gap: '0.6rem' }}>
                {upcomingEvents.length === 0 ? (
                    <div style={{ 
                        padding: '12px 20px', 
                        background: 'rgba(0,0,0,0.03)', 
                        borderRadius: '16px', 
                        fontSize: '0.8rem', 
                        color: '#999',
                        fontWeight: 600,
                        border: '1px dashed #DDD'
                    }}>
                         ✨ Sin citas hoy
                    </div>
                ) : (
                    upcomingEvents.slice(0, 3).map(event => {
                        const [startH, startM] = event.startTime.split(':').map(Number);
                        const startTimeMinutes = startH * 60 + startM;
                        const isLive = currentTimeMinutes >= startTimeMinutes;

                        return (
                            <div
                                key={event.id}
                                className="glass-card capsule upcoming-item"
                                style={{
                                    background: isLive ? 'var(--domain-orange)' : 'rgba(255, 140, 66, 0.08)',
                                    color: isLive ? 'white' : 'var(--text-carbon)',
                                    fontWeight: 800,
                                    padding: '1rem', // Más padding como las misiones
                                    borderRadius: '20px',
                                    border: isLive ? 'none' : '1px solid rgba(255, 140, 66, 0.2)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: isLive ? '0 8px 20px rgba(255,140,66,0.25)' : 'none',
                                    marginBottom: '8px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                                        <div style={{ 
                                            width: '24px', 
                                            height: '24px', 
                                            borderRadius: '50%', 
                                            border: isLive ? '2px solid white' : '2px solid var(--domain-orange)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Clock size={14} color={isLive ? 'white' : 'var(--domain-orange)'} />
                                        </div>
                                        {isLive && (
                                            <div className="pulse-dot" style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div>
                                        )}
                                        <span style={{ fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.title}</span>
                                    </div>
                                    <span style={{ fontSize: '0.62rem', opacity: 0.8, fontWeight: 700, whiteSpace: 'nowrap' }}>
                                        {event.startTime} - {event.endTime}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
