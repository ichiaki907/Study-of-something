export type Criterion = {
  id: number;
  category: string;
  text: string;
  isActive: boolean;
};

export const criteria: Criterion[] = [
  {
    id: 1,
    category: "飲食",
    text: "コンビニの新商品名だったら、つい買ってしまいそうなもの",
    isActive: true,
  },
  {
    id: 2,
    category: "日常",
    text: "朝起きて目の前にあったらうれしいもの",
    isActive: true,
  },
  {
    id: 3,
    category: "SNS",
    text: "SNSのアカウント名だったらフォローしたくなるもの",
    isActive: true,
  },
  {
    id: 4,
    category: "飲食",
    text: "カフェのメニューにあったら写真を撮りたくなるもの",
    isActive: true,
  },
  {
    id: 5,
    category: "ゲーム",
    text: "ゲームのアイテム名だったら強そうなもの",
    isActive: true,
  },
  {
    id: 6,
    category: "旅行",
    text: "旅行プラン名だったら楽しそうなもの",
    isActive: true,
  },
  {
    id: 7,
    category: "日常",
    text: "友達の口ぐせだったらクセになるもの",
    isActive: true,
  },
  {
    id: 8,
    category: "日常",
    text: "福袋に入っていたら当たりだと思うもの",
    isActive: true,
  },
  {
    id: 9,
    category: "日常",
    text: "おみくじに書いてあったらうれしいもの",
    isActive: true,
  },
  {
    id: 10,
    category: "映画",
    text: "映画のタイトルだったら友達と見に行きたいもの",
    isActive: true,
  },

  {
    id: 11,
    category: "学校",
    text: "給食のメニュー名だったら盛り上がりそうなもの",
    isActive: true,
  },
  {
    id: 12,
    category: "学校",
    text: "文化祭の出し物名だったら人が集まりそうなもの",
    isActive: true,
  },
  {
    id: 13,
    category: "日常",
    text: "部屋にあったらちょっとおしゃれに見えるもの",
    isActive: true,
  },
  {
    id: 14,
    category: "飲食",
    text: "夜中に食べたら背徳感が強いもの",
    isActive: true,
  },
  {
    id: 15,
    category: "旅行",
    text: "ホテルの朝食にあったら勝ちだと思うもの",
    isActive: true,
  },
  {
    id: 16,
    category: "ゲーム",
    text: "ゲームのボス名だったら弱そうなもの",
    isActive: true,
  },
  {
    id: 17,
    category: "SNS",
    text: "動画のタイトルだったら再生したくなるもの",
    isActive: true,
  },
  {
    id: 18,
    category: "SNS",
    text: "コメント欄に書いてあったら荒れそうなもの",
    isActive: true,
  },
  {
    id: 19,
    category: "日常",
    text: "誕生日プレゼントでもらったら意外とうれしいもの",
    isActive: true,
  },
  {
    id: 20,
    category: "旅行",
    text: "山頂で食べたらうまそうなもの",
    isActive: true,
  },

  {
    id: 21,
    category: "飲食",
    text: "居酒屋で最初に頼みたくなるもの",
    isActive: true,
  },
  {
    id: 22,
    category: "日常",
    text: "休日の予定に入っていたらちょうどいいもの",
    isActive: true,
  },
  {
    id: 23,
    category: "日常",
    text: "休日の予定に入っていたら面倒くさいもの",
    isActive: true,
  },
  {
    id: 24,
    category: "ゲーム",
    text: "必殺技の名前だったら威力が高そうなもの",
    isActive: true,
  },
  {
    id: 25,
    category: "映画",
    text: "ホラー映画のタイトルだったら怖そうなもの",
    isActive: true,
  },
  {
    id: 26,
    category: "映画",
    text: "恋愛映画のタイトルだったら泣けそうなもの",
    isActive: true,
  },
  {
    id: 27,
    category: "日常",
    text: "ペットの名前だったらかわいいもの",
    isActive: true,
  },
  {
    id: 28,
    category: "飲食",
    text: "BBQにあったらテンションが上がるもの",
    isActive: true,
  },
  {
    id: 29,
    category: "旅行",
    text: "温泉に行ったあと食べたいもの",
    isActive: true,
  },
  {
    id: 30,
    category: "日常",
    text: "家に帰ってこれがあったら疲れが取れそうなもの",
    isActive: true,
  },

  {
    id: 31,
    category: "飲食",
    text: "ラーメン屋の限定メニュー名だったら注文したくなるもの",
    isActive: true,
  },
  {
    id: 32,
    category: "飲食",
    text: "回転寿司の新ネタだったら一皿だけ試したくなるもの",
    isActive: true,
  },
  {
    id: 33,
    category: "飲食",
    text: "カレー屋の辛さレベル名だったら危険そうなもの",
    isActive: true,
  },
  {
    id: 34,
    category: "飲食",
    text: "食べ放題にあったら最初に取りに行きたいもの",
    isActive: true,
  },
  {
    id: 35,
    category: "飲食",
    text: "差し入れでもらったら好感度が上がりそうなもの",
    isActive: true,
  },

  {
    id: 36,
    category: "日常",
    text: "冷蔵庫に入っていたらテンションが上がるもの",
    isActive: true,
  },
  {
    id: 37,
    category: "日常",
    text: "カバンに入っていたら安心するもの",
    isActive: true,
  },
  {
    id: 38,
    category: "日常",
    text: "玄関に置いてあったら生活感が出るもの",
    isActive: true,
  },
  {
    id: 39,
    category: "日常",
    text: "寝る前に見たら夢に出てきそうなもの",
    isActive: true,
  },
  {
    id: 40,
    category: "日常",
    text: "財布に入っていたら少し安心するもの",
    isActive: true,
  },

  {
    id: 41,
    category: "学校",
    text: "先生のあだ名だったらしっくりくるもの",
    isActive: true,
  },
  {
    id: 42,
    category: "学校",
    text: "体育祭の競技名だったら楽しそうなもの",
    isActive: true,
  },
  {
    id: 43,
    category: "学校",
    text: "遠足の持ち物リストにあったら何に使うのか気になるもの",
    isActive: true,
  },
  {
    id: 44,
    category: "学校",
    text: "卒業アルバムの一言に書いてあったら印象に残るもの",
    isActive: true,
  },
  {
    id: 45,
    category: "学校",
    text: "自由研究のテーマだったら先生に褒められそうなもの",
    isActive: true,
  },

  {
    id: 46,
    category: "SNS",
    text: "LINEグループ名だったら通知が多そうなもの",
    isActive: true,
  },
  {
    id: 47,
    category: "SNS",
    text: "プロフィール欄に書いてあったら気になるもの",
    isActive: true,
  },
  {
    id: 48,
    category: "SNS",
    text: "ショート動画のネタだったら最後まで見てしまいそうなもの",
    isActive: true,
  },
  {
    id: 49,
    category: "SNS",
    text: "サムネの文字だったらクリックしたくなるもの",
    isActive: true,
  },
  {
    id: 50,
    category: "SNS",
    text: "ネット広告に出てきたら怪しそうなもの",
    isActive: true,
  },

  {
    id: 51,
    category: "ゲーム",
    text: "RPGの村の名前だったら序盤に出てきそうなもの",
    isActive: true,
  },
  {
    id: 52,
    category: "ゲーム",
    text: "ダンジョン名だったら戻ってこられなさそうなもの",
    isActive: true,
  },
  {
    id: 53,
    category: "ゲーム",
    text: "伝説の武器名だったら最終装備になりそうなもの",
    isActive: true,
  },
  {
    id: 54,
    category: "ゲーム",
    text: "ガチャ演出で出てきたら当たりっぽいもの",
    isActive: true,
  },
  {
    id: 55,
    category: "ゲーム",
    text: "ゲームの実績名だったら達成が難しそうなもの",
    isActive: true,
  },

  {
    id: 56,
    category: "映画",
    text: "B級映画のタイトルだったら逆に気になるもの",
    isActive: true,
  },
  {
    id: 57,
    category: "映画",
    text: "最終回のサブタイトルだったら泣けそうなもの",
    isActive: true,
  },
  {
    id: 58,
    category: "映画",
    text: "アニメの第1話タイトルだったら続きを見たくなるもの",
    isActive: true,
  },
  {
    id: 59,
    category: "映画",
    text: "悪役の作戦名だったら失敗しそうなもの",
    isActive: true,
  },
  {
    id: 60,
    category: "映画",
    text: "ヒーローの決め台詞だったら子どもが真似しそうなもの",
    isActive: true,
  },

  {
    id: 61,
    category: "旅行",
    text: "駅名だったら途中下車してみたくなるもの",
    isActive: true,
  },
  {
    id: 62,
    category: "旅行",
    text: "道の駅の商品名だったら買って帰りたくなるもの",
    isActive: true,
  },
  {
    id: 63,
    category: "旅行",
    text: "観光地のキャッチコピーだったら行ってみたくなるもの",
    isActive: true,
  },
  {
    id: 64,
    category: "旅行",
    text: "ホテルの部屋名だったら高そうなもの",
    isActive: true,
  },
  {
    id: 65,
    category: "旅行",
    text: "お土産名だったら家族に渡しやすそうなもの",
    isActive: true,
  },

  {
    id: 66,
    category: "恋愛",
    text: "デートスポット名だったら行ってみたいもの",
    isActive: true,
  },
  {
    id: 67,
    category: "恋愛",
    text: "初対面の自己紹介で出てきたら印象に残るもの",
    isActive: true,
  },
  {
    id: 68,
    category: "恋愛",
    text: "相手の趣味だったら好印象なもの",
    isActive: true,
  },
  {
    id: 69,
    category: "恋愛",
    text: "プロポーズの言葉に入っていたら少し不安になるもの",
    isActive: true,
  },
  {
    id: 70,
    category: "恋愛",
    text: "結婚相手の実家にあったら少し動揺するもの",
    isActive: true,
  },

  {
    id: 71,
    category: "仕事",
    text: "会議の議題に出てきたら長引きそうなもの",
    isActive: true,
  },
  {
    id: 72,
    category: "仕事",
    text: "プロジェクト名だったら炎上しそうなもの",
    isActive: true,
  },
  {
    id: 73,
    category: "仕事",
    text: "Slackチャンネル名だったら荒れそうなもの",
    isActive: true,
  },
  {
    id: 74,
    category: "仕事",
    text: "日報のタイトルだったら疲れていそうなもの",
    isActive: true,
  },
  {
    id: 75,
    category: "仕事",
    text: "社内表彰の賞名だったらもらうと少し嬉しいもの",
    isActive: true,
  },

  {
    id: 76,
    category: "仕事",
    text: "稟議書のタイトルだったら意外と承認されそうなもの",
    isActive: true,
  },
  {
    id: 77,
    category: "仕事",
    text: "営業資料の見出しだったら顧客に刺さりそうなもの",
    isActive: true,
  },
  {
    id: 78,
    category: "仕事",
    text: "お詫びメールの件名だったらかなり重大そうなもの",
    isActive: true,
  },
  {
    id: 79,
    category: "仕事",
    text: "新規事業名だったら社内で説明に困りそうなもの",
    isActive: true,
  },
  {
    id: 80,
    category: "仕事",
    text: "福利厚生の名前だったら求人で目立ちそうなもの",
    isActive: true,
  },

  {
    id: 81,
    category: "イベント",
    text: "飲み会のゲーム名だったら盛り上がりそうなもの",
    isActive: true,
  },
  {
    id: 82,
    category: "イベント",
    text: "罰ゲーム名だったら絶対にやりたくないもの",
    isActive: true,
  },
  {
    id: 83,
    category: "イベント",
    text: "結婚式の余興名だったら会場がざわつきそうなもの",
    isActive: true,
  },
  {
    id: 84,
    category: "イベント",
    text: "謎解きイベントのタイトルだったら難しそうなもの",
    isActive: true,
  },
  {
    id: 85,
    category: "イベント",
    text: "商店街イベント名だったら地元感が強そうなもの",
    isActive: true,
  },

  {
    id: 86,
    category: "ホラー",
    text: "深夜に家の中で聞こえたら怖いもの",
    isActive: true,
  },
  {
    id: 87,
    category: "ホラー",
    text: "学校の七不思議に出てきたら信じる人が多そうなもの",
    isActive: true,
  },
  {
    id: 88,
    category: "ホラー",
    text: "お化け屋敷の部屋名だったら入りたくないもの",
    isActive: true,
  },
  {
    id: 89,
    category: "ホラー",
    text: "都市伝説のタイトルだったら本当にありそうなもの",
    isActive: true,
  },
  {
    id: 90,
    category: "ホラー",
    text: "夢に出てきたら意味を調べたくなるもの",
    isActive: true,
  },

  {
    id: 91,
    category: "謎",
    text: "宇宙人のあいさつだったら平和そうなもの",
    isActive: true,
  },
  {
    id: 92,
    category: "謎",
    text: "新しい税金の名前だったらかなり嫌なもの",
    isActive: true,
  },
  {
    id: 93,
    category: "謎",
    text: "未来の家電名だったら便利そうなもの",
    isActive: true,
  },
  {
    id: 94,
    category: "謎",
    text: "ロボット掃除機の名前だったら賢そうなもの",
    isActive: true,
  },
  {
    id: 95,
    category: "謎",
    text: "AIサービス名だったら少し怖いけど使ってみたいもの",
    isActive: true,
  },

  {
    id: 96,
    category: "突っ込み",
    text: "王様が毎朝言っていたら国が心配になるもの",
    isActive: true,
  },
  {
    id: 97,
    category: "突っ込み",
    text: "ニュース速報で流れたら二度見してしまうもの",
    isActive: true,
  },
  {
    id: 98,
    category: "突っ込み",
    text: "説明書の最初に書いてあったら不安になるもの",
    isActive: true,
  },
  {
    id: 99,
    category: "突っ込み",
    text: "人生ゲームのマスに書いてあったら波乱が起きそうなもの",
    isActive: true,
  },
  {
    id: 100,
    category: "突っ込み",
    text: "神様からの一言だったら反応に困るもの",
    isActive: true,
  },
];
