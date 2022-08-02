const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
// const { getRandomSentence } = require('../../utils/jinrishici')
const { getHitokotoWords } = require("../../utils/hitokoto")
// 发布沸点
const pinPublish = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要发布${times}篇沸点`)
    for (let i = 0; i < times; i++) {
        // 获取随机一句古诗词
        const words = await getHitokotoWords()
        const pinRes = await API.pinPublish(words)
        // 删除刚发布的沸点
        // await API.pinRemove(pinRes['msg_id'])
    }
    console.log(`发布沸点 done`)
}

module.exports = pinPublish