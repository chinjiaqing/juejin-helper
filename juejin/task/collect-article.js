const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getArticleList } = require('../common')
const { insertTo } = require("../../utils/db")
const { getDateStr } = require("../../utils/dayjs")
// 阅读文章
const articleCollect = async task => {
    const articles = await getArticleList()
    const list = articles.filter(v => v.user_interact && v.user_interact.is_collect === false)
    if (list.length == 0) {
        console.log(`获取文章列表失败[d1]`)
        return
    }
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const collectionList = await API.getMyCollectionset()
    if (collectionList.length == 0) {
        console.log(`获取收藏集失败`)
        return
    }
    // 取第一个收藏集  一般为默认 收藏集
    const { collection_id, collection_name } = collectionList[0]
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要收藏${times}篇文章`)
    const collections = []
    for (let i = 0; i < times; i++) {
        const article = list[i] || list[0]
        const { article_id, title } = article['article_info']
        await API.articleCollectAdd(article_id, collection_id)
        collections.push({
            ident: 'articles.collections',
            id: article_id,
            action_name: '取消收藏',
            title,
            content: `收藏了文章 <a href="https://juejin.cn/post/${article_id}" target="_blank">《${title}》</a>`,
            timestr: getDateStr(2),
            desc: `收藏至 <a href="https://juejin.cn/collection/${collection_id}" target="_blank">${collection_name}</a>`
        })
        // await API.articleCollectRemove(article_id)
    }
    await insertTo(collections)
    console.log(`收藏文章 done`)
}
module.exports = articleCollect