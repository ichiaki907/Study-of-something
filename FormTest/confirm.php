<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css">
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // フォームデータを取得する
  $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
  $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
  $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

  // 確認ページを表示する
  echo "<h1>入力確認</h1>";
  echo "<p>以下の内容でよろしければ、送信ボタンを押してください。</p>";
  echo "<table>";
  echo "<tr><td>名前:</td><td>$name</td></tr>";
  echo "<tr><td>メールアドレス:</td><td>$email</td></tr>";
  echo "<tr><td>メッセージ:</td><td>" . nl2br($message) . "</td></tr>";
  echo "</table>";

  // 送信ボタン
  echo '<form action="send.php" method="post">';
  echo '<input type="hidden" name="name" value="' . $name . '">';
  echo '<input type="hidden" name="email" value="' . $email . '">';
  echo '<input type="hidden" name="message" value="' . $message . '">';
  echo '<input type="submit" value="送信">';
  echo '</form>';
  // フォーム入力ページに戻るボタン
  echo '<button type="button" onclick="history.back()">戻る</button>';
} else {
  // エラーページを表示する
  echo "<h1>Error</h1>";
  echo '<a href="./index.html">フォーム入力に戻る</a>';
}
