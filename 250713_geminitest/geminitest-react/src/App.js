import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import NFTBenefitsPage from "./components/layout/NFTBenefitsPage";
import { initializeApp } from "./utils/app-utils";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <ThemeProvider>
      <div className="App bg-white min-h-screen">
        <NFTBenefitsPage activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ThemeProvider>
  );
}

export default App;
