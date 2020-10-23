const testChannel = '767576275148603432';
const generalChannel = '687080403898859523';
const dailyCodingChannel = '692974289464590417';

module.exports = {
    name: 'reset',
    description: 'Used to reset the number of problems a user has solved',
    execute(message, args) {
        if (message.channel != testChannel) {
            console.log('wrong channel');
            return;
        }
        let member = message.author.id;
        let score;
        if (message.guild) {
            score = client.getScore.get(message.author.id, message.guild.id);
            score.points = 0;
            client.setScore.run(score);
        }
        talked.delete(message.author.id);
    }
}