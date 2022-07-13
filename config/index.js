module.exports = {
    // 这里的邮箱配置以网易邮箱为例，qq邮箱端口和host等均会有差异 具体可以留言提问或百度
    email: {
        provider: {
            auth: {
                user: process.env.EMAIL_USER, // 你的网易邮箱账号
                pass: process.env.EMAIL_PASS,  // 你的网易邮箱 smpt 授权码
            },
            host: 'smtp.163.com',
            secure: true,
            port: 465,
            secureConnection: true
        }
    },
    juejin: {
        login: 'https://juejin.cn/login',
        loginApi: '/passport/web/user/login',
        verifyApi: 'verify.snssdk.com/captcha/verify',
    },
    user: {
        mobile: process.env.USER_MOBILE, //你的掘金登录手机号
        password: process.env.USER_PASSWORD, // 你的掘金登录密码
        email: process.env.USER_EMAIL, // 你的接收通知的邮箱
    }
}