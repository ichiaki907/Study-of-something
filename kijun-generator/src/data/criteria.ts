export type Criterion = {
  id: number;
  category: string;
  text: string;
  isActive: boolean;
};

export const criteria: Criterion[] = [
  { id: 1, category: '飲食', text: 'コンビニの新商品名だったら、つい買ってしまいそうなもの', isActive: true },
  { id: 2, category: '日常', text: '朝起きて目の前にあったらうれしいもの', isActive: true },
  { id: 3, category: 'SNS', text: 'SNSのアカウント名だったらフォローしたくなるもの', isActive: true },
  { id: 4, category: '飲食', text: 'カフェのメニューにあったら写真を撮りたくなるもの', isActive: true },
  { id: 5, category: 'ゲーム', text: 'ゲームのアイテム名だったら強そうなもの', isActive: true },
  { id: 6, category: '旅行', text: '旅行プラン名だったら楽しそうなもの', isActive: true },
  { id: 7, category: '日常', text: '友達の口ぐせだったらクセになるもの', isActive: true },
  { id: 8, category: '日常', text: '福袋に入っていたら当たりだと思うもの', isActive: true },
  { id: 9, category: '日常', text: 'おみくじに書いてあったらうれしいもの', isActive: true },
  { id: 10, category: '映画', text: '映画のタイトルだったら友達と見に行きたいもの', isActive: true },
  { id: 11, category: '学校', text: '給食のメニュー名だったら盛り上がりそうなもの', isActive: true },
  { id: 12, category: '学校', text: '文化祭の出し物名だったら人が集まりそうなもの', isActive: true },
  { id: 13, category: '日常', text: '部屋にあったらちょっとおしゃれに見えるもの', isActive: true },
  { id: 14, category: '飲食', text: '夜中に食べたら背徳感が強いもの', isActive: true },
  { id: 15, category: '旅行', text: 'ホテルの朝食にあったら勝ちだと思うもの', isActive: true },
  { id: 16, category: 'ゲーム', text: 'ゲームのボス名だったら弱そうなもの', isActive: true },
  { id: 17, category: 'SNS', text: '動画のタイトルだったら再生したくなるもの', isActive: true },
  { id: 18, category: 'SNS', text: 'コメント欄に書いてあったら荒れそうなもの', isActive: true },
  { id: 19, category: '日常', text: '誕生日プレゼントでもらったら意外とうれしいもの', isActive: true },
  { id: 20, category: '旅行', text: '山頂で食べたらうまそうなもの', isActive: true },
  { id: 21, category: '飲食', text: '居酒屋で最初に頼みたくなるもの', isActive: true },
  { id: 22, category: '日常', text: '休日の予定に入っていたらちょうどいいもの', isActive: true },
  { id: 23, category: '日常', text: '休日の予定に入っていたら面倒くさいもの', isActive: true },
  { id: 24, category: 'ゲーム', text: '必殺技の名前だったら威力が高そうなもの', isActive: true },
  { id: 25, category: '映画', text: 'ホラー映画のタイトルだったら怖そうなもの', isActive: true },
  { id: 26, category: '映画', text: '恋愛映画のタイトルだったら泣けそうなもの', isActive: true },
  { id: 27, category: '日常', text: 'ペットの名前だったらかわいいもの', isActive: true },
  { id: 28, category: '飲食', text: 'BBQにあったらテンションが上がるもの', isActive: true },
  { id: 29, category: '旅行', text: '温泉に行ったあと食べたいもの', isActive: true },
  { id: 30, category: '日常', text: '家に帰ってこれがあったら疲れが取れそうなもの', isActive: true }
];
