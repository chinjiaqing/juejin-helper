// 点赞文章
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getArticleList, saveComments } = require('../common')
const { insertTo, dbGet } = require("../../utils/db")
const articleDigg = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const articles = await getArticleList()
    // 筛选未点赞过的文章
    const list = articles.filter(v => v.user_interact && v.user_interact.is_digg === false)
    if (list.length == 0) {
        console.log(`获取文章列表失败[d1]`)
        return
    }
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要点赞${times}篇文章`)
    for (let i = 0; i < times; i++) {
        const article = list[i] || list[0]
        const { article_id, title } = article['article_info']
        await saveComments(article_id)
        await API.diggSave(article_id)
        // 取消点赞
        // await API.diggCancel(article['article_id'])
    }
    console.log(`点赞文章 done`)
}

module.exports = articleDigg