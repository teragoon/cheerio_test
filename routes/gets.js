var express = require('express');
var Q = require('q');
var request = require('request');
var cheerio = require('cheerio');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var query = req.param('query');
    console.log('query : ' + query);
    
    request({
        url: 'http://m.search.naver.com/search.naver?&where=m&sm=mtp_hty&query=' + query,
        //encoding: 'binary',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
            'Referer': 'http://m.naver.com/'
        }
        }, function (err, resp, body) {
            // var strContents = new Buffer(body, 'binary');
            // strContents = iconv.convert(strContents).toString();
            console.log(err);
            console.log(body);
        if (err) {
            res.send(err);
        } else {
            var $ = cheerio.load(body);
    
            var relateKeyword = $('.rw_help').html();
            console.log('//////////////////////////');
            console.log(relateKeyword);
            res.send(relateKeyword); 
        }
    });
    
/*
    Q().then(function () {
        var defer = Q.defer();
     
        request({
            url: 'http://search.naver.com/search.naver?where=nexearch&query=' + query
            }, function (err, resp, body) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(body);
            }
        });
     
        return defer.promise;
    }).then(function (body) {
        var defer = Q.defer();
        var $ = cheerio.load(body);
     
        defer.resolve($('.lst_relate ul li a').html().toString());
     
        return defer.promise;
    }).then(function (relateKeyword) {
        console.log(relateKeyword);
        res.send(relateKeyword); 
    });
    */
});

module.exports = router;
