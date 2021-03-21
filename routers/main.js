const express = require('express');
const fetch = require("node-fetch")
const app = express();
const city = express.Router();
var path = process.mainModule.path;

city.get("/", (req, res) => {
    if (req.cookies["OwnerCity"]) {
        var json = JSON.parse(cipher.open(req.cookies["OwnerCity"]))
        var date = new Date();
        if (json.time < date.getTime()) {
            Log("System",`Süresi geçmiş bir token yenileniyor...`)
            fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: settings.client_id,
                    client_secret: settings.client_secret,
                    grant_type: "refresh_token",
                    redirect_uri: "http://127.0.0.1/discord/redirect",
                    scopes: "email guilds identify",
                    refresh_token: json.refreshtoken
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(e => e.json()).then(e => {var sc= "error" in e;
                if (sc) {res.clearCookie('OwnerCity', {})}
                if (sc) return res.redirect("/?errorcode=1112&error=" + encodeURI(e.error_description))
                let options = {
                    maxAge: 2147483647
                }
                res.cookie('OwnerCity', cipher.close(`{"accesstoken":"${e.access_token}","refreshtoken":"${e.refresh_token}","time":${new Date().getTime()+604800}}`), options)
                return res.redirect("/")
            }).catch(e => {
                ErrorLog("DiscordRedirect Error", e);
                return res.redirect("/?errorcode=1001&error=" + encodeURI(e))
            })}
            // girişyapılı ama token doğrulanmadı
            helper.getUser(json.accesstoken).then(e=>{
  if("error" in e){
    Log("System",`Hatalı bir cookie silindi`)
    res.clearCookie('OwnerCity', {})
    return res.render(path + '/pages/main/index.ejs', {logged:false})
      }
  var c= client.guilds.cache.get(settings.guildid).members.cache.get(e.id)
  if(!c) return res.redirect("/?errorcode=212")
var aclient = {
    perms:c._roles,
    user:c.user
}
Log("System",`${c.user.username} ana sayfaya giriş yaptı`)
return res.render(path + '/pages/main/index.ejs', {client:aclient,logged:true})
    
})} else {return res.render(path + '/pages/main/index.ejs', {logged:false})}
    // giriş yapılmamış

})
module.exports=city;
