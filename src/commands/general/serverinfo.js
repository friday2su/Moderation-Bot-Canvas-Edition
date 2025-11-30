const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createServerCard } = require('../../utils/canvasHelper');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'serverinfo',
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server.'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const buffer = await createServerCard(interaction.guild);
            const attachment = new AttachmentBuilder(buffer, { name: 'server-card.png' });

            await interaction.editReply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `${emojis.error} Failed to generate server card.` });
        }
    },

    async prefixRun(message, args) {
        try {
            const buffer = await createServerCard(message.guild);
            const attachment = new AttachmentBuilder(buffer, { name: 'server-card.png' });

            await message.reply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to generate server card.`);
        }
    }
};
