<?php
session_start();

$error = [];
$name = $email = $message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = isset($_POST['name']) ? trim($_POST['name']) : '';
  $email = isset($_POST['email']) ? trim($_POST['email']) : '';
  $message = isset($_POST['message']) ? trim($_POST['message']) : '';

  if (empty($name)) {
    $error['name'] = "名前は必須です。";
  }
  if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error['email'] = "有効なメールアドレスを入力してください。";
  }
  if (empty($message)) {
    $error['message'] = "お問い合わせ内容は必須です。";
  }

  if (count($error) === 0) {
    // セッションidの追跡を防ぐ
    session_regenerate_id(true);

    // セッション変数にデータを保存
    $_SESSION['name'] = $name;
    $_SESSION['email'] = $email;
    $_SESSION['message'] = $message;
    header('Location: confirm.php');
    exit;
  }
}
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>フォームテスト</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css">
</head>

<body>
  <h1>フォームテスト</h1>
  <main>
    <?php if (!empty($error)) : ?>
      <div>
        <ul>
          <?php foreach ($error as $err) : ?>
            <li>
              <?php echo htmlspecialchars($err, ENT_QUOTES, 'UTF-8'); ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <form action="index.php" method="post">
      <label for="name">名前</label>
      <input type="text" id="name" name="name" placeholder="名前を入力してください" value="<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>">
      <label for="email">メールアドレス</label>
      <input type="email" id="email" name="email" placeholder="例）xxx@example.com" value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>">
      <label for="content">お問い合わせ内容</label>
      <textarea name="message" id="content" cols="30" rows="10" placeholder="お問い合わせ内容を入力してください"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></textarea>
      <div>
        <input type="submit" value="確認">
      </div>
    </form>
  </main>
</body>

</html>