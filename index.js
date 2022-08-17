const { signIn } = require('./sign')
const { growth } = require('./growth')
const { closeBrowser } = require("./puppeteer/index")
    ; (async () => {
        await signIn()
        if (!process.env.NOT_GROWTH) {
            await growth()
        }
        await closeBrowser()
    })()