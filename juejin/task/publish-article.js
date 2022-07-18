const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getBrowser } = require("../../puppeteer/browser")
const { insertTo } = require("../../utils/db")
const { getDateStr } = require("../../utils/dayjs")

const mockArticleData = {
    title: '如果有一天不做前端了，我会做什么？',
    brief_content: '毕业后就投身于前端行业，这期间做过业务，做过基建，大前端技术体系下的各个子方向基本都实践过。回过头来看，与刚进入前端行业时相比，对前端行业的认识更清晰...',
    content: `毕业后就投身于前端行业，这期间做过业务，做过基建，大前端技术体系下的各个子方向基本都实践过。回过头来看，与刚进入前端行业时相比，对前端行业的认识更清晰了，但也发现困惑更多了，追求的东西好像变了，欠缺的东西变多了。

我认为的工作是什么样的?

起初以为工作是生活的小部分，后来发现工作是生活的大部分，工作不顺影响生活，影响自己，我们应该更认真的去对待工作。

佛陀传中记录了一个故事叫《看顾水牛经》，我觉得它很好的表达了好的工作方式是什么样的。

“什么才是一个好的牧童应该知道和做到的。一个好好照顾水牛的孩子，应该熟悉他看管的水牛。他会知道每一头水牛的特征和倾向，什么时候要替它们擦洗身体，怎样料理它们的伤口，用烟来赶走蚊虫，给它们找安全的路行走，爱护它们，带它们过河时行水最浅的地方，给它们新鲜的草和水，好好的保养草原，又使年长的水牛给年幼的做好榜样。”—— 看顾水牛经（佛陀传）

对牧童来说，放牛就是他的工作，工作内容很简单，但仔细深究就会发现 ，要关注很多方面才能将事情做好。正如我们所面对的工作一样，虽然内容各种各样的，但要做好，方法是一样的，认真的去做，找到正确的方式去做，希望各位能找到愿意以“主人翁”心态去工作的工作，看到自己工作的价值。

我为什么要做前端？

一个简单的问题，但大部分人却说不清楚，我当初也是误打误撞进入了这个行业，不知不觉就干了快七年。漫无目的的做一件事情是很难做好的，也是痛苦的，尤其是这件事还占据了我们最多的时间，所以我们需要想清楚，前端是什么？价值在哪？

这里我将前端按下面三个维度进行拆分：

面向公司的前端 - 不同的公司，不同的团队前端要做的事情也是有差异的，作为前端，可以解决公司前端相关问题
解决了生存的问题，维护一定的社会关系，在整个就业环境中表现得还不错，所以选择了这个行业
掌握并理解前端行业专业技术 - 掌握各项前端知识且可灵活运用解决行业问题
前端是一个充满了活力而且没有太多专业壁垒的行业，你可以很容易享受整个行业带来的改变以及去影响行业的发展，社区中的很多知名开源工具软件就是个人的作品，比如 Vue，这是一个通过个人影响全球开发者的典型案例。
基于你所掌握的技术能给社会带来的价值 - 技术转换为产品，产品带来价值
虽然前端只是软件工程分工中的一个环节，但前端是个另类，你完全可以通过前端技能去完成一款产品的开发，即在互联网的世界中，你可以创造属于你自己的产品，这也是前端的魅力，创造给未来带来更多可能。

记得曾经看到过的一句话，人一定得有创造，只有创造才能带来新的价值，我觉得前端就是一个有创造可能的行业。

做技术还是做业务

在稍微大一点的公司或者前端团队，前端的工作性质也会分为业务支持和技术架构 ，一个是将业务产品需求转化为面向普通用户的产品；一个是提供良好的技术工具给业务前端同学去更好的完成产品的开发。

如果有条件，我觉得两种都去接触接触，因为这本就是分不开的两个东西，只不过侧重点不同，所以带来的结果是做业务的同学需要考虑技术产出，做技术的同学需要有业务思考。有机会的话，最好两个方向都做一段时间，不限制自己只能做什么。

无论做哪个方向，一定要保持自己技术广度的扩充，你可以不去深挖，但一定要了解，当需要的时候你才能立马拿起来。

兴趣与工作的关系

我觉得兴趣与工作理想的关系应该是工作为主，兴趣为辅，两者缺一不可。对自己的工作没有一点兴趣的工作过程是痛苦的，你可以从过程中，或者结果上，或者关联的人、团体上发现自己感兴趣的点，这样你的工作会轻松很多，有点像在茫茫沙漠中行走，偶尔出现的一抹绿株。但兴趣不可占了全部，如果关注了过多的兴趣就可能会忽视工作本身，从而带来不好的结果。

如果你对你的工作还没有一点兴趣，那么请培养吧，如果有了兴趣，那么就想办法结合起来，让兴趣帮助你做得更好。

怎么知道自己对哪方面感兴趣？ 看看自己下班后会做什么与工作关联的事情吧，没有外部推动，自己主动去关注尝试的可能就是你感兴趣的。

“主动” 的工作思维

我带过团队，也经历过多任主管，我发现在评价一个人的时候，很关注主动性。你可能会听到领导说做事要主动点，可能也收到过缺乏业务思考的评价。

在长期的学校教育中，我们一直接受的是 “被动” 的学习方式，老师教什么，我们学什么。考核也是用固定的考题，具备标准的答案，所以导致我们缺乏了一点主动。我刚开始工作那几年就基本处于这种状态，去到新公司，等公司的新人培训，等待师兄的指导，等待领导安排任务；而没有去了解新团队是什么样的，我应该怎么样才能更好的融入，我能给团队带来什么？在团队的职责范围内，我更想做什么？

从以公司为中心转变为以我为中心，除了给公司带来一个员工外，想想能给公司带来什么？

工作太多，总是忙不过来怎么办？

忙碌会给人带来一种很充实的错觉，感到自己被需要，感到自己在成长，内心感到充实。不拒绝短期的忙碌，避免长期的忙碌。

忙不过来是很多人都会遇到的，也是经常听到大家抱怨的，总感觉活干不完，总感觉持续了一段时间都在忙碌中度过，但事后来看，好像又没做了什么东西？

为什么很忙？

需求太多，历史债务，人员更替 —— 客观因素
太着急做，可能做了 10 件事，解决了 10 个业务的问题，但是有一半是重复的 —— 没有找到根源，缺乏深层次的解决方案
所有的事情都想做，单线程当多线程用 —— 拆解归纳需求，按优先级取舍

怎么解？

如果活确实太多，而且都不能拉下，一个人当几个人用，可以和领导沟通，寻求解决办法
分清优先级（不要全是 P0/P1，那和没有优先级有什么区别？），该舍弃的舍弃
有时候做的许多需求（尤其是技术需求）并不是那么急需
分一部分给别人去做，事情一个人是做不完的，寻求合作伙伴一起解决
即使最忙的时候也抽时间停下来，想一想，和别人聊聊，也许会出现灵光一闪的情况

忙碌的状态肯定是不好的，不要沉迷忙碌而当做充实，忙碌不会让你成长，只会让你更疲惫。人生是马拉松长跑，不是短距离冲刺，适当停下来想一想，也许能找到更好的实现路径。

如何处理领导/下属/同事沟通相处？
和领导沟通担心留下不好印象，暴露自己的无知？所以遇事自己憋着，或是瞎揣测
建立有效沟通，提前想一遍，然后将自己的方案和结论拿出来沟通，领导往往比你获取到更多的信息，经验更丰富，和能给出你良好建议的人沟通才能帮助你更快成长
领导比你想象中更愿意和你沟通
和下属沟通有隔阂，总感觉留有余地，或是事情讲不明白
建立信任机制，根据性格选择合适的沟通方式，有问题该说的说，该表扬的表扬
沟通有困难，看看是不是有信息差或是经验欠缺。下属获取的信息可能不全面，技能和经验上可能不如自己，将背景和必要信息讲清楚
和同事担心竞争
你不可能一个人把事都做了，更多的是大家一起才能把事做好，我们应该考虑的是怎样把事情做得更好更大而不是想着蛋糕谁分大小的问题。如果你能帮助和影响他人成长，那么你一定也会有所收获的。
如何看待职业天花板？

前端是否有天花板，我说肯定是有的，每个行业都有天花板，只是前端的看着比较明显，我也一直在思考下一个成长点在哪？

我觉得前端只有某一方向的深度是不够的，不要局限自己，应该往综合方面发展，也不仅仅只关注技术层面。

与其想那么多 ，不如赶紧去做，只有尝试了才能知道结果
多和优秀的人、不同行业的人沟通，尝试进入不同的圈子
如果你已经有了选择的方向，那就持续专研下去，努力的过程终会成就自己
如果结果没有那么好，那么就接受平凡的结果，也接受平凡的自己
如果有一天不做前端了，我会做什么

我想我依然会抽时间写代码，做自己想要的产品，只打磨功能，不关注代码规范、不关注稳定性、不关注测试覆盖率、不关注 eslint、不关注性能、不关注 bug 率。

原文链接：
http://click.aliyun.com/m/1000346073/

本文为阿里云原创内容，未经允许不得转载。`
}


