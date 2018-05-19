const express = require("express");

const app = express();

app.use(express.static('./app/public')); //静态资源目录

app.get('/emm/*', (req, res) => {
    console.log(req, res)
    res.send()
})


app.listen(8080, () =>
    console.log('启动服务'))