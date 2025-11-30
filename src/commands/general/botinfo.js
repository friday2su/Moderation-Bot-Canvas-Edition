const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createBotCard } = require('../../utils/canvasHelper');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'botinfo',
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays information about the bot.'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const buffer = await createBotCard(interaction.client);
            const attachment = new AttachmentBuilder(buffer, { name: 'bot-card.png' });

            await interaction.editReply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `${emojis.error} Failed to generate bot info card.` });
        }
    },

    async prefixRun(message, args) {
        try {
            const buffer = await createBotCard(message.client);
            const attachment = new AttachmentBuilder(buffer, { name: 'bot-card.png' });

            await message.reply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to generate bot info card.`);
        }
    }
};
