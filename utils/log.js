const path = require('path')
const fs = require('fs')

// 每次执行完写入文件，再push一次，避免仓库不更新导致actions被关闭
const writeTimestamp = () => {
    fs.writeFileSync(path.join(__dirname, '../t.txt'), `${new Date().getTime()}`, err => {
        if (err) {
            console.log('写入文件失败')
        }
    })
}

writeTimestamp()
