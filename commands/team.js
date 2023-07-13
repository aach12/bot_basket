const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// const { name } = require('../database');

// funcions
const createdEmbed = (team) => {
  // console.log(name);
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${team}`)
    .setURL(`https://en.wikipedia.org/wiki/${team.name.common}`)
    .setDescription('Informaccion')
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'abreviacion', value: `${team.abbreviation}`, inline: true },
      { name: 'ciudad', value: `${team.city}`, inline: true },
      { name: 'division', value: `${team.division}`, inline: true },
      { name: 'nombre', value: `${team.name}  `, inline: true },
    )
    .setImage(`${team.flags.png}`);
  return exampleEmbed;
};

// commans
module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-equipo')
    .setDescription('Muestra la informacion de un equipo.')
    .addStringOption(Option =>
      Option
        .setName('equipo')
        .setDescription('Nombre del equipo')
        .setRequired(true),
    ),
  async execute(interaction) {

    try {
      await interaction.deferReply();
      const teams = interaction.options.getString('equipo');

      const { data: TeamData } = await axios.get(`https://www.balldontlie.io/api/v1/${teams}`);

      const embed = createdEmbed(TeamData[0], {
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.editReply('Hubo un error!');
    }

  },
};