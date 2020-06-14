var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommend = require('../models/recommend')
var movie = require('../models/movie');
var article = require('../models/article');
var user = require('../models/user');
/* GET home page. */
//主页
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
//显示主页的推荐大图等
router.get('/showIndex', function (req, res, next) {
    recommend.findAll(function (err, getRecommend) {
        res.json({
            status: 0,
            message: "获取推荐",
            data: getRecommend
        })
    })
});
//显示所有的排行榜，也就是对于电影字段index的样式
router.get('/showRanking', function (req, res, next) {
    movie.find({
        movieMainPage: true
    }, function (err, getMovies) {
        res.json({
            status: 0,
            message: "获取推荐电影",
            data: getMovies
        })
    })
});
//显示文章列表
router.get('/showArticle', function (req, res, next) {
    article.findAll(function (err, getArticles) {
        res.json({
            status: 0,
            message: "获取主页",
            data: getArticles
        })
    })
});
//显示文章的内容
router.post('/articleDetail', function (req, res, next) {
    if (!req.body.article_id) {
        res.json({
            status: 1,
            message: '文章id出错'
        })
    }
    article.findByArticleId(req.body.article_id, function (err, getArticle) {
        res.json({
            status: 0,
            message: "获取成功",
            data: getArticle
        })
    })
});
//显示用户自己个人信息的内容
router.post('/showUser', function (req, res, next) {
    if (!req.body.user_id) {
        res.json({
            status: 1,
            message: "用户状态出错"
        })
    }
    user.findById(req.body.user_id, function (err, getUser) {
        res.json({
            status: 0,
            message: "获取成功",
            data: {
                user_id: getUser._id,
                username: getUser.username,
                userMail: getUser.userMail,
                userPhone: getUser.userPhone,
                userStop: getUser.userStop,
                isUserAdmin: getUser.userAdmin,
                age: getUser.age
            }
        })
    })
});
router.post("/allUser", function (req, res, next) {
    if (!req.body.user_id) {
        res.json({
            status: 1,
            message: "用户状态出错"
        })
    }
    user.findAll(function (err, getAllUser) {
        res.json({
            status: 0,
            data: getAllUser
        })
    })
})

module.exports = router;