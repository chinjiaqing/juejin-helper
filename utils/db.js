const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const path = require('path')
const db = new JsonDB(new Config(path.join(__dirname, '../data/data'), true, true, '/'))


const insertTo = (dbKey, ...params) => {
    return new Promise(async (r, j) => {
        try {
            await db.push(dbKey, ...params, false)
            await db.save()
            r()
        } catch (error) {
            console.log(error)
            r()
        }
    })
}

const dbGet = (key, isArray = true) => {
    return new Promise(async r => {
        try {
            const data = await db.getData(key)
            r(data)
        } catch (error) {
            r(isArray ? [] : null)
        }
    })
}
insertTo('/homepage', 'https://github.com/chinjiaqing/juejin-helper')
module.exports = {
    db,
    insertTo,
    dbGet
}