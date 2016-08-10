var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var RSS = require('rss');
var http = require("http");
var crypto = require('crypto');

function getJobs() {
  var feed = new RSS({
      title: 'city Lexington, KY jobs',
      feed_url: '/rss.xml',
      site_url: 'http://letsencrypt.erikschwartz.net/jobs/',
      language: 'en',
      pubDate: new Date(),
  });

  var $ = cheerio.load(fs.readFileSync('jobs.html'));

  $('.PSLEVEL1GRID tr').each(function(x, el) {
    // skip headers
    if ($(el).find('th').length > 0) { return; }

    var td = $(el).find('td');
    var item = {
        //title: $(el).find('.PSHYPERLINK a').html(),
        date: td.next().find('span').html(),
        title: td.next().next().find('a.PSHYPERLINK').html(),
        url: 'https://jobs.lexingtonky.gov/psp/candidate/EMPLOYEE/HRMS/c/HRS_HRAM.HRS_CE.GBL?Page=HRS_CE_JOB_DTL&Action=A&SiteId=1&PostingSeq=1&JobOpeningId=' + td.next().next().next().find('span').html()
    };
    item.guid = '' + item.title + item.date;
    item.guid = crypto.createHash('md5').update(item.guid).digest('hex');
    feed.item(item);
  });
 // feed.item({ title: 'foo', date: Date.now() });
  return feed.xml();
}

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/xml"});
  response.write(getJobs());
  response.end();
});
server.listen(80);
