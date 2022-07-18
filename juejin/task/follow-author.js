const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { insertTo } = require("../../utils/db")
const { getDateStr } = require("../../utils/dayjs")
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
    const dbData = []
    for (let i = 0; i < times; i++) {
        const author = list[i] || false
        if (!author) break;
        const { user_name, user_id } = author
        await API.toggleFollowAuthor(user_id, true)
        dbData.push({
            action_name: '取消关注',
            ident: 'follows',
            id: user_id,
            timestr: getDateStr(2),
            content: `关注了用户 <a href="https://juejin.cn/user/${user_id}" target="_blank">${user_name}</a>`
        })
        // 取消关注
        // await API.toggleFollowAuthor(author['user_id'], false)
    }
    await insertTo(dbData)

    console.log(`关注用户 done`)
}

module.exports = followAuthor