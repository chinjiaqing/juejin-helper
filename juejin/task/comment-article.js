// 文章评论
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getArticleList } = require('../common')
const { getRandomInt } = require("./../../utils/index")
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
    const defaultComments = [
        `感谢，学习了，受益颇多`,
        '竟然还能这样，妙啊！',
        '学到了',
        '听君一席话，如同听君一席话',
        '我虽然看不懂，但我大受震撼',
        '已阅',
        '666',
        '收藏了',
        'mark',
        '怎么做才能像你一样优秀？真让人头疼'
    ]
    for (let i = 0; i < times; i++) {
        const article = articles[i] || false
        if (!article) break;
        const { article_id, title } = article['article_info']
        const index = getRandomInt(0, defaultComments.length)
        const words = defaultComments[index] || defaultComments[0]
        const comment = await API.articleCommentAdd(article_id, words)
        // 删除评论
        // await API.articleCommentRemove(comment['comment_id'])
    }
    console.log(`评论文章 done`)
}

module.exports = articleComment