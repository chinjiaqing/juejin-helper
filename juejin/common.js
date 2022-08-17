// 获取最新文章列表
const { getCookie } = require('./cookie')
const JuejinHttp = require('./api')
const { insertTo, dbGet } = require("../utils/db")
const COMMENTS_MAX_LENGTH = 10000
// 获取文章列表
// 300最新 200 为 默认
const getArticleList = async (sort_type) => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const list = await API.getRecommendArticles(sort_type).catch(err => {
        console.log(err)
    })
    const articles = []
    list.map(v => {
        if (v.item_type == 2) {
            articles.push(v.item_info)
        }
    })
    return articles || []
}

// 2 为 文章， 4为沸点
const saveComments = async (item_id, type = 2) => {
    const dbKey = type == 2 ? '/comments/article' : '/comments/pin'
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const commentItems = await API.getArticleComments(item_id, type)
    const commentWords = commentItems.map(v => v.comment_info.comment_content)
    const dbComments = await dbGet(dbKey)
    if (dbComments && dbComments.length >= COMMENTS_MAX_LENGTH) return
    for (let item of commentWords) {
        // 获取当前文章的评论并存到文件
        if (!dbComments || !dbComments.includes(item)) {
            await insertTo(dbKey + '[]', item)
        }
    }
}


module.exports = {
    getArticleList,
    saveComments
}