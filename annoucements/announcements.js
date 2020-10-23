const schedule = require('node-schedule');
const fetch = require("node-fetch");

/** Daily Coding Question Announcement */
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

/** Weekly Meeting Scheduling Announcement */
var weeklyMeetingSchedule = require('node-schedule');
weeklyMeetingSchedule.dayOfWeek = 4;
weeklyMeetingSchedule.hour = 12;
weeklyMeetingSchedule.minute = 0;
const clubDayStr = [" We look forward to seeing all of you!", " Hopefully you can make it!",
  " Who's ready to solve some problems? :sunglasses:"
];

var methods = {
    dcq: function() {
      var d = new Date();
      var month = monthNames[d.getMonth()];
      var day = d.getDate();
      var year = d.getFullYear();
    
      (async () => {
        const chan1 = client.channels.cache.get(testChannel);
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
        
        chan1.send({embed: {
          color: 3447003,
          title: 'Coding Problem for ' + month + ' ' +  day + ', ' + year,
          description: 'Problem: '+problemTitle+'\n'+dailyEncouragement[rand],
          url: finalURL+''
        }});
        console.log(d.getSeconds());
      })();
    },
    wms: function() {
        var rand = Math.floor(Math.random() * clubDayStr.length);
        (async () => {
            const chan2 = client.channels.cache.get(testChannel);
            chan2.send('@everyone');
            chan2.send({embed: {
                color: 3447003,
                title: 'Reminder that we have club today at 3pm!' + clubDayStr[rand]
            }});
        })();
    }
  }

module.exports = { methods };