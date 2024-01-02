export const App = () => {
  const onClickButton = () => alert();
  const contentStyleA = {
    color: "blue",
    fontSize: "18px",
  };
  const contentStyleB = {
    color: "green",
    fontSize: "18px",
  };
  return (
    <>
      <h1 style={{ color: "red" }}>こんにちは！</h1>
      <p style={contentStyleA}>お元気ですか？</p>
      <p style={contentStyleB}>元気です！</p>
      <button onClick={onClickButton}>ボタン</button>
    </>
  );
};

export default App;
