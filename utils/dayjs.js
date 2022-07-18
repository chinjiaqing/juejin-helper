const dayjs = require('dayjs')
const tz = require("dayjs/plugin/timezone")
const utc = require("dayjs/plugin/utc")
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.tz.setDefault("PRC")



const getDateStr = (pattern = 'YYYY-MM-DD') => {
    if (pattern === 2) {
        return dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    return dayjs().format(pattern)
}

module.exports = {
    dayjs,
    getDateStr
}
