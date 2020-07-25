const fs = require('fs');
const counters = require('./counter.json');

const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

reps=['AXA', 'XAX', 'LOL'];

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot){
		
		var input = message.content.trim().toUpperCase();
		input = input.replace(/\s/g, '');

		for (const rp in reps) {
			if(input.includes(reps[rp]))
			{				
				if (!counters[message.author.id]){
					message.channel.send('Is this the first time you "really" laughed' + message.author.username + '?');
					counters[message.author.id] = { laughCount: 1 };
				}
				else{
					counters[message.author.id].laughCount++;
					message.channel.send('Did you really laugh '+message.author.username+'?');
				}
				try {
					fs.writeFileSync('./counter.json', JSON.stringify(counters)); // Again, path may vary.
					
				} 
				catch(err)
				{
					console.error(err);
				}
				return;
			}		
		}		
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	
	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
