const axios = require('axios')

// https://developer.hitokoto.cn/sentence/#%E7%AE%80%E4%BB%8B
// 一言  随机句子
const getHitokotoWords = async () => {
    return new Promise(async (r) => {
        const defaultWords = `最近大环境好像真的很差哎，以前简历找我的都是一大堆，现在寥寥无几`
        const res = await axios.get('https://v1.hitokoto.cn/').catch(error => {
            return r(defaultWords)
        })
        if (res.status == 200) {
            const data = res.data
            if (data && data.hitokoto) {
                return r(data.hitokoto)
            }
        }
        return r(defaultWords)
    })
}

module.exports = {
    getHitokotoWords
}