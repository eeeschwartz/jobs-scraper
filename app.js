var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var RSS = require('rss');
var http = require("http");



/* lets create an rss feed */
var feed = new RSS({
    title: 'city Lexington, KY jobs',
    feed_url: '/rss.xml',
    site_url: 'http://letsencrypt.erikschwartz.net/jobs/',
    language: 'en',
    pubDate: new Date(),
});

var $ = cheerio.load(fs.readFileSync('jobs.html'));

$('.PSLEVEL1GRID tr').each(function(x, el) {
  feed.item({
      title: $(el).find('.PSHYPERLINK a').html(),
      date: $(el).find('.PSEDITBOX_DISPONLY').html(),
  });
});

// cache the xml to send to clients
var xml = feed.xml();

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/xml"});
  response.write(xml);
  response.end();
});
server.listen(8000);