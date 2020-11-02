const talked = new Map();
global.talked = talked;
const strs = ["Great work!", "Nice!", "Good stuff :sunglasses:", 
    "Beast!", "Excellent job!"];

const testChannel = '767576275148603432';
const generalChannel = '687080403898859523';
const dailyCodingChannel = '692974289464590417';

module.exports = {
    name: 'done',
    description: 'Used to increment the number of problems a user has solved',
    execute(message, args) {
        if (message.channel != dailyCodingChannel) {
            console.log('wrong channel');
            return;
        }
        var d = new Date();
        var day = d.getDate();
        if (talked.has(message.author.id)) {
            if (day != talked.get(message.author.id)) {
                talked.delete(message.author.id);
            }
            else {
                message.channel.send("You have already answered todays question, come back tomorrow!");
            }
        } else {
            //let guild = client.guilds.get('687080403898859520');
            let member = message.author.id;
            //let memberName = guild.member(message.author);
            //let nickname = memberName ? memberName.displayName : null; 
            let score;
            if (message.guild) {
                score = client.getScore.get(message.author.id, message.guild.id);
                if (!score) {
                    score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
                }
                score.points++;
                client.setScore.run(score);
            }
            var rand = Math.floor(Math.random() * strs.length);
            var msg;
            if (score.points == 1) {
                msg = strs[rand] + ` ${message.member.displayName} has completed ${score.points} problem.`;
            } else {
                msg = strs[rand] + ` ${message.member.displayName} has completed ${score.points} problems.`;
            }
            message.channel.send(msg);
            console.log(`!done ${message.author.id} points: ${score.points}`);
            talked.set(message.author.id, day);
        }
    }
}
require('./reset.js');