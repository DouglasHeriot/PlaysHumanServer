
var username = process.env.TWITCH_USERNAME;
var password = process.env.TWITCH_PASSWORD;

var irc = require('irc');
var client = new irc.Client('irc.twitch.tv', username, {
	channels: ['#' + username],
	sasl: true,
	nick: username,
	userName: username,
	password: password,
});

client.addListener('message', function (from, to, message) {
	//console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('error', function (message) {
	console.log('Error: ' + message);
});

client.addListener('registered', function (message) {
	console.log('registered: ' + message);
});

client.addListener('names', function (channel, nicks) {
	console.log('names: ' + nicks);
});

client.addListener('pm', function (from, message) {
	console.log(from + ' => ME: ' + message);
});

client.addListener('message#'+username, function (from, message) {
	console.log(from + ' => #'+username+': ' + message);
	client.say('#'+username, "I'm a bot! " + message);
});
