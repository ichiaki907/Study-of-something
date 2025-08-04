import React, { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import NFTBenefitsPage from "./components/layout/NFTBenefitsPage";
import { initializeApp } from "./utils/app-utils";

function App() {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <ThemeProvider>
      <div className="App bg-white min-h-screen">
        <NFTBenefitsPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
