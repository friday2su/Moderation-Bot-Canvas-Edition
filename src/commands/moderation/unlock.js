const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'unlock',
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlocks the current channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        if (interaction.channel.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages)) {
            return interaction.reply({ content: `${emojis.warning} This channel is already unlocked.`, ephemeral: true });
        }

        try {
            await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: true
            });

            await interaction.reply({ content: `${emojis.success} **Channel Unlocked**\nEveryone can send messages now.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to unlock channel.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        if (message.channel.permissionsFor(message.guild.id).has(PermissionFlagsBits.SendMessages)) {
            return message.reply(`${emojis.warning} This channel is already unlocked.`);
        }

        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: true
            });

            await message.reply({ content: `${emojis.success} **Channel Unlocked**\nEveryone can send messages now.` });
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to unlock channel.`);
        }
    }
};
