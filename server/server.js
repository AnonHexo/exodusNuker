const express = require('express')
const server = express()
var clientIP

var currentFile = __filename.slice(__dirname.length + 1, -3)
if (currentFile.length < 7 || currentFile.length > 7) {
    currentFile = currentFile.padEnd(7, '\xa0')
}

server.get("/", function (request, response) {
    clientIP = request.headers['x-forwarded-for']
    if (clientIP == null || clientIP == undefined) {
        clientIP = 'unknown'
    }
    console.log(`${+ Date.now()} | ${currentFile} | ${clientIP} accessed webserver`)
    response.sendFile(__dirname + "/index.html")
})

function keepAlive() {
    server.listen(3000, () => {
        console.log(`${+ Date.now()} | ${currentFile} | Server listening on port 3000 (http://localhost:3000)`)
    })

    server.get("/eval", function (request, response) {
        if (request.query.code == null || undefined) return response.sendFile(__dirname + "/index.html")
        if (!request.query.code == process.env.CODE) {
            return console.log(`${+ Date.now()} | ${currentFile} | ${clientIP} failed evaluating script using webserver (wrong code)`);
        }
        if (request.query.code == process.env.CODE) {
            try {
                console.log(`${+ Date.now()} | ${currentFile} | ${clientIP} sucessfully evaluated script using webserver`)
                eval(request.query.input)
            } catch (error) {
                console.error(error)
            }

            response.sendFile(__dirname + "/index.html")
            return
        }
    })
}

module.exports = keepAlive