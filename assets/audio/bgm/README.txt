【BGM 素材の置き場（SE・ボイスと分離）】

■ このフォルダについて
  - ステージ用の BGM ファイル（.mp3 / .ogg / .wav など）をここに置いてください。
  - 効果音・ボイスは assets/audio/voice/ のみを使用します。BGM はこの bgm/ に限定してください。

■ ファイル名の目安（index.html の audio.bgmVariant と対応）
  - ステージ1 … stage1 用（例: stage1.mp3）
  - ステージ2 … stage2 用（例: stage2.mp3）
  - ステージ3（砂漠）… desert 用（例: desert.mp3）
  - ステージ4（ボス）… boss 用
      → boss.mp3（楽曲: Throne of Black Aether。index.html の BGM_BOSS_SRC）

  ※ その他ステージのファイル BGM を追加する場合は命名を合わせ、BGM 切替処理と service-worker.js の ASSETS に追記してください。

■ オフライン（PWA）でキャッシュしたい場合
  - service-worker.js の ASSETS 配列に、置いたファイルのパスを 1 行ずつ追加してください。
  - 追加後は CACHE_NAME のバージョンを上げると更新が確実です。

■ 現状のゲーム内 BGM
  - 現在は Web Audio API でコードから音色を生成しています。
  - ファイル BGM に切り替える場合は index.html の BGM 関連処理を拡張してください。
