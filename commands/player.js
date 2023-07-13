const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// funcions
const createdEmbed = (player) => {
  // console.log(name);
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${player}`)
    .setURL(`https://en.wikipedia.org/wiki/${player.name.common}`)
    .setDescription('Informaccion')
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
        { name: 'primer nombre', value: `${player.first_name}  `, inline: true },
        { name: 'segundo nombre', value: `${player.last_name}  `, inline: true },
        { name: 'id', value: `${player.id}`, inline: true },
      { name: 'posicion', value: `${player.position}`, inline: true },
      { name: 'equipo', value: `${player.team}`, inline: true },
    )
    //.setImage(`${player.flags.png}`);
  return exampleEmbed;
};

// commans
module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-jugador')
    .setDescription('Muestra la informacion de un jugador.')
    .addStringOption(Option =>
      Option
        .setName('jugadores')
        .setDescription('Nombre de los jugadores')
        .setRequired(true),
    ),
  async execute(interaction) {

    try {
      await interaction.deferReply();
      const players = interaction.options.getString('jugadores');

      const { data: playersData } = await axios.get(`https://www.balldontlie.io/api/v1/${players}`);

      const embed = createdEmbed(playersData[0], {
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.editReply('Hubo un error!');
    }

  },
};