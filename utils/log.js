const DotJson = require('dot-json');
const logger = new DotJson('record.json');

// 写入数据
// 避免文件不存在
logger.set('timestamp', Date.now()).save()

const readLogger = async keyName => {
    return new Promise((r, j) => {
        logger.get(keyName, function (value) {
            return r(value)
        })
        return j()
    })
}

module.exports = {
    logger,
    readLogger
}