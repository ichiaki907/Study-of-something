import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
        setIsLoggedIn(liff.isLoggedIn());
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  const LineLoginhandler = () => {
    if (isLoggedIn === true) {
      liff.logout();
      window.location.reload();
    } else {
      liff.login();
    }
  };

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
      {isLoggedIn ? <p>ログイン中</p> : <p>ログアウト中</p>}
      <button onClick={LineLoginhandler}>
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}

export default App;
