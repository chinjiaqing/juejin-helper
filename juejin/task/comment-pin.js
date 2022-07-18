// 沸点评论
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getRandomSentence } = require('../../utils/jinrishici')
const { insertTo } = require("../../utils/db")
const { getDateStr } = require("../../utils/dayjs")
const pinComment = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const pins = await API.getRecommendPins()
    if (pins.length == 0) {
        console.log(`获取沸点列表失败[d1]`)
        return
    }
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要评论${times}篇沸点`)
    const dbData = []
    for (let i = 0; i < times; i++) {
        const article = pins[i] || pins[0]
        // 随机评论一句古诗
        const { msg_id, content } = article['msg_Info']
        const words = await getRandomSentence()
        const comment = await API.articleCommentAdd(msg_id, words, 4)
        // 删除评论
        dbData.push({
            ident: 'pins.comments',
            action_name: '删除评论',
            id: comment['comment_id'],
            timestr: getDateStr(2),
            content: `评论了沸点 <a href="https://juejin.cn/pin/${msg_id}" target="_blank">${content}</a>`
        })
        // await API.articleCommentRemove(comment['comment_id'])
    }
    await insertTo(dbData)
    console.log(`评论沸点 done`)
}

module.exports = pinComment