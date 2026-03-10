import { useState, useEffect } from 'react';
import { Flame, Target, MoreVertical, Play, Pause, RotateCcw } from 'lucide-react';

interface BentoGridProps {
    performanceScore: number;
}

export const BentoGrid = ({ performanceScore }: BentoGridProps) => {
    // --- LÓGICA POMODORO ---
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos por defecto
    const [isActive, setIsActive] = useState(false);
    const [initialTime] = useState(15 * 60);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Sonido o notificación aquí en el futuro
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(15 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((initialTime - timeLeft) / initialTime) * 360;

    // --- CÁLCULO PROGRESO AÑO ---
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const yearProgress = Math.round((dayOfYear / 365) * 100);

    return (
        <div className="bento-grid">
            {/* HERO WIDGET (Pomodoro) */}
            <div className="glass-card hero-widget">
                <div className="widget-header">
                    <RotateCcw 
                        size={18} 
                        className="icon-subtle clickable" 
                        onClick={resetTimer}
                        style={{ cursor: 'pointer', marginRight: 'auto' }}
                    />
                    <MoreVertical size={20} className="icon-subtle" />
                </div>
                
                <div 
                    className="pomodoro-visual" 
                    onClick={toggleTimer}
                    style={{ 
                        cursor: 'pointer',
                        background: `conic-gradient(var(--domain-orange) ${progress}deg, #FFF5EB 0deg)`,
                        border: 'none',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        width: '85%',
                        height: '85%',
                        background: 'white',
                        borderRadius: '50%',
                        zIndex: 0
                    }}></div>
                    
                    <div style={{ zIndex: 1, textAlign: 'center' }}>
                        <h2 className="pomodoro-time" style={{ margin: 0 }}>{formatTime(timeLeft)}</h2>
                        {isActive ? <Pause size={16} color="#DDD" fill="#DDD" /> : <Play size={16} color="var(--domain-orange)" fill="var(--domain-orange)" />}
                    </div>
                </div>

                <p className="widget-label">Enfoque Actual</p>
                <span className="badge-active" style={{ color: performanceScore > 50 ? 'var(--domain-green)' : 'var(--domain-orange)' }}>
                    {performanceScore > 70 ? 'Ultra Foco' : 'Productivo'}
                </span>
            </div>

            {/* RIGHT COLUMN (Streak + Minis) */}
            <div className="right-widgets">
                {/* HORIZONTAL PILL (Fire Streak) */}
                <div className="glass-card streak-widget">
                    <Flame size={28} color="white" strokeWidth={2.5} fill="white" />
                    <p>8 Días de Racha</p>
                </div>

                {/* DOS CUADRADOS SMALL */}
                <div className="mini-widgets-row">
                    <div className="glass-card mini-square">
                        <Target size={24} color="#3D312E" strokeWidth={2} />
                        <p>Meta<br />Hoy</p>
                    </div>
                    {/* WIDGET DE PROGRESO DE AÑO / DIAS */}
                    <div className="glass-card mini-square center-content" style={{ background: 'var(--text-carbon)', color: 'white' }}>
                        <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 600, opacity: 0.7, color: 'white' }}>EL {now.getFullYear()} VA AL</p>
                        <h3 style={{ margin: '2px 0 0 0', fontSize: '1.4rem', fontWeight: 900, color: 'var(--domain-green)' }}>{yearProgress}%</h3>
                        <p style={{ margin: 0, fontSize: '0.55rem', color: '#888' }}>Día {dayOfYear} / 365</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
