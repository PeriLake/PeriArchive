const express = require('express');
const fetch = require("node-fetch")
const app = express();
const city = express.Router();
var path = process.mainModule.path;


city.get('/redirect', (req, res) => {
    if(!req.query.code) return res.redirect("/?errorcode=12");
    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: settings.client_id,
            client_secret: settings.client_secret,
            grant_type: "authorization_code",
            redirect_uri: "http://127.0.0.1/discord/redirect",
            scopes: "email guilds identify",
            code: req.query.code
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(e => e.json()).then(e => {
        if("error" in e) return res.redirect("/?errorcode=1&error="+encodeURI(e.error_description))
        let options = {
            maxAge: 2147483647
        }
        res.cookie('OwnerCity', cipher.close(`{"accesstoken":"${e.access_token}","refreshtoken":"${e.refresh_token}","time":${new Date().getTime()+604800}}`), options)
        return res.redirect("/")

    }).catch(e => {ErrorLog("DiscordRedirect Error", e);return res.redirect("/?errorcode=1000&error="+encodeURI(e))})
});

city.get('/login', (req, res) => {
    return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${settings.client_id}&redirect_uri=http%3A%2F%2F127.0.0.1%2Fdiscord%2Fredirect&response_type=code&scope=email%20guilds%20identify`);
});

function base64(str) {
    var buffer = Buffer.from(str.toString(), 'binary');
    return buffer.toString('base64');
}
module.exports = city;