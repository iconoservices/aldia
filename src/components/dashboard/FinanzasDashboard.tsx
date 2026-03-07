import { TrendingUp, Wallet, ArrowUpCircle, ArrowDownCircle, PieChart, MoreHorizontal, UserMinus, UserPlus } from 'lucide-react';

export const FinanzasDashboard = () => {
    return (
        <div style={{ paddingBottom: '5rem' }}>
            {/* CARD PRINCIPAL: BALANCE GENERAL */}
            <div className="glass-card" style={{
                background: 'linear-gradient(135deg, #0055FF 0%, #003399 100%)',
                color: 'white',
                marginBottom: '1.5rem',
                padding: '1.8rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>Balance Total</span>
                    <Wallet size={20} opacity={0.8} />
                </div>
                <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', color: 'white' }}>$4,250.00</h2>

                <div style={{ display: 'flex', gap: '15px', marginTop: '1.5rem' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowUpCircle size={18} color="#4ade80" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>$1,200</span>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowDownCircle size={18} color="#f87171" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>$450</span>
                    </div>
                </div>
            </div>

            {/* SECCIÓN DE NEGOCIO / VENTAS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Proyectos & Ventas</h3>
                <TrendingUp size={18} color="#888" />
            </div>

            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-carbon)' }}>Venta AlDía SaaS</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>3 suscripciones hoy</p>
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4ade80' }}>+$87.00</span>
                </div>
            </div>

            {/* DISTRIBUCIÓN DE GASTOS Y CATEGORÍAS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Distribución de Gastos</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--domain-orange)', fontWeight: 700, cursor: 'pointer' }}>Ver Gráficos ⭢</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
                    <div style={{ background: '#FFF5EB', width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <PieChart size={18} color="var(--domain-orange)" />
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem' }}>Fijos</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>$1,200</p>
                </div>
                <div className="glass-card" style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
                    <div style={{ background: '#F0F9FA', width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <TrendingUp size={18} color="var(--domain-green)" />
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem' }}>Hormiga</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>$150</p>
                </div>
                <div className="glass-card" style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
                    <div style={{ background: '#F5F5F5', width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <MoreHorizontal size={18} color="#666" />
                    </div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem' }}>Varios</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>$200</p>
                </div>
            </div>

            {/* SECCIÓN DE DEUDAS (DEBO / ME DEBEN) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1rem', borderTop: '4px solid #f87171' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#f87171' }}>
                        <UserMinus size={16} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>DEBO</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-carbon)' }}>$240</p>
                    <p style={{ margin: 0, fontSize: '0.65rem', color: '#888' }}>3 personas pendientes</p>
                </div>
                <div className="glass-card" style={{ padding: '1rem', borderTop: '4px solid #4ade80' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#4ade80' }}>
                        <UserPlus size={16} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>ME DEBEN</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-carbon)' }}>$580</p>
                    <p style={{ margin: 0, fontSize: '0.65rem', color: '#888' }}>2 cobros activos</p>
                </div>
            </div>

            {/* ÚLTIMOS MOVIMIENTOS */}
            <h3 style={{ marginBottom: '1rem' }}>Últimos Movimientos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#FEE2E2', padding: '8px', borderRadius: '12px' }}>
                            <ArrowDownCircle size={18} color="#f87171" />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Uber (Transporte)</p>
                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>Hoy, 14:30 PM</p>
                        </div>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--text-carbon)' }}>-$12.50</span>
                </div>

                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#DCFCE7', padding: '8px', borderRadius: '12px' }}>
                            <ArrowUpCircle size={18} color="#4ade80" />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Pago Proyecto X</p>
                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>Ayer, 09:00 AM</p>
                        </div>
                    </div>
                    <span style={{ fontWeight: 800, color: '#4ade80' }}>+$450.00</span>
                </div>
            </div>
        </div>
    );
};
