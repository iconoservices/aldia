import { BarChart3, Activity, Target, Flame, CalendarDays } from 'lucide-react';

export const StatsDashboard = () => {
    return (
        <div style={{ paddingBottom: '5rem' }}>
            {/* CABECERA DE RESUMEN / PERFORMANCE SCORE */}
            <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'var(--text-carbon)', color: 'white', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--domain-green)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>🏆 HITO ALCANZADO</span>
                    <h2 style={{ margin: '4px 0 0 0', fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>85<span style={{ fontSize: '1.2rem', color: '#888' }}>/100</span></h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#CCC' }}>Superaste tu meta de la semana pasada.</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%' }}>
                    <Activity size={32} color="var(--domain-green)" />
                </div>
            </div>

            {/* MAPA DE CALOR: POMODOROS Y CONSTANCIA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Mapa de Esfuerzo (Últimos 30 días)</h3>
                <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>Noviembre ⭢</span>
            </div>

            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px' }}>
                    {/* Generando cuadritos aleatorios para simular el mapa de calor (GitHub style) */}
                    {[...Array(30)].map((_, i) => {
                        // Simular intensidad aleatoria
                        const intensity = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
                        const bgColors = ['#F0EBE6', '#FFECCF', '#FFB76B', 'var(--domain-orange)'];
                        return (
                            <div key={i} style={{
                                width: '100%',
                                aspectRatio: '1/1',
                                backgroundColor: bgColors[intensity],
                                borderRadius: '4px'
                            }}></div>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.7rem', color: '#888', fontWeight: 600 }}>
                    <span>Menos Productivo</span>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <div style={{ width: '10px', height: '10px', background: '#F0EBE6', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#FFECCF', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', background: '#FFB76B', borderRadius: '2px' }}></div>
                        <div style={{ width: '10px', height: '10px', background: 'var(--domain-orange)', borderRadius: '2px' }}></div>
                    </div>
                    <span>Modo Bestia</span>
                </div>
            </div>

            {/* ESTADÍSTICAS RÁPIDAS (Bento Stats) */}
            <h3 style={{ marginBottom: '1rem' }}>Desglose de Impacto</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* HORAS DE ENFOQUE */}
                <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
                        <Target size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Horas Enfoque</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-carbon)' }}>42.5<span style={{ fontSize: '0.9rem', color: '#888' }}>h</span></p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--domain-green)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>↑ +12% vs sem pasada</span>
                </div>

                {/* TAREAS MATRIZ Q1/Q2 */}
                <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
                        <BarChart3 size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Misiones Q1/Q2</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-carbon)' }}>128</p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--domain-green)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>↑ 85% completadas</span>
                </div>
            </div>

            {/* SALÓN DE LA FAMA / RACHAS */}
            <h3 style={{ marginBottom: '1rem' }}>Tus Trofeos Vivos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderLeft: '4px solid var(--domain-orange)' }}>
                    <div style={{ background: '#FFF5EB', padding: '12px', borderRadius: '14px' }}>
                        <Flame size={24} color="var(--domain-orange)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: 'var(--text-carbon)' }}>12 Días de Lectura</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Tu racha activa más larga.</p>
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderLeft: '4px solid var(--domain-purple)' }}>
                    <div style={{ background: '#F4EFFF', padding: '12px', borderRadius: '14px' }}>
                        <CalendarDays size={24} color="var(--domain-purple)" />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: 'var(--text-carbon)' }}>Mes Perfecto: Hábitos</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>Completaste el 90% en Octubre.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
