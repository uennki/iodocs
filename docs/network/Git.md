# Git

## 新增文件

添加指定文件到暂存区

```bash
git add [file1] [file2] ...
```

添加当前目录的所有文件到暂存区

```bash
git add .
```

## 代码提交

提交暂存区到仓库区

```bash
git commit -m [message]
```

## 分支管理

列出所有本地分支

```bash
git branch
```

新建一个分支，但依然停留在当前分支

```bash
git branch [branch-name]
```

新建一个分支，并切换到该分支

```bash
git checkout -b [branch]
```

删除分支

```bash
git branch -d [branch-name]
```

## 查看信息

查看有变更的文件

```hash
git status
```

查看提交历史

```hash
git log
```

查看命令历史

```hash
git reflog
```

显示暂存区和工作区的代码差异

```hash
git diff
```

显示今天你写了多少行代码

```hash
git diff --shortstat "@{0 day ago}"
```

## 远程同步

更新远程仓储

```bash
git remote update
```

取回远程仓库的变化，并与本地分支合并

```bash
git pull [remote] [branch]
```

上传本地指定分支到远程仓库

```bash
git push [remote] [branch]
```

## 撤销

撤销工作区的修改

```hash
git checkout -- file
```

版本回退，与上一次commit保持一致

```bash
git reset --hard
```

版本回退，与指定 commit 版本一致

```bash
git reset --hard [commit_id]
```

```bash
暂时将未提交的变化移除，稍后再移入
git stash
git stash pop
```