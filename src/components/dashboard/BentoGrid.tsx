export const BentoGrid = () => {
    return (
        <div className="bento-grid">
            <div className="glass-card hero-widget">
                <h2 style={{ fontSize: '2rem', color: 'var(--domain-orange)' }}>15:00</h2>
                <p>Pomodoro</p>
            </div>
            <div className="glass-card right-widgets">
                <div className="glass-card mini-widget">🔥 5 Días</div>
                <div className="glass-card mini-widget" style={{ color: 'var(--domain-green)' }}>✅ Rápido</div>
            </div>
        </div>
    );
};
