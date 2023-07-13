const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// funcions
const createdEmbed = (game) => {
  // console.log(name);
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${games}`)
    .setURL(`https://en.wikipedia.org/wiki/${game.name.common}`)
    .setDescription('Informaccion')
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
        { name: 'datos', value: `${game.date}  `, inline: true },
        { name: 'equipo local', value: `${game.home_team_score}  `, inline: true },
        { name: 'equipo visitante', value: `${game.visitor_team_score}  `, inline: true },
        { name: 'id', value: `${game.id}`, inline: true },
      { name: 'temporada', value: `${game.season}`, inline: true },
    )
    //.setImage(`${player.flags.png}`);
  return exampleEmbed;
};

// commans
module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-juego')
    .setDescription('Muestra la informacion de un juego.')
    .addStringOption(Option =>
      Option
        .setName('juegos')
        .setDescription('resultados de cada juego')
        .setRequired(true),
    ),
  async execute(interaction) {

    try {
      await interaction.deferReply();
      const games = interaction.options.getString('juegos');

      const { data: gamesData } = await axios.get(`https://www.balldontlie.io/api/v1/games/<ID>${games}`);

      const embed = createdEmbed(gamesData[0], {
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.editReply('Hubo un error!');
    }

  },
};