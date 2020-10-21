const strs = ["Great work!", "Nice!", "Good stuff :sunglasses:", 
    "Beast!", "Excellent job!"];

const testChannel = '767576275148603432';
const generalChannel = '687080403898859523';
const dailyCodingChannel = '692974289464590417';

module.exports = {
    name: 'done',
    description: 'Used to track the number of problems a user has solved',
    execute(message, args) {
        if (message.channel != testChannel) {
            console.log('wrong channel');
            return;
        }
        var rand = Math.floor(Math.random() * strs.length);
        var msg = strs[rand] + ` ${message.author.username} has completed count problems`;
        message.channel.send(msg);
    }
}