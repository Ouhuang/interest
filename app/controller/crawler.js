/**
 * 小说爬虫
 */


const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');
const fs = require('fs');


const URL = require('url');
const Path = require('path');


let piaotianUrl = 'https://www.piaotian.com/html/8/8410/';
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

    let send = await Promise.all(urlList.map(v => superagent.get(v.url).charset('gb2312')));

    let data = send.map((v, k) => crawlerChild(v.text, urlList[k]));

    var path = Path.resolve(__dirname, '../../public/txt/test.txt');

    fs.writeFile(path, data.join('\r\n'), 'utf8', (err, fd) => {
        if (err) throw err;
        res.send(`<a href="${path} download="超级神基因.txt">点击下载</a>`)
    })
}



const crawlerChild = async (text, title) => {
    console.log(text)

    return '\r\n' + title + '\r\n' +
        text.match(/<br>([\D\d]*?)<\/div>/g).replace(/(<br>)|(<\/div>)/g, '')
            .replace(/<br \/>/g, '\r\n').replace(/&nbsp;/g, ' ') +
        '\r\n';
}





module.exports = (req, res) => crawler(req, res)