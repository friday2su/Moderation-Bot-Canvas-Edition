const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'poll',
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a simple poll.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question for the poll')
                .setRequired(true)),

    async execute(interaction) {
        const question = interaction.options.getString('question');

        const embed = new EmbedBuilder()
            .setColor('#33adff')
            .setTitle('📊 Poll')
            .setDescription(question)
            .setFooter({ text: `Asked by ${interaction.user.tag}` })
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        await message.react('👍');
        await message.react('👎');
    },

    async prefixRun(message, args) {
        const question = args.join(' ');
        if (!question) {
            return message.reply(`${emojis.warning} Please provide a question for the poll.`);
        }

        const embed = new EmbedBuilder()
            .setColor('#33adff')
            .setTitle('📊 Poll')
            .setDescription(question)
            .setFooter({ text: `Asked by ${message.author.tag}` })
            .setTimestamp();

        const pollMessage = await message.channel.send({ embeds: [embed] });
        await pollMessage.react('👍');
        await pollMessage.react('👎');
    }
};
