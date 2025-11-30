const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'warn',
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user via DM.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to warn')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the warning')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle(`${emojis.moderation.warn} Warning Received`)
            .setDescription(`You have been warned in **${interaction.guild.name}**.`)
            .addFields({ name: 'Reason', value: reason })
            .setTimestamp();

        try {
            await targetUser.send({ embeds: [embed] });
            await interaction.reply(`${emojis.success} **${targetUser.tag}** has been warned.`);
        } catch (error) {
            await interaction.reply(`${emojis.success} **${targetUser.tag}** has been warned (DM failed).`);
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

        const reason = args.slice(1).join(' ');
        if (!reason) {
            return message.reply(`${emojis.warning} Please provide a reason.`);
        }

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle(`${emojis.moderation.warn} Warning Received`)
            .setDescription(`You have been warned in **${message.guild.name}**.`)
            .addFields({ name: 'Reason', value: reason })
            .setTimestamp();

        try {
            await targetUser.send({ embeds: [embed] });
            await message.reply(`${emojis.success} **${targetUser.tag}** has been warned.`);
        } catch (error) {
            await message.reply(`${emojis.success} **${targetUser.tag}** has been warned (DM failed).`);
        }
    }
};
