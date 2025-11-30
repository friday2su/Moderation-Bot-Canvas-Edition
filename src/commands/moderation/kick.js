const { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const { createModCard } = require('../../utils/canvasHelper');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'kick',
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        await interaction.deferReply();

        const targetUser = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.editReply({ content: `${emojis.error} User not found in this server.` });
        }

        if (!member.kickable) {
            return interaction.editReply({ content: `${emojis.error} I cannot kick this user. They might have higher permissions than me.` });
        }

        // Generate Canvas
        try {
            const buffer = await createModCard('KICK', targetUser, interaction.user, reason);
            const attachment = new AttachmentBuilder(buffer, { name: 'kick-card.png' });

            await member.kick(reason);
            await interaction.editReply({
                content: `${emojis.success} **${targetUser.tag}** has been kicked.`,
                files: [attachment]
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `${emojis.error} Failed to kick user or generate image.` });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            return message.reply(`${emojis.warning} Please mention a user to kick.`);
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';
        const member = message.guild.members.cache.get(targetUser.id);

        if (!member) {
            return message.reply(`${emojis.error} User not found in this server.`);
        }

        if (!member.kickable) {
            return message.reply(`${emojis.error} I cannot kick this user.`);
        }

        // Generate Canvas
        try {
            const buffer = await createModCard('KICK', targetUser, message.author, reason);
            const attachment = new AttachmentBuilder(buffer, { name: 'kick-card.png' });

            await member.kick(reason);
            await message.reply({
                content: `${emojis.success} **${targetUser.tag}** has been kicked.`,
                files: [attachment]
            });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to kick user.`);
        }
    }
};
