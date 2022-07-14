// 文章评论
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getArticleList } = require('../common')

const articleComment = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const articles = await getArticleList()
    if (articles.length == 0) {
        console.log(`获取文章列表失败[d1]`)
        return
    }
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要评论${times}篇文章`)
    for (let i = 0; i < times; i++) {
        const article = articles[i] || false
        if (!article) break;
        const comment = await API.articleCommentAdd(article['article_id'], `感谢，学习了，受益颇多`)
        // 删除评论
        await API.articleCommentRemove(comment['comment_id'])
    }
    console.log(`评论文章 done`)
}

module.exports = articleComment