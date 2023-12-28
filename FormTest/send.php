<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css">
<?php

// PHPMailerのライブラリを使用する
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Composerのオートロードを使用する
require 'vendor/autoload.php';

// .envを使用する
Dotenv\Dotenv::createImmutable(__DIR__)->load();

//言語、内部エンコーディングを指定
mb_language("japanese");
mb_internal_encoding("UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // POSTデータを取得する
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  try {
    // サーバー設定
    $phpmailer = new PHPMailer();
    $phpmailer->isSMTP();
    $phpmailer->Host = $_ENV['SMTP_HOST'];
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = $_ENV['SMTP_PORT'];
    $phpmailer->Username = $_ENV['SMTP_USERNAME'];
    $phpmailer->Password = $_ENV['SMTP_PASSWORD'];

    // 日本語設定
    $phpmailer->CharSet = "UTF-8";

    // 受信者
    $phpmailer->setFrom('your-email@example.com', 'Your Name');
    $phpmailer->addAddress('my-email@example.com');

    // コンテンツ
    $phpmailer->isHTML(false);
    $phpmailer->Subject = 'お問い合わせがありました[' . $name . ']';
    $phpmailer->Body = "以下の内容でお問い合わせがありました。\n\n名前: $name\nメールアドレス: $email\nお問い合わせ内容: $message";

    $phpmailer->send();
    echo 'メールを送信しました<br>';
    echo '<a href="./index.html">フォーム入力に戻る</a>';
  } catch (Exception $e) {
    echo 'エラーが発生しました: ' . $phpmailer->ErrorInfo;
    echo '<a href="./index.html">フォーム入力に戻る</a>';
  }
} else {
  echo '無効なリクエストです';
}
