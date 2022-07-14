const axios = require('axios')

const getRandomSentence = async () => {
    return new Promise(async (r) => {
        const defaultWords = `最近大环境好像真的很差哎，以前简历找我的都是一大堆，现在寥寥无几`
        const res = await axios.get('https://v1.jinrishici.com/all.json').catch(error => {
            return r(defaultWords)
        })
        if (res.status == 200) {
            const data = res.data
            if (data && data.content) {
                return r(data.content)
            }
        }
        return r(defaultWords)
    })
}

module.exports = {
    getRandomSentence
}