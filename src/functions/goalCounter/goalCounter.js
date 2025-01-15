const axios = require('axios')
const { trackerChannel } = require('../../../config.json')

let previousGoals = null

async function getGoals(client) {
  const response = await axios.get(
    'https://api.sticktap.app/?url=https://api-web.nhle.com/v1/player/8471214/landing',
  )
  const data = response?.data?.featuredStats?.regularSeason?.career?.goals

  if (data !== previousGoals) {
    const channel = client.channels.cache.get(trackerChannel)
    await sendGoal(data, channel)
    previousGoals = data
  }

  setTimeout(() => getGoals(client), 15000)
}

async function sendGoal(data, channel) {
  await channel.send(`Ovi scored! :D Goal number ${data} <:nahbronoway:1079177981232164864>`)
}

module.exports = client => {
  client.on('ready', () => {
    getGoals(client)
  })
}