# CHANGELOG

## 2026-06-23

### 変更内容

- `README.md`、`TODO.md`、`CHANGELOG.md`、`.gitignore` を作成
- `docs/`、`assets/`、`scripts/`、`data/` を作成
- Mac・Windows・GitHub・Codexを利用する共通運用ルールを文書化
- Claude Code用の会社GitHubとCodex用の個人GitHubを完全分離する絶対ルールを追加
- GitHub操作前の接続先・所有者・認証アカウント確認を必須化
- 個人GitHubユーザー `willieworks-dev` とPrivate運用をプロジェクト標準へ追加
- コミットユーザー設定をリポジトリローカルに限定
- Codexの作業開始・作業中・作業終了手順を更新
- 新規Privateリポジトリの正式名称を `willieworks` に決定
- 個人GitHubアカウント `willieworks-dev` の作成完了を進捗へ反映
- GitHubのメール認証、メール非公開設定、noreplyメール確認の完了を進捗へ反映
- Privateリポジトリ `willieworks-dev/willieworks` の作成完了を進捗へ反映
- Codex生成フォルダの `.git` 書き込み制限により、別の作業フォルダが必要であることを記録
- Windowsの正式な作業フォルダを `C:\Users\kenji yoshida\Projects\willieworks` に作成
- `main` ブランチでGitを初期化し、個人用のローカルユーザー設定を適用
- 個人専用SSH鍵を作成してGitHubへ登録
- リポジトリのSSH接続を個人専用鍵へ固定し、Privateリポジトリへの接続を検証
- MacとWindows間の改行差分を防ぐ `.gitattributes` を追加
- 初回コミット `21c8064` を作成し、個人Privateリポジトリの `main` ブランチへpush

### 変更理由

- GitHubを正本として複数端末から一貫した方法で開発するため
- Codexがどちらの端末でも同じルールと進捗を参照できるようにするため
- 会社アカウントや会社の認証情報を個人プロジェクトで誤使用する事故を防ぐため
- MacBookとWindowsから同じ安全確認手順で運用するため
- 個人GitHub上の作成先を `willieworks-dev/willieworks` に確定するため
- 個人GitHub環境の初期構築状況を正確に管理するため
- コミットへ個人メールアドレスが公開されることを防ぐため
- Git履歴を安全に初期化できる場所へプロジェクトを配置するため
- 会社GitHubの鍵や認証情報が本プロジェクトで選択されることを防ぐため
- 初回コミットとpushを安全に実施できる状態にするため
- 複数OSで不要な改行コード差分が発生することを防ぐため
- GitHubを正本としてWindows側の初期構築を完了するため
