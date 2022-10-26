const express = require('express')
const path = require('path')
const {readFile,readFileSync} = require("fs");


const app = express()
const port = 3000

const PUBLIC_PATH = path.join(__dirname,"client","public")


app.use(express.static(PUBLIC_PATH))

// const txt = readFileSync(PUBLIC_PATH+"/pages/home.html",'utf8')

// console.log(txt)

app.get("/",(request,response)=>{
    response.sendFile(path.join(PUBLIC_PATH,'pages','home.html'))
})
app.get("/rps",(request,response)=>{
    response.sendFile(path.join(PUBLIC_PATH,'pages','rps.html'))
})
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port} !`))

module.exports= app;