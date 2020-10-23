const schedule = require('node-schedule');

/** Weekly Meeting Scheduling Announcement */
var weeklyMeetingSchedule = require('node-schedule');
weeklyMeetingSchedule.dayOfWeek = 4;
weeklyMeetingSchedule.hour = 12;
weeklyMeetingSchedule.minute = 0;
const clubDayStr = [" We look forward to seeing all of you!", " Hopefully you can make it!",
  " Who's ready to solve some problems? :sunglasses:"
];

var weeklyMeeting = schedule.scheduleJob(weeklyMeetingSchedule, function() {
  const chan = client.channels.cache.get(testChannel);
  var rand = Math.floor(Math.random() * clubDayStr.length);
  chan.send('@everyone')
  chan.send({embed: {
    color: 3447003,
    title: 'Reminder that we have club today at 3pm!' + clubDayStr[rand]
  }});
});

module.exports = weeklyMeetingSchedule;