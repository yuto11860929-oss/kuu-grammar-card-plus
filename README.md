# 英文法カード（Wordholic風）MVP

## できること
- Home：単元一覧（320幅では右端の「◯枚」を非表示）
- Study：カード表⇄裏（タップ）、裏で「知ってた/知らなかった」→自動で次へ
- Result：集計表示、もう一周/一覧へ
- 保存：localStorage（wh_progress_v1）
- フォント：JP=Kiwi Maru / EN=Inter（英字は-1px、斜体なし）
- iPhone Safe Area：下部バーが被らない

## 使い方
1. Node.js 18+ を用意
2. 依存関係インストール

```bash
npm install
```

3. 開発サーバ起動

```bash
npm run dev
```

4. ブラウザで http://localhost:3000

## データの差し替え
- あなたの完全版JSONを `public/cards.json` に置き換えてください。

## 画像
- `public/illustrations/kuuchan.jpg` をHomeの右上（サブコピー横）に表示します。
- 透過しない前提なので、白プレート（丸角）でデザイン化しています。

