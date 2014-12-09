var express = require('express'),
  http = require('http'),
  morgan = require('morgan'),
  app = express(),
  cheerio = require('cheerio'),
  request = require('request'),
  url = require('url'),
  annyang = require('annyang');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('tiny'));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/getFood', function(req, res){

  console.log(req.query.term);
  var passUrl = 'https://www.freshdirect.com/srch.jsp?pageType=search&searchParams='+req.query.term+'&pageSize=3&all=false&activePage=0&sortBy=Sort_Relevancy&orderAsc=true&activeTab=product';

      var options = {
          method: 'GET',
          url: passUrl,
          headers: {
              'User-Agent': 'Mozilla/5.0'
          }
      };
      
      function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
              $ = cheerio.load(body);
              var name = $('.portrait-item-header-name').first().text();
              var price = $('.portrait-item-price').first().text();
              var img = $('.portrait-item-productimage').first().attr('src');
              price = price.trim();
              img = 'http://freshdirect.com' + img;
              console.log(name);
              console.log(price);
              console.log(img);
              res.send({'title': name, 'price': price, 'img':img});
          }
      }
      
      request(options, callback);
});

var httpServer = http.Server(app);

httpServer.listen(8081, function() {console.log('Listening on 8081');});
