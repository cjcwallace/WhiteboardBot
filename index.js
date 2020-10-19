const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

console.log(client);

/* Useful consts */
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const fetch = require("node-fetch");
const cheerio = require("cheerio");
//Server IDs
const testChannel = 767576275148603432;
const generalChannel = 687080403898859523;
const dailyCodingChannel = 692974289464590417;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

/** Daily Coding Challenge Announcement */

var dailyCodingSchedule = require('node-schedule');
dailyCodingSchedule.dayOfWeek = new schedule.Range(1, 5);
dailyCodingSchedule.hour = 12;
dailyCodingSchedule.minute = 0;

var dailyCodingQuestion = schedule.scheduleJob(dailyCodingSchedule, function() {
  //start daily coding shit
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
    
    chan.send({embed: {
      color: 3447003,
      title: 'Coding Problem for ' + month + ' ' +  day + ', ' + year,
      description: problemTitle+'',
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
  //start daily coding shit
  const chan = client.channels.cache.get('687080403898859523');
  
  chan.send({embed: {
    color: 3447003,
    title: 'Coding Problem for ' + month + ' ' +  day + ', ' + year,
    description: problemTitle+'',
    url: finalURL+''
  }});
});

client.login(config.token);
//https://leetcode.com/problems/random-one-question/all