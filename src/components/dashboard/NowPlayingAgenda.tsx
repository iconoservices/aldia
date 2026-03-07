import { Clock } from 'lucide-react';

export const NowPlayingAgenda = () => {
    return (
        <div className="glass-card now-playing-agenda" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--domain-orange)', padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--domain-orange)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Ahora Mismo
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Clock size={14} />
                    <span>3:00 PM - 5:00 PM</span>
                </div>
            </div>

            <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-carbon)', fontWeight: 800 }}>
                Sesión de Código Profundo
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>
                Avanzar en la maquetación de AlDía y la lógica PWA.
            </p>
        </div>
    );
};
