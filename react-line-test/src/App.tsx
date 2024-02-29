import liff from "@line/liff";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    liff
      .init({
        liffId: "2003854880-akRW4MEx", // Use own liffId
      })
      .then(() => {
        console.log("LIFF init success");
      });
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <ul>
        <li>liff.getLanguage(): {liff.getLanguage()}</li>
        <li>liff.getVersion(): {liff.getVersion()}</li>
        <li>
          liff.isInClient():
          {liff.isInClient() ? "LIFFブラウザ" : "外部ブラウザ"}
        </li>
        <li>liff.isLoggedIn(): {liff.isLoggedIn() ? "login" : "not login"}</li>
        <li>liff.getOS(): {liff.getOS()}</li>
      </ul>
    </>
  );
}

export default App;
