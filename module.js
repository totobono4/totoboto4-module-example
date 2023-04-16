const { Client, EmbedBuilder, MessageFlags, SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');

class Module {
  constructor() {
    this.name = 'Example-module';
    this.version = '1.0.0';

    this.commands = [
      new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!')
    ]
  }

  /**
   * 
   * @param {Client} client 
   */
  launch(client) {
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

  ping(interaction) {
    const user = interaction.user;
    const url = 'https://tenor.com/view/pong-video-game-atari-tennis-70s-gif-16894549';
    const gif = 'https://c.tenor.com/2gyJVMt_L6wAAAAC/pong-video-game.gif';
    interaction.reply({
      embeds: [
        this.MessageEmbedBuilder(user, gif, 'ping', url, 'pong !', gif, 'totoboto4 ping services')
      ]
    });
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

module.exports = new Module()
