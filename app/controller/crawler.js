const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');

const url = require('url');


let piaotianUrl = 'https://www.piaotian.com/html/8/8410/';
let urlList = [];
const crawler = async (req, res) => {
    const { text } = await superagent.get(piaotianUrl).charset('gbk');
    const $ = cheerio.load(text);


    $('.centent a').each((k, e) => {
        let $e = $(e)
        let val = url.resolve(piaotianUrl, $e.attr('href'))
        urlList.push(val)
    })
    res.send(urlList)
}






module.exports = (req, res) => crawler(req, res)