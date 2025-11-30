const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'timeout',
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to timeout')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration in minutes')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for timeout'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.reply({ content: `${emojis.error} User not found.`, ephemeral: true });
        }

        if (!member.moderatable) {
            return interaction.reply({ content: `${emojis.error} I cannot timeout this user.`, ephemeral: true });
        }

        try {
            await member.timeout(duration * 60 * 1000, reason);
            await interaction.reply(`${emojis.moderation.mute} **${targetUser.tag}** has been timed out for **${duration} minutes**.\nReason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to timeout user.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            return message.reply(`${emojis.warning} Please mention a user.`);
        }

        const duration = parseInt(args[1]);
        if (isNaN(duration)) {
            return message.reply(`${emojis.warning} Please provide a valid duration in minutes.`);
        }

        const reason = args.slice(2).join(' ') || 'No reason provided';
        const member = message.guild.members.cache.get(targetUser.id);

        if (!member) {
            return message.reply(`${emojis.error} User not found.`);
        }

        if (!member.moderatable) {
            return message.reply(`${emojis.error} I cannot timeout this user.`);
        }

        try {
            await member.timeout(duration * 60 * 1000, reason);
            await message.reply(`${emojis.moderation.mute} **${targetUser.tag}** has been timed out for **${duration} minutes**.\nReason: ${reason}`);
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to timeout user.`);
        }
    }
};
