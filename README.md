# Puni Adventure - 横スクロールアクションPWA

ピンクの丸いキャラ「プニ」が星を集めてゴールを目指す、スマホ横持ち向けアクションゲーム。

## 🎮 プレイ方法

- **◀ ▶** ボタンで左右移動
- **JUMP** ボタンでジャンプ
- **JUMP長押し** でふわっと浮く（ホバリング）
- 💎を5つ集めてゴールの旗へ！

PCでは `← →` キーで移動、`スペース` or `↑` でジャンプ。

## 📁 ファイル構成

```
pink-ball-platformer/
├── index.html         # メイン（ゲームロジック全部ここ）
├── manifest.json      # PWA設定
├── service-worker.js  # オフライン対応
└── README.md
```

## 🚀 ローカル起動

```bash
# Pythonが入ってればこれでOK
python3 -m http.server 8000

# または npx serve
npx serve .
```

ブラウザで http://localhost:8000 を開く。

## 🌐 デプロイ（GitHub Pages）

```bash
git init
git add .
git commit -m "feat: initial prototype"
git branch -M main
git remote add origin https://github.com/zukkinimouse/puni-adventure.git
git push -u origin main
```

GitHub → Settings → Pages → Branch: main, root → Save

## 🔧 主要な調整ポイント（index.html内の定数）

```js
const GRAVITY       = 0.5;    // 重力
const FLOAT_GRAVITY = 0.15;   // ふわっと感（小さいほどふわふわ）
const JUMP_POWER    = -11;    // ジャンプ力（負の値）
const MOVE_SPEED    = 3.5;    // 移動速度
const MAX_FALL      = 12;     // 最大落下速度
```

## 📝 データ構造

### ステージ（`platforms` 配列）

```js
{x: 200, y: 340, w: 100, h: 20}
// y >= 420 は地面として草＋土で描画される
// y < 420 は浮遊プラットフォーム（紫）
```

### 星（`stars` 配列）

```js
{x: 250, y: 300, collected: false}
```

### ゴール（`goal` オブジェクト）

5つ星を集めないと旗は灰色のまま（触れてもクリアにならない）。

## 🛠 拡張アイデア（次のCursor指示候補）

### 優先度：高
- [ ] 複数ステージ対応（ステージデータをJSON化）
- [ ] 敵キャラ追加（左右往復、接触でリセット）
- [ ] BGM・SE追加（Web Audio API or `<audio>`）
- [ ] タイトル画面

### 優先度：中
- [ ] スプライトアニメーション（歩行・ジャンプ時の変形強化）
- [ ] コイン音・クリア音
- [ ] ベストタイム記録（localStorage）
- [ ] 画面シェイク演出

### 優先度：低
- [ ] Phaser.jsへの移行
- [ ] ステージエディタ
- [ ] ランキング（Supabase連携）

## 🎨 デザイン意図

- **パステルカラー**で優しい世界観
- **丸いキャラ×ふわっと挙動**でカービィ系の気持ちよさを再現
- **「吸い込み」「コピー能力」は入れない**（著作権配慮）

## ⚠️ 注意点

- キャラ名「プニ」は仮称。好きに変えてOK
- オリジナリティを出すため、吸い込み系の能力は避ける方針
- 立ち絵イラストを追加する場合は、オリジナル or 利用規約OKな素材を使うこと
