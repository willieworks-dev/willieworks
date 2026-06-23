# 個人GitHubセットアップ手順

## 1. GitHubのnoreplyメールを確認する

個人GitHubアカウント `willieworks-dev` でGitHubへログインし、次の順に開きます。

1. 右上のプロフィール画像を開く。
2. `Settings` を開く。
3. 左側の `Emails` を開く。
4. `Keep my email addresses private` を有効にする。
5. GitHubが表示する `...@users.noreply.github.com` のアドレスを確認する。

取得したアドレスはチャットへ共有できますが、READMEなどのGit管理対象ファイルには書き込みません。

## 2. Git設定の方針

本Windowsには会社GitHub環境もあるため、次のグローバル設定は使用禁止です。

```powershell
# 使用禁止
git config --global user.name "willieworks-dev"
git config --global user.email "取得したnoreplyメール"
```

リポジトリ初期化後、対象リポジトリ内でのみ設定します。

```powershell
git config --local user.name "willieworks-dev"
git config --local user.email "取得したnoreplyメール"
```

## 3. 操作前の必須確認

```powershell
git config --local --get user.name
git config --local --get user.email
git remote -v
```

ユーザー名が `willieworks-dev` でない場合、またはリモート所有者が `willieworks-dev` でない場合は、`pull`、`push`、リポジトリ作成を中止します。

## 4. リポジトリ作成条件

- 所有者：`willieworks-dev`
- 公開設定：Private
- リポジトリ名：`willieworks`
- GitHub上の配置：`willieworks-dev/willieworks`
- GitHubを正本（Source of Truth）とする
- MacBookとWindowsで同じリポジトリを使用する

## 5. 認証分離

- 個人用と会社用でSSH鍵を分ける。
- Windowsではリポジトリローカルの `core.sshCommand` に `~/.ssh/id_ed25519_github_personal` を固定する。
- 会社用のSSH鍵、アクセストークン、メールアドレスを本プロジェクトで使用しない。
- GitHubへの書き込み前に、個人アカウントで認証されていることを確認する。

Windowsの作業フォルダ：

```text
C:\Users\kenji yoshida\Projects\willieworks
```
