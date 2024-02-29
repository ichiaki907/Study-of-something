import liff from "@line/liff";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // ユーザー情報を保存するstate
  const [Profile, setProfile] = useState({
    displayName: "",
    userId: "",
    pictureUrl: "",
    statusMessage: "",
  });
  useEffect(() => {
    liff.init({ liffId: import.meta.env.VITE_LIFF_ID }).then(() => {
      // liff.init()完了後に実行される処理
      console.log("初期化が終わってから実行されるよ！");
      if (!liff.isLoggedIn()) {
        // ユーザーがログインしていない場合
        liff.login(); // ログイン画面にリダイレクト
      } else {
        // ログインしている場合、ユーザー情報を取得する
        liff
          .getProfile()
          .then((profile) => {
            // profileをstateに保存する
            setProfile({
              displayName: profile.displayName,
              userId: profile.userId,
              pictureUrl: profile.pictureUrl!,
              statusMessage: profile.statusMessage!,
            });
            console.log(`ユーザー名: ${profile.displayName}`);
            console.log(`ユーザーID: ${profile.userId}`);
            console.log(`画像URL: ${profile.pictureUrl}`);
            console.log(`ステータスメッセージ: ${profile.statusMessage}`);
          })
          .catch((err) => {
            console.error("ユーザー情報の取得に失敗しました", err);
          });
      }
    });
  }, []);

  // ログアウト処理
  const handleLogout = () => {
    liff.logout();
    window.location.reload(); // ページをリロードしてログイン状態を更新
  };

  return (
    <>
      <h1>Vite + React</h1>
      <p>LIFFでログインしています</p>
      <ul>
        <li>ユーザー名: {Profile.displayName}</li>
        <li>ユーザーID: {Profile.userId}</li>
        <li>ステータスメッセージ: {Profile.statusMessage}</li>
      </ul>
      <p>ログアウトする場合は以下のボタンをクリックしてください</p>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}

export default App;
