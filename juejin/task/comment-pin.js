// 沸点评论
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
// const { getRandomSentence } = require('../../utils/jinrishici')
const { getHitokotoWords } = require("../../utils/hitokoto")
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
    for (let i = 0; i < times; i++) {
        const article = pins[i] || pins[0]
        // 随机评论一句古诗
        const { msg_id, content } = article['msg_Info']
        const words = await getHitokotoWords()
        const comment = await API.articleCommentAdd(msg_id, words, 4)
        // 删除评论
        // await API.articleCommentRemove(comment['comment_id'])
    }
    console.log(`评论沸点 done`)
}

module.exports = pinComment