'use strict';

var moment = require('moment');
module.exports = function (app) {
	app.route('/')
	   .get(function(req, res) {
	   	  res.sendFile(process.cwd() + '/public/index.html');
	   });
	app.route('/:time')
	   .get(function(req, res) {
	     var out = {unix: "", natural: ""};
         var d = new Date(Date.parse(req.params.time));
         console.log(moment(new Date(req.params.time)).isValid());
         if (moment(new Date(req.params.time)).isValid()) {
           out.natural = moment(Date.parse(req.params.time)).format('MMM DD, YYYY');
           out.unix = Date.parse(req.params.time) / 1000;
         }else if (Number.isInteger(+req.params.time)){
           out.natural = moment(req.params.time * 1000).format('MMM DD, YYYY');
           out.unix = req.params.time;
         }else{
           out.unix = 'null';
           out.natural = 'null';
         }
         res.end(JSON.stringify(out));
	   });
};