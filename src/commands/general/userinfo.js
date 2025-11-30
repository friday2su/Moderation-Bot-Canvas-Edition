const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createProfileCard } = require('../../utils/canvasHelper');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'userinfo',
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get info for')),

    async execute(interaction) {
        await interaction.deferReply();

        const targetUser = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.editReply({ content: `${emojis.error} User not found in this server.` });
        }

        try {
            const buffer = await createProfileCard(targetUser, member);
            const attachment = new AttachmentBuilder(buffer, { name: 'profile-card.png' });

            await interaction.editReply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `${emojis.error} Failed to generate profile card.` });
        }
    },

    async prefixRun(message, args) {
        const targetUser = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(targetUser.id);

        if (!member) {
            return message.reply(`${emojis.error} User not found in this server.`);
        }

        try {
            const buffer = await createProfileCard(targetUser, member);
            const attachment = new AttachmentBuilder(buffer, { name: 'profile-card.png' });

            await message.reply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to generate profile card.`);
        }
    }
};
