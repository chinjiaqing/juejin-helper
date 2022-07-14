const JuejinHttp = require('./juejin/api')
const config = require("./config/index")
const { getCookie } = require('./juejin/cookie')
const { sendEmail } = require(`./utils/email`)
const signIn = async () => {
    try {
        const cookie = await getCookie()
        if (!cookie) {
            throw new Error(`获取cookie失败`)
        }
        const API = new JuejinHttp(cookie)
        const isCheckIn = await API.queryTodayStatus()
        let lotteryName = ''
        if (isCheckIn) {
            console.log(`今日已签到`)
            return
        } else {
            await API.handleCheckIn()
            console.log(`签到成功`)
        }
        const userInfo = await API.queryUserProfile()
        const { free_count } = await API.queryLotteryConfig()
        if (!free_count) {
            console.log(`今日已免费抽奖`)
        } else {
            const { lotteries } = await API.queryLuckyList()
            const luckyId = lotteries && lotteries[0] ? lotteries[0]['history_id'] : 0
            const { has_dip, dip_action, total_value } = await API.handleDipLucky(luckyId)
            if (has_dip) {
                console.log(`今日已沾过喜气`)
            }
            if (dip_action === 1) {
                console.log(`沾喜气成功`)
            }
            console.log(`当前喜气值：${total_value}`)
            const { lottery_name } = await API.handleLotteryDraw()
            lotteryName = lottery_name
            console.log(`抽奖成功：${lotteryName}`)
        }
        const totalPoint = await API.queryTotalPoint()
        console.log(`当前矿石：${totalPoint}`)
        console.log(`签到成功`)
        await sendEmail({
            to: config.user.email,
            text: `签到成功，拥有矿石：${totalPoint}`,
            subject: '【掘金】签到成功'
        })
    } catch (err) {
        console.log(`签到失败`)
        console.log(err)
        await sendEmail({
            to: config.user.email,
            text: `签到失败：${err.message}`,
            subject: '【掘金】签到失败'
        })

    }
}

module.exports = {
    signIn
}