const axios = require('axios')
const iconv = require('iconv-lite')
const cheerio = require("cheerio");
const log = console.log;

const express = require('express')
const app = express()
 


function main() {

  scrapingResult = {
    'title':'',
    'url':''
  }

  const getHtml = async () => {
    try {
      return await axios.get("https://www.hallym.ac.kr/hallym_univ/sub05/cP3/sCP1", {responseType: "arraybuffer"});
    } catch (error) {
      console.error(error);
    }
  };

  getHtml()
  .then(html => {
    const content = iconv.decode(html.data, "UTF-8").toString()
    const $ = cheerio.load(content);
    const $bodyList = $("ul.tbl-body").find('li.tbl-row:first').find("span.col-2 span").next().find('a');
    scrapingResult['title'] = $($bodyList).text().replace(/[\n\t]/g, '')
    scrapingResult['url'] = $($bodyList).attr('href')
    return scrapingResult;
  })
  .then(res => log(res));

}

temp_sw = ''

function sw() {

  scrapingResult = {
    'title':'',
    'url':''
  }

  const getHtml = async () => {
    try {
      return await axios.get("https://hlsw.hallym.ac.kr/", {responseType: "arraybuffer"});
    } catch (error) {
      console.error(error);
    }
  };

  getHtml()
  .then(html => {
    const content = iconv.decode(html.data, "EUC-KR").toString()
    const $ = cheerio.load(content);
    const $bodyList = $("div.t1").find('ul li:first').find('a');
    scrapingResult['title'] = $($bodyList).text()
    scrapingResult['url'] = 'https://hlsw.hallym.ac.kr/'+$($bodyList).attr('href')

    if(temp_sw == $($bodyList).text()){
      console.log('true')
    }
    else{
      temp_sw = $($bodyList).text()
      console.log('false')
    }

    return scrapingResult;
  })
  .then(res => log(res));

}

// setInterval(sw, 2000) // 5 sec interval
app.listen(8080, ()=>{
  console.log('listen on 80')
})

app.get('/', (req, res)=>{
  res.send('Hello')
})