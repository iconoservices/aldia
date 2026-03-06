import { useState } from 'react';
import './App.css';
import { Header } from './components/layout/Header';
import { BentoGrid } from './components/dashboard/BentoGrid';
import { UpcomingList } from './components/dashboard/UpcomingList';
import { MissionList } from './components/dashboard/MissionList';
import { SuperFab } from './components/features/SuperFab';

function App() {
  const [activeTab, setActiveTab] = useState('Acción');

  return (
    <div className="aldia-container">
      {/* HEADER COMPRIMIDO */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* RENDER CONDICIONAL Y DASHBOARD */}
      <main className="dashboard">
        {activeTab === 'Acción' ? (
          <>
            <BentoGrid />
            <div className="dashboard-right-col">
              <UpcomingList />
              <MissionList />
            </div>
          </>
        ) : (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Modo {activeTab} 🚧</h2>
            <p>En construcción...</p>
          </div>
        )}
      </main>

      {/* SUPER FAB RADIAL */}
      <SuperFab />
    </div>
  );
}

export default App;
