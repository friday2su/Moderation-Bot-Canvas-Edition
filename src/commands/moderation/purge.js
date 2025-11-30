const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'purge',
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specified number of messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete (1-100)')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        try {
            const deleted = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ content: `${emojis.success} Successfully deleted **${deleted.size}** messages.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to delete messages. Messages older than 14 days cannot be bulk deleted.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply(`${emojis.warning} Please provide a number between 1 and 100.`);
        }

        try {
            await message.delete(); // Delete command message
            const deleted = await message.channel.bulkDelete(amount, true);
            const reply = await message.channel.send(`${emojis.success} Successfully deleted **${deleted.size}** messages.`);

            // Auto delete reply after 3 seconds
            setTimeout(() => {
                reply.delete().catch(() => { });
            }, 3000);

        } catch (error) {
            console.error(error);
            message.channel.send(`${emojis.error} Failed to delete messages. Messages older than 14 days cannot be bulk deleted.`);
        }
    }
};
