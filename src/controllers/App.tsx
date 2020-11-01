import React from 'react';
import '../styles/tailwind.output.css';
import { DaylightBackground } from '../uicomponents/DaylightBackground'

function App() {
  return (
    <div className="h-screen w-full flex bg-blue">
      <DaylightBackground duration={180000} timeToEnd={180000}>
        <div className="rounded shadow bg-pale max-w-xs">coucou</div>
      </DaylightBackground>
    </div>
  );
}

export default App;
