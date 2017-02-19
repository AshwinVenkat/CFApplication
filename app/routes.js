module.exports = function(app) {

	// server routes ===========================================================

	var Subscriber = require('./models/Subscriber.js');
	var GroupDetails = require('./models/GroupDetails.js');
	var SubscriberTicketMapping = require('./models/SubscriberTicketMapping.js');

	/* -------------------------------------------------------------------------
						API's to manage subscribers
	   ------------------------------------------------------------------------- */
	app.get('/api/subscriber', function(req, res) {
		Subscriber.find(function(err, subscribers) {
		    if (err){
		        res.send(err);
			}
		    res.json(subscribers);
		});
	});

	app.post('/api/subscriber', function(req, res, next) {
		Subscriber.create(req.body, function(err, post) {
		    if (err){
				next(err);
			}
		    res.json(post);
		});
	});

	app.put('/api/subscriber/:id', function(req, res, next) {
		Subscriber.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
		    if (err){
				next(err);
			}
		    res.json(post);
		});
	});	

	/* -------------------------------------------------------------------------
						API's to manage group details
	   ------------------------------------------------------------------------- */
	app.get('/api/groupdetails', function(req, res) {
		GroupDetails.find(function(err, groupdetails) {
		    if (err){
		        res.send(err);
			}
		    res.json(groupdetails);
		});
	});

	app.post('/api/groupdetails', function(req, res, next) {
		GroupDetails.create(req.body, function(err, post) {
			if (err){
				next(err);
			}
			res.json(post);
		});
	});

	app.put('/api/groupdetails/:id', function(req, res, next) {
		GroupDetails.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
		    if (err){
				next(err);
			}
		    res.json(post);
		});
	});

	app.get('/api/stm/:groupid', function(req, res) {
		var groupID = req.params.groupid;
		SubscriberTicketMapping.findOne({'group_id' : groupID }, function(err, groupdetails) {
		    if (err){
		        res.send(err);
			}
		    res.json(groupdetails);
		});
	});

	app.post('/api/stm/:id/:count', function(req, res, next) {
		var count = req.params.count;
		var id = req.params.id;

		var mapping_data = [];
		for(var index = 1; index <= count; index++){
			var item = {};
			item.ticket_no = index;
			item.subscriber = "";
			item.introduced_by = "";
			item.collector = "";
			item.nominee = "";
			item.nominee_age = 0;
			item.relationship = "";
			item.intimation = "";

			mapping_data.push(item);
		}

		var data = {group_id: id, data: mapping_data};

		SubscriberTicketMapping.create(data, function(err, post) {
			if (err){
				next(err);
			}
			res.json(post);
		});

		GroupDetails.find(function(err, groupdetails) {
			if (err){
				res.send(err);
			}
			res.json(groupdetails);
		});
	});

	app.put('/api/stm/:id', function(req, res, next) {
		SubscriberTicketMapping.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
		    if (err){
				next(err);
			}
		    res.json(post);
		});
	});


	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.get('/cf/*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};