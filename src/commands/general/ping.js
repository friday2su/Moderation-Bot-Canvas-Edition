const { SlashCommandBuilder } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction) {
        await interaction.reply(`${emojis.utils.dot} Pong! Latency: \`${Date.now() - interaction.createdTimestamp}ms\``);
    },

    async prefixRun(message, args) {
        await message.reply(`${emojis.utils.dot} Pong! Latency: \`${Date.now() - message.createdTimestamp}ms\``);
    }
};
