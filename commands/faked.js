module.exports = {
	name: 'faked',
	description: 'fake!',
	execute(message, args) {
		const fs = require('fs');
		const counters = require('../counter.json');

		if (!message.mentions.users.size) {
			if(counters[message.author.id]){
				fakes = counters[message.author.id].laughCount;
				message.channel.send(message.author.username + ' has faked ' + fakes + ' times already.');
			}
			else{
				message.channel.send('Do you ever laugh, ' + message.author.username + '? Just fake it.');		
			}
			
		} else {
			const taggedUser = message.mentions.users.first();
			if(counters[taggedUser.id]){
				fakes = counters[taggedUser.id].laughCount;
				message.channel.send(taggedUser.username + ' has faked ' + fakes + ' times already.');
			}
			else{
				message.channel.send(taggedUser.username + ' never fakes laughs. Cool!');
			}
			
		}

		
	},
};
