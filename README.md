# プロジェクト概要

本プロジェクトは、MacBookとWindowsの両方から同一のGitHubリポジトリを利用して開発する個人用プロジェクトです。GitHubを正本（Source of Truth）とし、同一のChatGPT PlusアカウントとCodexを使って、どちらの端末でも同じルールで作業します。

- 個人GitHubユーザー：`willieworks-dev`
- 公開設定：Private
- 用途：個人開発・ベルラス案件
- リポジトリ名：`willieworks`
- GitHub上の配置：`willieworks-dev/willieworks`

## セットアップ手順

1. Gitをインストールする。
2. GitHub上の対象リポジトリを各端末へクローンする。
3. 作業開始前に `git pull` を実行する。
4. `README.md`、`TODO.md` の順に確認する。
5. 使用技術に応じた依存関係をセットアップする。
6. APIキーや機密情報は環境変数またはGit管理外のローカル設定で扱う。
7. GitHubのコミットメールにはGitHub提供の `noreply` アドレスを使用する。

> GitHubのコミットメールは `296127537+willieworks-dev@users.noreply.github.com` を使用します。具体的な技術スタックは未設定です。

## ディレクトリ構成

```text
.
├── README.md       # プロジェクト概要と標準ルール
├── TODO.md         # 現在の進捗と今後の作業
├── CHANGELOG.md    # 変更履歴
├── docs/           # 設計書・仕様書・運用資料
├── assets/         # 画像などの静的素材
├── scripts/        # 開発・運用補助スクリプト
└── data/           # データファイル（機密情報は保存しない）
```

`outputs/` と `work/` はCodexの成果物・一時作業用であり、原則としてGit管理外とします。

## 使用技術

- Git / GitHub
- ChatGPT Plus
- Codex
- macOS（MacBook）
- Windows
- アプリケーション固有の技術スタック：未定

## 運用ルール

1. `README.md` を最優先で参照する。
2. `TODO.md` を現在の進捗として扱う。
3. `CHANGELOG.md` を変更履歴として扱う。
4. Codexは日本語で回答する。
5. 不明点は推測せず、ユーザーへ質問する。
6. 既存コードを明示的な許可なく削除しない。
7. ファイル削除はユーザーから明示指示がある場合のみ行う。
8. APIキーをリポジトリへ保存しない。
9. 個人情報・認証情報などの機密情報を保存しない。
10. 影響範囲が大きい変更は、実施前に内容と影響を説明する。

## Git運用ルール

### GitHubアカウント分離（絶対ルール）

本Windowsでは、Claude Code用の会社GitHubと、Codex用の個人GitHubを完全に分離します。このルールは他のGit運用ルールより優先します。

- 本プロジェクトではCodex用の個人GitHubアカウントだけを使用する。
- Claude Code用の会社GitHubアカウント、会社のSSH鍵、会社のアクセストークン、会社のメールアドレスを使用しない。
- 会社用と個人用でSSH鍵、認証情報、リモートURLを共有しない。
- CodexはGitのグローバルユーザー設定を変更しない。ユーザー名とメールアドレスは本リポジトリのローカル設定に限定する。
- 個人用SSH接続には専用のSSHホスト別名（例：`github-personal`）を使用し、会社用の接続先と明確に区別する。
- Windowsでは本リポジトリの `core.sshCommand` に個人専用鍵を固定し、会社用鍵が選択されないようにする。
- `clone`、`pull`、`push`、リポジトリ作成などのリモート操作前に、接続先、リポジトリ所有者、認証アカウントを必ず確認する。
- リモートURLや認証結果に会社アカウントが含まれる場合は操作を中止し、ユーザーへ確認する。
- 個人用であることを確認できない状態では、GitHubへの書き込み操作を行わない。
- この分離ルールをMacBook側でも同様に適用する。

#### Gitコミットユーザー設定

会社GitHubへの影響を防ぐため、`--global` は使用しません。本リポジトリを初期化した後、リポジトリ内だけに次を設定します。

```shell
git config --local user.name "willieworks-dev"
git config --local user.email "296127537+willieworks-dev@users.noreply.github.com"
```

設定後は次のコマンドで確認し、個人用情報でなければGitHub操作を中止します。

```powershell
git config --local --get user.name
git config --local --get user.email
git remote -v
```

### 作業開始時

1. `README.md` を確認する。
2. `TODO.md` を確認する。
3. `CHANGELOG.md` を確認する。
4. ディレクトリ構成を確認する。
5. `git remote -v` で個人用リポジトリへの接続であることを確認する。
6. 本リポジトリのローカルユーザー名・メールアドレスを確認する。
7. 個人用の認証であることを確認してから `git pull` を実行する。
8. `git status` などで現在の状態を把握する。

### 作業終了時

1. 実施内容を要約する。
2. `CHANGELOG.md` を更新する。
3. `TODO.md` を更新する。
4. 変更内容と接続先を確認する。
5. ユーザーの指示に従って `git add .`、`git commit`、`git push` を行う。
6. コミット候補を提案する。

### コミットメッセージ

- `feat: 新機能追加`
- `fix: 不具合修正`
- `refactor: リファクタリング`
- `docs: ドキュメント更新`
- `style: 表示調整`
- `chore: その他メンテナンス`

### 複数端末での注意

- 作業開始前とpush前にリモートの変更を確認する。
- 端末を切り替える前に、必要な変更をコミットしてGitHubへpushする。
- 同じブランチを複数端末で同時編集しない。
- コンフリクトが発生した場合は内容を確認し、自動的に既存変更を破棄しない。
- MacBookとWindowsの両方で、個人用の専用SSH鍵とSSHホスト別名を設定する。
- Windowsの作業フォルダは `C:\Users\kenji yoshida\Projects\willieworks` とする。
- MacBookの作業フォルダは `/Users/kenjiyoshida/Documents/Codex/willieworks` とする。
- MacBookではSSHホスト別名 `github-personal` とMacBook専用鍵を使用する。
- `.gitattributes` によりテキストファイルの改行を原則LFへ統一する。

## 今後の開発方針

- GitHubリポジトリを接続し、既定ブランチとブランチ運用を確定する。
- 使用技術と実行・テスト手順を確定し、READMEへ追記する。
- MacとWindowsの両環境で同じ手順が再現できるようにする。
- 小さな単位で変更し、TODOとCHANGELOGを継続的に更新する。
- 自動テストやCIは、技術スタック確定後に導入を検討する。

## Codexの作業完了報告

作業完了時は、必ず以下の形式で報告します。

```text
【実施内容】
【変更ファイル】
【注意点】
【次回推奨作業】
```
