# 掘金助手

**无需复制 cookie,直接部署后托管就行，懂我意思吧**

![008hT4DMly1gwphdd018zg306y068axz.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5f74af8f821447f8ca4eae1c96d29d9~tplv-k3u1fbpfcp-watermark.image?)

## 功能清单

- 每日签到
- 每日沾喜气
- 每日免费抽奖
- 每日成长任务
- 邮件通知

## 使用 github workflows 进行托管

**大约在每天的北京时间 8：00 左右执行**

1. Fork 仓库

2. 在仓库 `Settings->Secrets->Actions`中添加如下几个变量：

| NAME          | VALUE              |
| ------------- | ------------------ |
| EMAIL_USER    | 发送邮件的邮箱账号 |
| EMAIL_PASS    | 发送邮件的授权码   |
| USER_MOBILE   | 掘金账号 - 手机号  |
| USER_PASSWORD | 掘金账号 - 密码    |
| USER_EMAIL    | 接收通知的邮箱账号 |

3. 在 `Settings->Actions`确保 actions 是开启状态

4. 关于发送邮件通知，本项目通知使用的是网易 163 邮箱，如果你想使用其他邮件服务商进行推送，记得在`config.js`的`email.provider`选项中进行配置修改

- [网易邮箱-POP3/SMTP/IMAP](https://help.mail.163.com/faq.do?m=list&categoryID=90)
- [nodemailer 参考手册](https://www.npmjs.com/package/nodemailer)
