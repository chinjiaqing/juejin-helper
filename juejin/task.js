const {
    collectArticle,
    diggArticle,
    diggPin,
    commentArticle,
    commentPin,
    followAuthor,
    publishArticle,
    publishPin,
    readArticle,
} = require("./task/index")

const handleTask = async task => {
    const id = task.task_id
    if (id == 13) {
        await readArticle(task)
    }
    if (id == 9) {
        await diggArticle(task)
    }
    if (id == 12) {
        await collectArticle(task)
    }
    if (id == 11) {
        await followAuthor(task)
    }
    if (id == 7) {
        await commentArticle(task)
    }
    if (id == 8) {
        await commentPin(task)
    }
    if (id == 10) {
        await diggPin(task)
    }
    if (id == 6) {
        await publishPin(task)
    }
    if (id == 5) {
        await publishArticle(task)
    }
}



module.exports = {
    handleTask
}