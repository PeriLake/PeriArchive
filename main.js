const express = require("express")
const fetch = require("node-fetch")
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json',{
    serialize: (obj) => JSON.stringify(obj),
    deserialize: (data) => JSON.parse(data)
})
var Peri = require("./PeriExtension/index")
var Logger = new Peri.Logger();
var db = require('lowdb')(adapter)
var crypto = require("crypto-js");
const Discord = require("discord.js")
//-----------------------------------------------
global.Peri = Peri;
global.client = new Discord.Client();
global.Logger = Logger;
global.db = db;
global.Log = (e, b) => Logger.examples.Log(e, b);
global.ErrorLog = (e, b) => Logger.examples.ErrorLog(e, b);
global.settings = {
    "client_secret": "",
    "client_id": "",
    "client_token": "",
    "passwordkey": "",
    "guildid":""
}
client.login(settings.client_token)
global.cipher = {
    close: e => crypto.AES.encrypt(e, settings.passwordkey).toString(),
    open: e => crypto.AES.decrypt(e, settings.passwordkey).toString(crypto.enc.Utf8)
}
global.helper = {
    getUser: (e) => {
        return fetch('http://discordapp.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${e}`
            }
        }).then(e => e.json())
    },
    getUserGuilds: (e) => {
        return fetch('http://discordapp.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${e}`
            }
        }).then(e => e.json())
    }
}

//-----------------------------------------------
var date = new Date()
Logger.send(Logger.glue("▬".repeat(33) + "\n", Logger.colors.cyan),
    Logger.glue(`Starting Time: ${Logger.glue(date.timeNow(),Logger.colors.yellow)}\n`, Logger.colors.green),
    Logger.glue(`Starting Date: ${Logger.glue(date.today(),Logger.colors.yellow)}\n`, Logger.colors.green),
    //Logger.glue(`Toplam Kullanıcı: ${Logger.glue(Object.keys(db.get("users").value()).length,Logger.colors.yellow)}\n`,Logger.colors.green),
    Logger.glue("▬".repeat(33), Logger.colors.cyan))
delete date;
//----------------------------------------------
var discord = require("./routers/discord");
app.use("/discord", discord)
var main = require("./routers/main");
app.use("/", main)
var main = require("./routers/category");
app.use("/category", main)

//-----------------------------------------------
app.get('*', (req, res) => res.render(__dirname + '/pages/error.ejs', {
    code: "404",
    message: "Not Found",
    color: "#ff6e6e",
    background: "#000000"
}));
const listener = app.listen(80, () => {
    Log("Application", `Listening server on ${listener.address().port}`)
});
process.on('unhandledRejection', error => ErrorLog("Javascript Error", error)).on('uncaughtException', error => ErrorLog("Javascript Error", error))
//-----------------------------------------------
process.openStdin().addListener("data", function(key) {
    var s = eval(key.toString());
    if (s) console.log(s)
});
