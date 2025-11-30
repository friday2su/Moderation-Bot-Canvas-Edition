const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'avatar',
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays a user\'s avatar.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get avatar for')),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user;
        const avatarURL = targetUser.displayAvatarURL({ size: 1024, extension: 'png' });

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle(`${targetUser.username}'s Avatar`)
            .setImage(avatarURL)
            .setFooter({ text: `Requested by ${interaction.user.tag}` });

        await interaction.reply({ embeds: [embed] });
    },

    async prefixRun(message, args) {
        const targetUser = message.mentions.users.first() || message.author;
        const avatarURL = targetUser.displayAvatarURL({ size: 1024, extension: 'png' });

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle(`${targetUser.username}'s Avatar`)
            .setImage(avatarURL)
            .setFooter({ text: `Requested by ${message.author.tag}` });

        await message.reply({ embeds: [embed] });
    }
};
