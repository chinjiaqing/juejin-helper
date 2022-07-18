// 沸点点赞 
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { insertTo } = require("../../utils/db")
const { getDateStr } = require("../../utils/dayjs")
const pinDigg = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const articles = await API.getRecommendPins()
    const list = articles.filter(v => v.user_interact && v.user_interact.is_digg === false)
    if (list.length == 0) {
        console.log(`获取沸点列表失败[f2]`)
        return
    }
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要点赞${times}篇沸点`)
    const dbData = []
    for (let i = 0; i < times; i++) {
        const article = list[i] || list[0]
        const { msg_id, content } = article['msg_Info']
        await API.diggSave(article['msg_id'], 4)
        // 取消点赞
        // await API.diggCancel(article['msg_id'], 4)
        dbData.push({
            action_name: '取消点赞',
            ident: 'pins.diggs',
            id: msg_id,
            timestr: getDateStr(2),
            content: `点赞了沸点 <a href="https://juejin.cn/pin/${msg_id}" target="_blank">${content}</a>`
        })

    }
    await insertTo(dbData)
    console.log(`点赞沸点 done`)
}

module.exports = pinDigg