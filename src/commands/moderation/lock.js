const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'lock',
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Locks the current channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        if (!interaction.channel.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages)) {
            return interaction.reply({ content: `${emojis.warning} This channel is already locked.`, ephemeral: true });
        }

        try {
            await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: false
            });

            await interaction.reply({ content: `${emojis.moderation.warn} **Channel Locked**\nNo one can send messages here until unlocked.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to lock channel.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        if (!message.channel.permissionsFor(message.guild.id).has(PermissionFlagsBits.SendMessages)) {
            return message.reply(`${emojis.warning} This channel is already locked.`);
        }

        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: false
            });

            await message.reply({ content: `${emojis.moderation.warn} **Channel Locked**\nNo one can send messages here until unlocked.` });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to lock channel.`);
        }
    }
};
