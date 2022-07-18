const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const path = require('path')
const { getDateStr } = require("./dayjs")
const db = new JsonDB(new Config(path.join(__dirname, '../data/history'), true, true, '/'))
const fs = require('fs')

db.push('/homepage', 'https://github.com/chinjiaqing/juejin-helper')


const insertTo = (...params) => {
    const dbKey = ['', getDateStr('YYYY-MM'), getDateStr()].join('/')
    return new Promise((r, j) => {
        try {
            db.push(dbKey, ...params, false)
            r()
        } catch (error) {
            console.log(error)
            r()
        }
    })
}

const dbGet = key => {
    return new Promise(r => {
        try {
            const data = db.getData(key)
            r(data)
        } catch (error) {
            console.log(error)
            r()
        }
    })
}

const exportJson2Js = async () => {
    const data = await dbGet('/')
    if (data) {
        const txt = `
            const data = ${JSON.stringify(data)}

            export default data
        `
        fs.writeFile('history.js', txt, function (err) {
            if (err) {
                console.log(`写入js失败 -- `)
            }
        })
    }
}

module.exports = {
    db,
    insertTo,
    exportJson2Js
}