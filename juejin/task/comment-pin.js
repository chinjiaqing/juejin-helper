// 沸点评论
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { logger } = require("./../../utils/log")
const { getRandomSentence } = require('../../utils/jinrishici')
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
    const commentIds = []
    for (let i = 0; i < times; i++) {
        const article = pins[i] || pins[0]
        // 随机评论一句古诗
        const words = await getRandomSentence()
        const comment = await API.articleCommentAdd(article['msg_id'], words, 4)
        // 删除评论
        commentIds.push(comment['comment_id'])
        // await API.articleCommentRemove(comment['comment_id'])
    }
    // 将评论id 缓存下来，第二天移除
    logger.set('pins.comments', commentIds).save()
    console.log(`评论沸点 done`)
}

module.exports = pinComment