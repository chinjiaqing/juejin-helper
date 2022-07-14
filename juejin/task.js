
const { getBrowser, closeBrowser } = require('../puppeteer/index')
const { getCookie } = require('./cookie')
const JuejinHttp = require('./api')

// 获取最新文章列表
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

const handleTask = async task => {
    const id = task.task_id
    if (id == 13) {
        await readArticle(task)
    }
    if (id == 9) {
        await articleDigg(task)
    }
    if (id == 12) {
        await articleCollect(task)
    }
    if (id == 11) {
        await followAuthor(task)
    }
    if (id == 7) {
        await articleComment(task)
    }
    if (id == 8) {
        await pinComment(task)
    }
    if (id == 10) {
        await pinDigg(task)
    }
    if (id == 6) {
        await pinPublish(task)
    }
    if (id == 5) {
        await articlePublish(task)
    }
}

// 收藏文章
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
    const defaultCollectionId = collectionList[0]['collection_id']
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要收藏${times}篇文章`)
    for (let i = 0; i < times; i++) {
        const article = list[i] || list[0]
        await API.articleCollectAdd(article['article_id'], defaultCollectionId)
        await API.articleCollectRemove(article['article_id'])
    }
    console.log(`收藏文章 done`)
}


// 点赞文章

const articleDigg = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const articles = await getArticleList()
    const list = articles.filter(v => v.user_interact && v.user_interact.is_digg === false)
    if (list.length == 0) {
        console.log(`获取文章列表失败[d1]`)
        return
    }
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要点赞${times}篇文章`)
    for (let i = 0; i < times; i++) {
        const article = list[i] || list[0]
        await API.diggSave(article['article_id'])
        await API.diggCancel(article['article_id'])
    }
    console.log(`点赞文章 done`)
}


// 阅读文章
const readArticle = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const host = 'https://juejin.cn/post/'
    const articles = await getArticleList()
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要阅读${times}篇文章`)
    for (let i = 0; i < times; i++) {
        let article = articles[i]
        console.log(`阅读文章《${article['article_info']['title']}》`)
        await API.growthPointReport(article.article_id)
    }
}

//关注用户
const followAuthor = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const authors = await API.getRecommendAuthors()
    const list = authors.filter(v => v.isfollowed === false)
    if (list.length == 0) {
        console.log(`获取推荐用户失败[r1]`)
        return
    }

    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要关注${times}位用户`)
    for (let i = 0; i < times; i++) {
        const author = list[i] || false
        if (!author) break;
        await API.toggleFollowAuthor(author['user_id'], true)
        await API.toggleFollowAuthor(author['user_id'], false)
    }
    console.log(`关注用户 done`)
}

// 文章评论

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
        const comment = await API.articleCommentAdd(article['article_id'], `感谢，学习了`)
        await API.articleCollectRemove(comment['comment_id'])
    }
    console.log(`评论文章 done`)
}

// 沸点评论
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
        const article = pins[i] || false
        if (!article) break;
        const comment = await API.articleCommentAdd(article['msg_id'], `沸点评论${task.done + 1}/${task.limit}`, 4)
        await API.articleCollectRemove(comment['comment_id'])
    }
    console.log(`评论沸点 done`)
}

// 沸点点赞 
const pinDigg = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const articles = await API.getRecommendPins()
    const list = articles.filter(v => v.user_interact && v.user_interact.is_digg === false)
    if (list.length == 0) {
        console.log(`获取沸点列表失败[f2]`)
        return
    }
    const article = list[0]
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要点赞${times}篇沸点`)
    for (let i = 0; i < times; i++) {
        await API.diggSave(article['msg_id'], 4)
        await API.diggCancel(article['msg_id'], 4)
    }
    console.log(`点赞沸点 done`)
}

// 发布沸点
const pinPublish = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要发布${times}篇沸点`)
    for (let i = 0; i < times; i++) {
        const pinRes = await API.pinPublish(`up up up , 今日沸点 ${task.done + 1} / ${task.limit}`)
        await API.pinRemove(pinRes['msg_id'])
    }
    console.log(`发布沸点 done`)
}

const articlePublish = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const browser = await getBrowser()
    const page = await browser.newPage()
    await page.goto(`https://so.toutiao.com/search?dvpf=pc&source=search_subtab_switch&keyword=%E5%89%8D%E7%AB%AF&pd=information&action_type=search_subtab_switch&page_num=0&search_id=&from=news&cur_tab_title=news`)
    await page.waitForTimeout(1000)
    await page.waitForSelector('.main .s-result-list')
    let links = await page.$$eval('.main .result-content', els => {
        return els.map(el => {
            let $a = el.querySelector("a.text-ellipsis.text-underline-hover")
            if ($a) {
                return $a.getAttribute('href')
            }
        })
    })
    links = links.filter(v => !!v)
    if (!links.length) {
        console.log(`未抓取到合适的文章`);
        return
    }
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要发布${times}篇文章`)
    for (let i = 0; i < times; i++) {
        let tt = links[i] || links[0]
        await page.goto(tt)
        await page.waitForTimeout(1000)
        await page.waitForSelector('.article-content')
        const title = await page.$$eval(".article-content>h1", els => {
            return els[0].innerText;
        })
        let content = await page.$$eval('article', els => {
            return els[0].innerText
        })
        if (content.length == 0) {
            content += title
        }
        let brief_content = content.substr(0, 50) + '...'
        while (brief_content.length < 50) {
            brief_content += brief_content
        }
        const articleInfo = await API.createArticle(title).catch(err => {
            console.log(`发布失败`)
            console.log(err)
        })
        const article_id = articleInfo['id']
        const updateInfo = await API.updateArticle(article_id, title, brief_content, content).catch(err => {
            console.log(`发布失败2`)
            console.log(err)
        })
        await page.goto(`https://juejin.cn/editor/drafts/${article_id}`)
        await page.waitForTimeout(2000)
        await page.click(".publish-popup")
        await page.waitForTimeout(2000)
        await page.click(".panel .footer button:last-of-type")
        const publishRes = await page.waitForResponse(response => response.url().includes(`https://api.juejin.cn/content_api/v1/article/publish`))
        const publishResJson = await publishRes.json()
        if (publishResJson.err_no == 0) {
            const data = publishResJson.data
            await API.articleRemove(data.article_id || '')
        }
    }
    //
    await page.close()
    console.log(`发布文章 done`)
}

module.exports = {
    handleTask,
    articlePublish
}