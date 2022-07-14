
const JuejinHttp = require('./juejin/api')
const { getCookie } = require('./juejin/cookie')
const { handleTask } = require("./juejin/task")
const { sendEmail } = require(`./utils/email`)
const config = require("./config/index")

const growth = async () => {
    try {
        const cookie = await getCookie()
        const API = new JuejinHttp(cookie)
        const { growth_tasks = {} } = await API.getTaskList()
        const data = Object.values(growth_tasks)
        let taskHasDone = 0
        for (let items of data) {
            for (let task of items) {
                if (task.limit > 0 && task.done < task.limit && ![4, 15, 16].includes(task.task_id)) {
                    console.log(`---开始任务：<${task.title}> ---`)
                    await handleTask(task)
                    taskHasDone += 1
                }
            }
        }

        const { today_jscore } = await API.getTaskList()
        console.log(`成长任务已完成, 今日掘友分+${today_jscore}`)
        if (taskHasDone > 0) {
            await sendEmail({
                to: config.user.email,
                text: `成长任务已完成, 今日掘友分+${today_jscore}`,
                subject: '【掘金】上分成功'
            })
        }
    } catch (err) {
        console.log(err)
        await sendEmail({
            to: config.user.email,
            text: `任务失败：${err.message}`,
            subject: '【掘金】上分失败'
        })
    }

}


// growth()

module.exports = {
    growth
}