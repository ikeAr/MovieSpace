var mongoose = require('../common/db');

var movie = new mongoose.Schema({
    movieName: String,
    movieImg: String,
    movieVideo: String,
    movieDownload: String,
    movieTime: [],
    movieNumSuppose: Number,
    movieNumDownload: Number,
    movieMainPage: Boolean,
    movieDirectors: [],
    movieActors: [],
    genres: [],
    movie_id: String,
    movieOriginalTitle: String,
    rate: String
})
//使用statics为对象添加方法
// movie.statics.finds = function (conditions,callBack) {
//     this.find(conditions,callBack);
// };
movie.statics.findById = function (id, callBack) {
    this.findOne({
        _id: id
    }, callBack);
};
movie.statics.findAll = function (callBack) {
    this.find({}, callBack);
};
var movieModel = mongoose.model('movie', movie);
module.exports = movieModel;