const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'nick',
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Changes the nickname of a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to change nickname for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('The new nickname (leave empty to reset)'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const nickname = interaction.options.getString('nickname') || null;
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.reply({ content: `${emojis.error} User not found.`, ephemeral: true });
        }

        if (!member.manageable) {
            return interaction.reply({ content: `${emojis.error} I cannot change this user's nickname.`, ephemeral: true });
        }

        try {
            await member.setNickname(nickname);
            const msg = nickname
                ? `${emojis.success} Changed nickname of **${targetUser.tag}** to **${nickname}**.`
                : `${emojis.success} Reset nickname of **${targetUser.tag}**.`

            await interaction.reply(msg);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to change nickname.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageNicknames)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            return message.reply(`${emojis.warning} Please mention a user.`);
        }

        const nickname = args.slice(1).join(' ') || null;
        const member = message.guild.members.cache.get(targetUser.id);

        if (!member) {
            return message.reply(`${emojis.error} User not found.`);
        }

        if (!member.manageable) {
            return message.reply(`${emojis.error} I cannot change this user's nickname.`);
        }

        try {
            await member.setNickname(nickname);
            const msg = nickname
                ? `${emojis.success} Changed nickname of **${targetUser.tag}** to **${nickname}**.`
                : `${emojis.success} Reset nickname of **${targetUser.tag}**.`

            await message.reply(msg);
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to change nickname.`);
        }
    }
};
