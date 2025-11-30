const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'unban',
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The ID of the user to unban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the unban'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            await interaction.guild.members.unban(userId, reason);
            await interaction.reply({ content: `${emojis.success} Successfully unbanned user with ID **${userId}**.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to unban user. Please check the ID and try again.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const userId = args[0];
        if (!userId) {
            return message.reply(`${emojis.warning} Please provide the ID of the user to unban.`);
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await message.guild.members.unban(userId, reason);
            await message.reply({ content: `${emojis.success} Successfully unbanned user with ID **${userId}**.` });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to unban user. Please check the ID and try again.`);
        }
    }
};
