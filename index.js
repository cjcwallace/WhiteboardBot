const Discord = require('discord.js');
const config = require('./config.json');


/* Useful consts */
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const clubDayStr = [" We look forward to seeing all of you!", " Hopefully you can make it!",
  " Who's ready to solve some problems? :sunglasses:"
];
const dailyEncouragement = ["Good luck!", "This might be a tough one.", "Let us know your solution!",
"Think you can solve it?"
];

const fetch = require("node-fetch");
const cheerio = require("cheerio");
/** Server IDs */
const testChannel = '767576275148603432';
const generalChannel = '687080403898859523';
const dailyCodingChannel = '692974289464590417';


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

/** Begin Scheduling */
var schedule = require('node-schedule');

/** Daily Coding Challenge Announcement */
var dailyCodingSchedule = new schedule.RecurrenceRule();
dailyCodingSchedule.dayOfWeek = new schedule.Range(1, 5);
dailyCodingSchedule.hour = 12;
dailyCodingSchedule.minute = 0;

//'10 * * * * *', function() {
var dailyCodingQuestion = schedule.scheduleJob(dailyCodingSchedule, function() {
  const chan = client.channels.cache.get('692974289464590417');
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

/** Weekly Meeting Scheduling Announcement */
var weeklyMeetingSchedule = require('node-schedule');
weeklyMeetingSchedule.dayOfWeek = 4;
weeklyMeetingSchedule.hour = 12;
weeklyMeetingSchedule.minute = 0;

var weeklyMeeting = schedule.scheduleJob(dailyCodingSchedule, function() {
  const chan = client.channels.cache.get('687080403898859523');
  var rand = Math.floor(Math.random() * clubDayStr.length);
  chan.send('@everyone')
  chan.send({embed: {
    color: 3447003,
    title: 'Reminder that we have club today at 3pm!' + clubDayStr[rand]
  }});
});

client.login(config.token);
//https://leetcode.com/problems/random-one-question/all