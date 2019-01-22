# Git

## 新增文件

- 添加指定文件到暂存区: git add [file1] [file2] ...
- 添加当前目录的所有文件到暂存区：git add .

## 代码提交

- 提交暂存区到仓库区：git commit -m [message]

## 分支管理

- 列出所有本地分支：git branch
- 新建一个分支，但依然停留在当前分支：git branch [branch-name]
- 新建一个分支，并切换到该分支：git checkout -b [branch]
- 删除分支：git branch -d [branch-name]

## 查看信息

- 查看有变更的文件：git status
- 查看提交历史：git log
- 查看命令历史：git reflog
- 显示暂存区和工作区的代码差异：git diff
- 显示今天你写了多少行代码：git diff --shortstat "@{0 day ago}"

## 远程同步

- 更新远程仓储：git remote update
- 取回远程仓库的变化，并与本地分支合并：git pull [remote] [branch]
- 上传本地指定分支到远程仓库：git push [remote] [branch]

## 撤销

- 撤销工作区的修改：git checkout -- file
- 版本回退，与上一次commit保持一致：git reset --hard
- 版本回退，与指定 commit 版本一致：git reset --hard [commit_id]
- 暂时将未提交的变化移除，稍后再移入：
  - git stash
  - git stash pop