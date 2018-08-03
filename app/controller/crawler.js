/**
 * 小说爬虫
 */


const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');
const fs = require('fs');


const URL = require('url');
const Path = require('path');


let piaotianUrl = 'https://www.piaotian.com/html/3/3155/';
let urlList = [];
const crawler = async (req, res) => {
    const { text } = await superagent.get(piaotianUrl).charset('gbk');
    const $ = cheerio.load(text);

    $('.centent a').each((k, e) => {
        let $e = $(e)
        let val = URL.resolve(piaotianUrl, $e.attr('href'))
        urlList.push({
            title: $e.text(),
            url: val
        })
    })

    let send = await Promise.all(urlList.slice(4).map(v => superagent.get(v.url).charset('gb2312')));

    let data = send.map((v, k) => crawlerChild(v, urlList[k]));
    console.log(data)
    var path = Path.resolve(__dirname, '../../public/txt/test.txt');

    fs.writeFile(path, data.join('\r\n'), 'utf8', (err, fd) => {
        if (err) throw err;
        res.send(`<a href="${path} download="雪中悍刀行.txt">点击下载</a>`)
    })
}



const crawlerChild = ({ text }, { title }) => {
    text = text.replace(/<br>/g, '<div class="mytext">');
    const $ = cheerio.load(text);
    return $('.mytext').text()
}





module.exports = (req, res) => crawler(req, res)