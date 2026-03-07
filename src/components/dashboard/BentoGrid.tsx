import { Flame, Target, MoreVertical } from 'lucide-react';

export const BentoGrid = () => {
    return (
        <div className="bento-grid">
            {/* HERO WIDGET (Pomodoro) */}
            <div className="glass-card hero-widget">
                <div className="widget-header">
                    <MoreVertical size={20} className="icon-subtle" />
                </div>
                <div className="pomodoro-visual">
                    <h2 className="pomodoro-time">15:00</h2>
                </div>
                <p className="widget-label">Pomodoro</p>
                <span className="badge-active">Active</span>
            </div>

            {/* RIGHT COLUMN (Streak + Minis) */}
            <div className="right-widgets">
                {/* HORIZONTAL PILL (Fire Streak) */}
                <div className="glass-card streak-widget">
                    <Flame size={28} color="white" strokeWidth={2.5} fill="white" />
                    <p>5 Day Streak</p>
                </div>

                {/* DOS CUADRADOS SMALL */}
                <div className="mini-widgets-row">
                    <div className="glass-card mini-square">
                        <Target size={24} color="#3D312E" strokeWidth={2} />
                        <p>Quick<br />Goal</p>
                    </div>
                    {/* WIDGET DE PROGRESO DE AÑO / DIAS */}
                    <div className="glass-card mini-square center-content" style={{ background: 'var(--text-carbon)', color: 'white' }}>
                        <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 600, opacity: 0.7, color: 'white' }}>EL 2026 VA AL</p>
                        <h3 style={{ margin: '2px 0 0 0', fontSize: '1.4rem', fontWeight: 900, color: 'var(--domain-green)' }}>18%</h3>
                        <p style={{ margin: 0, fontSize: '0.6rem', color: '#888' }}>Día 66 / 365</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
