const Discord = require('discord.js')
const client = new Discord.Client();
const cnf = require('./config.js')
const fs = require('fs')
require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(cnf.token)
let kayıtsız = cnf.kayıtsız;

client.on("guildMemberAdd", member => {
  member.roles.add(kayıtsız);
  member.setNickname(cnf.isim)
});


client.once("ready", async () => {
  console.log('Bağlandım')
  let kanal = client.channels.cache.find(r => r.id === cnf.botlog);
  kanal.send(`\`${client.user.tag}\` ismiyle bağlandım!`)
})


client.on('message', async message => {
  if (message.content === 'r!fakekatıl') {
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }
})


const moment = require("moment")
client.on('guildMemberAdd', async (member) => {
  const hosgeldin = new Discord.MessageEmbed()
    .setDescription(`

  <:selamm:1037375864268144641> Sunucumuza hoşgeldin ${member}!

 <a:havali_ama_cool:1037376013551816764>  Seninle birlikte **${member.guild.memberCount}** kişi olduk!

  <:besyacute:1037375927094616174> Hesabın **${moment(member.user.createdAt).locale("tr").format("LLL")}** tarihinde oluşturulmuş! 

 <:land_adelaine:1037376621931401317>  Seni kayıt etmeleri için <@&${cnf.regyetkili}> rolünü etiketliyorum

 <a:land_beyazayi:1037376819948699710>  Sunucumuza kayıt olduktan sonra <#1031342367283892264> kanalını okumayı unutma
   
  `)
  .setColor("BLUE")
  .setImage(`https://media.tenor.com/HNcG3X-Og7wAAAAC/welcome-anime.gif`)
  client.channels.cache.get(cnf.hgkanal).send(`${member} - <@&${cnf.regyetkili}>`)
  client.channels.cache.get(cnf.hgkanal).send(hosgeldin)
})