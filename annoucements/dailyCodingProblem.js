const schedule = require('node-schedule');
const fetch = require("node-fetch");

var dailyCodingSchedule = new schedule.RecurrenceRule();
dailyCodingSchedule.dayOfWeek = new schedule.Range(1, 5);
dailyCodingSchedule.hour = 11;
dailyCodingSchedule.minute = 0;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dailyEncouragement = ["Good luck!", "This might be a tough one.", "Let us know your solution!",
  "Think you can solve it?"
];

//'10 * * * * *', function() {
//dailyCodingSchedule, function() {
var dailyCodingQuestion = schedule.scheduleJob('10 * * * * *', function() {
  const chan = client.channels.cache.get(testChannel);
  var d = new Date();
  var month = monthNames[d.getMonth()];
  var day = d.getDate();
  var year = d.getFullYear();

  (async () => {
    const response = await fetch('https://leetcode.com/problems/random-one-question/all');
    var finalURL = response.url;
    var problemTitle = finalURL.toString();
    problemTitle = problemTitle.substring(30);
    problemTitle = problemTitle.split('-').join(' ');
    problemTitle = problemTitle.replace('/', '');
    problemTitle = problemTitle[0].toUpperCase() + problemTitle.substr(1);
    console.log(finalURL);
    console.log(problemTitle);
    var rand = Math.floor(Math.random() * dailyEncouragement.length);
    
    chan.send({embed: {
      color: 3447003,
      title: 'Coding Problem for ' + month + ' ' +  day + ', ' + year,
      description: 'Problem: '+problemTitle+'\n'+dailyEncouragement[rand],
      url: finalURL+''
    }});
  })();
});