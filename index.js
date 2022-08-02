const { signIn } = require('./sign')
const { growth } = require('./growth')
const { closeBrowser } = require("./puppeteer/index")
    ; (async () => {
        await signIn()
        await growth()
        await closeBrowser()
    })()