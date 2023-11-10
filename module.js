const { Client, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Module } = require('totoboto4-core')

class ExampleModule extends Module {
  constructor(modulator) {
     super(modulator)

    this.name = 'Example-module';
    this.version = '1.0.0';

    this.commands = [
      new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!')
    ]
  }

  /**
   * @param {} data 
   */
  launch(data) {
    const client = data.client

    client.on("interactionCreate", (interaction) => {
      if (!interaction.isChatInputCommand()) return

      switch (interaction.commandName) {
        case 'ping':
          this.ping(interaction)
          break;
        default:
          break;
      }
    })
  }

  async ping(interaction) {
    const user = interaction.user;
    const url = 'https://tenor.com/view/pong-video-game-atari-tennis-70s-gif-16894549'
    const gif = 'https://c.tenor.com/2gyJVMt_L6wAAAAC/pong-video-game.gif'
    const gif0 = 'https://media.tenor.com/ZBVQpHH9YfkAAAAC/oh-no-joseph-joestar.gif'
    const gif1 = 'https://media.tenor.com/p45pEdZ3j8MAAAAC/skeleton-waiting-for-you.gif'
    
    const pang = new ButtonBuilder()
			.setCustomId('pang')
			.setLabel('Pang ! !')
			.setStyle(ButtonStyle.Danger)
    
    const row = new ActionRowBuilder()
      .addComponents(pang)
    
    const response = await interaction.reply({
      embeds: [
        this.MessageEmbedBuilder(user, user.avatarURL(), 'ping', url, 'pong !', gif, 'totoboto4 ping services')
      ],
      components: [row]
    })

    const filter = i => i.user.id === interaction.user.id;
    try {
      const panged = await response.awaitMessageComponent({ filter, time: 60000 });

      if (panged.customId === 'pang') {
        await interaction.editReply({
          embeds: [
            this.MessageEmbedBuilder(user, user.avatarURL(), 'pong', url, 'got panged ! !', gif0, `${user.username} pang services !!`)
          ],
          components: []
        });
      }
    } catch (e) {
      await interaction.editReply({
        embeds: [
          this.MessageEmbedBuilder(user, user.avatarURL(), 'Dead Bored', url, 'You so boring, I\'m dead of waiting.', gif1, `${user.username} boring services...`)
        ],
        components: []
      });
    }
  }

  MessageEmbedBuilder(author, thumbnail, title, url, description, image, footer) {
    return new EmbedBuilder()
      .setColor('Navy')
      .setAuthor({
        name: author.username
      })
      .setThumbnail(thumbnail)
      .setTitle(title)
      .setURL(url)
      .setDescription(description)
      .setImage(image)
      .setFooter({
        text: footer
      })
      .setTimestamp(new Date());
  }
}

module.exports = ExampleModule
