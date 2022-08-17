const { signIn } = require('./sign')
const { growth } = require('./growth')
const { closeBrowser } = require("./puppeteer/index")
const { writeTimestamp } = require("./utils/log")
    ; (async () => {
        await signIn()
        if (!process.env.NOT_GROWTH) {
            await growth()
        }
        await closeBrowser()
        // 每次执行完写入文件，再自动push一次，避免仓库不更新导致actions被关闭
        writeTimestamp()
    })()