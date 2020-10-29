/** WhiteboardBot v0.1
 *  10/15/2020
 *  @author Cameron Wallace
 */
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
global.client = client;
client.commands = new Discord.Collection();

const fetch = require("node-fetch");
const cheerio = require("cheerio");

/** Command Setup */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

/** Annoucement Setup */
const announceFiles = fs.readdirSync('./annoucements').filter(file => file.endsWith('.js'));

for (const file of announceFiles) {
  const annoucement = require(`./annoucements/${file}`);
}

const schedule = require('node-schedule');
global.schedule = schedule;

/** Database Setup */
const SQLite = require("better-sqlite3");
const sql = new SQLite('database/db.sqlite')

/** Server IDs */
const testChannel = '767576275148603432';
const generalChannel = '687080403898859523';
const dailyCodingChannel = '692974289464590417';
global.testChannel = testChannel;
global.generalChannel = generalChannel;
global.dailyCodingChannel = dailyCodingChannel;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

/** Begin Scheduling */
const announcements = require('./annoucements/announcements');

/** Daily Coding Challenge Announcement */
var dailyCodingSchedule = new schedule.RecurrenceRule();
dailyCodingSchedule.dayOfWeek = new schedule.Range(1, 5);
dailyCodingSchedule.hour = 11;
dailyCodingSchedule.minute = 0;

var dcq = schedule.scheduleJob(dailyCodingSchedule, function() {
  announcements.methods.dcq();
});

/** Weekly Meeting Scheduling Announcement */
var wca = schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 4}, function() {
  announcements.methods.wms();
});

require('./commands/done.js');
require('./commands/completed.js');
require('./commands/reset.js');
//require('./annoucements/announcements.js');

client.login(token);