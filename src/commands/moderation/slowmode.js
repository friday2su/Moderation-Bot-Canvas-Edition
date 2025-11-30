const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'slowmode',
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Sets the slowmode for the current channel.')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Time in seconds (0 to disable)')
                .setMinValue(0)
                .setMaxValue(21600)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');

        try {
            await interaction.channel.setRateLimitPerUser(seconds);
            const msg = seconds === 0
                ? `${emojis.success} Slowmode has been disabled.`
                : `${emojis.success} Slowmode set to **${seconds} seconds**.`

            await interaction.reply(msg);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to set slowmode.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds < 0 || seconds > 21600) {
            return message.reply(`${emojis.warning} Please provide a valid time in seconds (0-21600).`);
        }

        try {
            await message.channel.setRateLimitPerUser(seconds);
            const msg = seconds === 0
                ? `${emojis.success} Slowmode has been disabled.`
                : `${emojis.success} Slowmode set to **${seconds} seconds**.`

            await message.reply(msg);
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to set slowmode.`);
        }
    }
};
