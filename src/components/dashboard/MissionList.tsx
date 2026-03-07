import { motion } from 'framer-motion';
export const MissionList = () => {
    return (
        <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>Misiones</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ⊞ Matriz Joy
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--domain-orange)', fontWeight: 600, cursor: 'pointer' }}>Timeline ⭢</span>
                </div>
            </div>

            {/* CONTENEDOR DE BLOQUE DE TIEMPO */}
            <div className="time-block-container" style={{ background: '#F0EBE6', padding: '0.8rem', borderRadius: '24px', position: 'relative' }}>

                {/* ETIQUETA DEL BLOQUE (Fondo) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem', color: '#999', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <span>⚡ TRABAJO (14:00 - 18:00)</span>
                </div>

                <div className="mission-list">
                    {/* MISIÓN CRÍTICA (Pagos, Fechas Límites Externas) -> Q1: Importante y Urgente */}
                    <div className="mission-item critical-alert" style={{ background: 'var(--domain-orange)', border: 'none', padding: '0.8rem 1rem', marginBottom: '1rem', boxShadow: '0 8px 20px rgba(255, 140, 66, 0.3)', position: 'relative', overflow: 'hidden' }}>
                        {/* EFECTO DE LUZ DE HITO */}
                        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '200%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

                        <div className="circle-check" style={{ borderColor: 'white' }}></div>
                        <div style={{ width: '100%', zIndex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', background: 'rgba(0,0,0,0.15)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>🏆 HITO ALCANZADO</span>
                                <span style={{ fontSize: '0.6rem', color: 'white', fontWeight: 800, background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '8px' }}>Q1</span>
                            </div>
                            <p style={{ margin: '2px 0 0 0', fontWeight: 800, color: 'white', fontSize: '1rem' }}>Pagar Luz (Vence Hoy)</p>
                        </div>
                    </div>

                    {/* MISIÓN ACTUAL (Now Playing / Activa) -> Q2: Importante, no Urgente */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="mission-item now-playing-agenda"
                        style={{ borderLeft: '4px solid var(--domain-orange)', padding: '0.8rem 1rem', cursor: 'pointer' }}
                    >
                        <div className="circle-check"></div>
                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--domain-orange)', textTransform: 'uppercase', letterSpacing: '1px' }}>EN CURSO</span>
                                <span style={{ fontSize: '0.6rem', color: '#888', fontWeight: 800, background: '#F0EBE6', padding: '2px 6px', borderRadius: '8px' }}>Q2</span>
                            </div>
                            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-carbon)', fontSize: '0.95rem' }}>Terminar maquetación AlDía</p>
                        </div>
                    </motion.div>

                    {/* MISIÓN 2 -> Q2 */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="mission-item"
                        style={{ opacity: 0.8, padding: '0.8rem 1rem', cursor: 'pointer' }}
                    >
                        <div className="circle-check"></div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-carbon)' }}>Diseñar Menú Radial (+)</p>
                            <span style={{ fontSize: '0.6rem', color: '#888', fontWeight: 800, background: '#F0EBE6', padding: '2px 6px', borderRadius: '8px' }}>Q2</span>
                        </div>
                    </motion.div>

                    {/* MISIÓN 3 -> Q3: Urgente pero no Importante */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="mission-item"
                        style={{ opacity: 0.5, padding: '0.8rem 1rem', cursor: 'pointer' }}
                    >
                        <div className="circle-check"></div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontWeight: 500, color: '#666' }}>Revisar emails de suscripciones</p>
                            <span style={{ fontSize: '0.6rem', color: '#888', fontWeight: 800, background: '#F0EBE6', padding: '2px 6px', borderRadius: '8px' }}>Q3</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
