<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css">
<?php
session_start();

// セッション変数が存在しない場合はエラーページを表示する
if (empty($_SESSION['name']) || empty($_SESSION['email']) || empty($_SESSION['message'])) {
  echo "<h1>Error</h1>";
  echo '<a href="./index.php">フォーム入力に戻る</a>';
  exit;
}

// セッション変数からデータを取得
$name = htmlspecialchars($_SESSION['name'], ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_SESSION['email'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_SESSION['message'], ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>入力確認</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css">
</head>

<body>
  <h1>入力確認</h1>
  <p>以下の内容でよろしければ、送信ボタンを押してください。</p>
  <table>
    <tr>
      <td>名前:</td>
      <td><?php echo $name; ?></td>
    </tr>
    <tr>
      <td>メールアドレス:</td>
      <td><?php echo $email; ?></td>
    </tr>
    <tr>
      <td>メッセージ:</td>
      <td><?php echo nl2br($message); ?></td>
    </tr>
  </table>
  <!-- 送信処理を行う send.php へのフォーム -->
  <form action="send.php" method="post">
    <button type="button" onclick="history.back()">戻る</button>
    <input type="submit" value="送信">
  </form>
</body>

</html>