## 简明 git 工作流

1. 配置用户邮箱和用户名
2. 配置 ssh-key
3. 复制远程仓库到本地 `git clone <项目地址>`
4. 创建本地开发分支 `git checkout -b <新分支名>` (在分支上做开发，保持主分支稳定)
5. 做了改动后添加到暂存区   `git add <改动的文件路径>`
6. git 保存暂存区的修改 `git commit -m '提交注释：说明改动的范围&新增的功能&修复的问题`
7. 提交到远程仓库 `git push origin <当前分支名>`  (会在远程服务器上创建同名分支)
8. 把远程仓库上的新分支和并到主分支  发起一个 `merge request` （合并请求）可以在下面看到 `Changes` 标示出哪些地方做了改动

更多操作
1. `git status` 查看当前状态
    * `Changes to be committed:` 已经提交到暂存区的改动  下一步 `git commmit` 保存
    * `Changes not staged for commit:` 还没有提交到暂存区的改动 下一步 `git add` 添加到暂存区
    * `Untracked files:` 不受git管理的文件，一般是新创建的文件， 下一步`git add`
2. `git diff <文件路径>` 在终端查看 diff 看有哪些地方改动了。
3. 本地分支强制覆盖远程分支 `git push --force-with-lease origin feature`
4. 修改 最近一次commit的提交信息 `git commit --amend` 
5. 文件名大小写
   1. 文件名改大小写识别不到
   2. `git config core.ignorecase false` 设置本地git环境识别大小写
   3. 修改文件名 <path/filename> ==> <path/>FileName>
   4.  push 到远程分支
   5. 删除多余的文件 `git rm --cached <path/filename>`
      1.  提示 `rm '<path/>filename>'` 删除成功
   6. add commit push 提交到远程仓库