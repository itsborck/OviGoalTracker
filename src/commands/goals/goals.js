const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('goals')
    .setDescription('Goals command'),
  async execute(interaction) {
    try {
      const response = await axios.get(
        'https://api.sticktap.app/?url=https://api-web.nhle.com/v1/player/8471214/landing',
      )
      const data = response?.data?.featuredStats?.regularSeason?.career?.goals
      await interaction.reply(`${data}`)
    } catch (error) {
      console.error(error)
      await interaction.reply('There was an error fetching the data.')
    }
  },
}
