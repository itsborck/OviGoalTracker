const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { token } = require('../config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()
client.commandArray = []

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter(file => file.endsWith('.js'))
  for (const file of functionFiles) {
    const func = require(`./functions/${folder}/${file}`)
    if (typeof func === 'function') {
      func(client)
    }
  }
}

client.handleEvents()
client.handleCommands()
client.login(token)