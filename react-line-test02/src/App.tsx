import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { Header } from "./components/Header";

interface Profile {
  displayName: string;
}

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>({ displayName: "" });

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
        setIsLoggedIn(liff.isLoggedIn());
        liff.getProfile().then((profile) => {
          setProfile(profile);
        });
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  }, []);

  const LineLoginhandler = () => {
    if (isLoggedIn === true) {
      liff.logout();
      window.location.reload();
    } else {
      liff.login();
    }
  };

  return (
    <Box className="App">
      <Header />
      {message && <p className="mt-2">{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <Link
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </Link>
      <Text fontSize="xl" className="mt-2 font-bold">
        {isLoggedIn ? "ログイン中" : "ログアウト中"}
      </Text>
      <Button onClick={LineLoginhandler} colorScheme="green" className="mt-2">
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </Button>
      <Text fontSize="xl" className="mt-2">
        {profile.displayName}
      </Text>
    </Box>
  );
}

export default App;
