import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { Header } from './components/layout/Header';
import { BentoGrid } from './components/dashboard/BentoGrid';
import { UpcomingList } from './components/dashboard/UpcomingList';
import { MissionList } from './components/dashboard/MissionList';
import { VidaDashboard } from './components/dashboard/VidaDashboard';
import { FinanzasDashboard } from './components/dashboard/FinanzasDashboard';
import { StatsDashboard } from './components/dashboard/StatsDashboard';
import { SuperFab } from './components/features/SuperFab';

function App() {
  const [activeTab, setActiveTab] = useState('Acción');

  return (
    <div className="aldia-container">
      {/* HEADER COMPRIMIDO */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* RENDER CONDICIONAL Y DASHBOARD */}
      <main className="dashboard">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ width: '100%' }}
          >
            {activeTab === 'Acción' ? (
              <>
                <BentoGrid />
                <div className="dashboard-right-col">
                  <UpcomingList />
                  <MissionList />
                </div>
              </>
            ) : activeTab === 'Vida' ? (
              <VidaDashboard />
            ) : activeTab === 'Finanzas' ? (
              <FinanzasDashboard />
            ) : activeTab === 'Stats' ? (
              <StatsDashboard />
            ) : (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Modo {activeTab} 🚧</h2>
                <p>En construcción...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* SUPER FAB RADIAL */}
      <SuperFab />
    </div>
  );
}

export default App;
