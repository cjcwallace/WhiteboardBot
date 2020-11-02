const testChannel = '767576275148603432';
const generalChannel = '687080403898859523';
const dailyCodingChannel = '692974289464590417';

module.exports = {
    name: 'completed',
    description: 'Used to return the number of problems a user has solved',
    execute(message, args) {
        if (message.channel != dailyCodingChannel) {
            console.log('wrong channel');
            return;
        }
        let member = message.author.id;
        let score;
        if (message.guild) {
            score = client.getScore.get(message.author.id, message.guild.id);
            if (!score) {
                score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
            }
        }
        if (score.points == 1) {
            msg = `${message.member.displayName} has ${score.points} point!`;
        } else {
            msg = `${message.member.displayName} has ${score.points} points!`;
        }
        message.channel.send(msg);
        console.log(`!completed ${message.author.id} points: ${score.points}`);
    }
}