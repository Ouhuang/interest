/**
 * 小说爬虫
 */


const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');

const URL = require('url');


let piaotianUrl = 'https://www.piaotian.com/html/8/8410/';
let urlList = [];
const crawler = async (req, res) => {
    const { text } = await superagent.get(piaotianUrl).charset('gbk');
    const $ = cheerio.load(text);


    $('.centent a').each((k, e) => {
        let $e = $(e)
        let val = URL.resolve(piaotianUrl, $e.attr('href'))
        urlList.push(val)
    })

    let send = await crawlerChild(urlList[0]);
    res.send(send)
}



const crawlerChild = async (url) => {
    let { text } = await superagent.get(url).charset('gb2312');

    return text.match(/<br>([\D\d]*?)<\/div>/g);
}








module.exports = (req, res) => crawler(req, res)