const articlePublish = async task => {
    const cookie = await getCookie()
    const API = new JuejinHttp(cookie)
    const times = task.limit - task.done; //需要执行的次数
    console.log(`需要发布${times}篇文章`)
    let links = [];
    let articles = []
    const defaultArticles = Array(times).fill(mockArticleData)
    const browser = await getBrowser()
    const page = await browser.newPage()
    try {
        // 爬取一篇文章发布 并删除
        await page.goto(`https://segmentfault.com/blogs/newest`)
        await page.waitForTimeout(1000)
        await page.waitForSelector(".content-list-wrap")
        const host = `https://segmentfault.com`
        links = await page.$$eval('.content-list-wrap .list-group-item', els => {
            return els.map(el => {
                let $a = el.querySelector("h5 a.title")
                if ($a) {
                    return $a.getAttribute('href')
                }
            })
        })
        links = links.filter(v => !!v)
        if (!links.length) {
            console.log(`未抓取到合适的文章`);
        } else {
            for (let i = 0; i < times; i++) {
                let link = host + (links[i] || links[0])
                await page.goto(link)
                await page.waitForTimeout(1000)
                await page.waitForSelector('h1.h2')
                const title = await page.$$eval("h1.h2", els => {
                    return els[0].innerText;
                })
                let content = await page.$$eval('article.article-content', els => {
                    return els[0].innerText
                })
                if (content.length == 0) {
                    content += title
                }
                content += ` \n> 来源： [${title}](${link}) \n`
                let brief_content = content.substr(0, 50) + '...'
                while (brief_content.length < 50) {
                    brief_content += brief_content
                }
                articles.push({
                    title,
                    content,
                    brief_content,
                })
            }
        }
    } catch (err) {
        console.log(`爬取文章失败，将发布默认文章`)
        console.log(err.message)
    }

    articles = articles.concat(defaultArticles)
    const dbData = []
    for (let i = 0; i < times; i++) {
        let currentArticle = articles[i]
        let { title, brief_content, content } = currentArticle
        const articleInfo = await API.createArticle(title).catch(err => {
            console.log(`发布失败`)
            console.log(err)
        })
        const article_id = articleInfo['id']
        await API.updateArticle(article_id, title, brief_content, content).catch(err => {
            console.log(`发布失败2`)
            console.log(err)
        })
        // 去草稿箱点击模拟发布文章
        await page.goto(`https://juejin.cn/editor/drafts/${article_id}`)
        await page.waitForTimeout(2000)
        await page.click(".publish-popup")
        await page.waitForTimeout(2000)
        await page.click(".panel .footer button:last-of-type")
        // 监听发布成功
        const publishRes = await page.waitForResponse(response => response.url().includes(`https://api.juejin.cn/content_api/v1/article/publish`))
        const publishResJson = await publishRes.json()
        if (publishResJson.err_no == 0) {
            const data = publishResJson.data
            dbData.push({
                action_name: '删除文章',
                ident: 'articles.publish',
                id: data.article_id,
                timestr: getDateStr(2),
                content: `发布了文章 <a href="https://juejin.cn/post/${data.article_id}" target="_blank">${title}</a>`

            })
            // 删除刚刚发布的文章
            // ids.push(data.article_id)
            // await API.articleRemove(data.article_id || '')
        }
    }
    await insertTo(dbData)
    await page.close()
    console.log(`发布文章 done`)
}

module.exports = articlePublish