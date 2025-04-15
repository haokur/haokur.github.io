---
group: 工具
title: git
---

### 配置

- 当前仓库设置用户名和邮箱

```shell
git config user.name <用户名>
git config user.name <用户邮箱>
```

- 全局设置用户名和邮箱

```shell
git config --global user.name <用户名>
git config --global user.name <用户邮箱>
```

> 设置的邮箱，在不同的 git 仓库平台会去匹配用户设置的头像

### 操作

- 凭据管理器，记住用户名和密码：

```shell
git config --global credential.helper store
```

- 设置 pull 代码时模式为 rebase 模式

```shell
git config branch.<branchName>.rebase true

# 例如：git config branch.master.rebase true
```

> 在设置为 rebase 模式后，git 的提交记录会是线性的，不会出现 merge 支线
> 在拉取代码有冲突时，会生成一个临时分支，合并完代码后不直接 git push，而是执行 `git rebase --continue` 直到输出 `fatal: No rebase in progress?`，然后确认当前分支回到了自己的分支，再执行 git push

- 当前回退到远端分支的最新版本

```shell
git reset --hard origin/<branchName>

# 例如：git reset --hard origin/master
```
