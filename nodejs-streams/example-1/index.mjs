// const stdin = process.stdin
//   .on('data', msg => console.log('terminal input is', msg))


// const stdout = process.stdout
//   .on('data', msg => console.log(msg.toString().toUpperCase()))

// stdin.pipe(stdout)

import http from 'http'
import { readFileSync, createReadStream } from 'fs'
http.createServer((request, response) => {
    // const file = readFileSync('big.file')
    // response.write(file)
    // response.end()
    createReadStream('big.file')
    .pipe(response)
})
.listen(3000)
.on('listening', () => console.log('server is listening at 3000'))