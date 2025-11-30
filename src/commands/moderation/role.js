const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const emojis = require('../../config/emojis');

module.exports = {
    name: 'role',
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Manage roles for a user.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a role to a user')
                .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('The role').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role from a user')
                .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('The role').setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const targetUser = interaction.options.getUser('target');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.reply({ content: `${emojis.error} User not found.`, ephemeral: true });
        }

        if (interaction.member.roles.highest.position <= role.position) {
            return interaction.reply({ content: `${emojis.error} You cannot manage this role as it is higher or equal to your highest role.`, ephemeral: true });
        }

        if (interaction.guild.members.me.roles.highest.position <= role.position) {
            return interaction.reply({ content: `${emojis.error} I cannot manage this role as it is higher or equal to my highest role.`, ephemeral: true });
        }

        try {
            if (subcommand === 'add') {
                await member.roles.add(role);
                await interaction.reply(`${emojis.success} Added **${role.name}** to **${targetUser.tag}**.`);
            } else if (subcommand === 'remove') {
                await member.roles.remove(role);
                await interaction.reply(`${emojis.success} Removed **${role.name}** from **${targetUser.tag}**.`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `${emojis.error} Failed to manage roles.`, ephemeral: true });
        }
    },

    async prefixRun(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return message.reply(`${emojis.error} You do not have permission to use this command.`);
        }

        const action = args[0]?.toLowerCase();
        if (!['add', 'remove'].includes(action)) {
            return message.reply(`${emojis.warning} Usage: \`!role <add/remove> <@user> <@role/ID>\``);
        }

        const targetUser = message.mentions.users.first();
        if (!targetUser) {
            return message.reply(`${emojis.warning} Please mention a user.`);
        }

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[3]);
        if (!role) {
            return message.reply(`${emojis.warning} Please mention a valid role.`);
        }

        const member = message.guild.members.cache.get(targetUser.id);
        if (!member) {
            return message.reply(`${emojis.error} User not found.`);
        }

        if (message.member.roles.highest.position <= role.position) {
            return message.reply(`${emojis.error} You cannot manage this role.`);
        }

        if (message.guild.members.me.roles.highest.position <= role.position) {
            return message.reply(`${emojis.error} I cannot manage this role.`);
        }

        try {
            if (action === 'add') {
                await member.roles.add(role);
                await message.reply(`${emojis.success} Added **${role.name}** to **${targetUser.tag}**.`);
            } else if (action === 'remove') {
                await member.roles.remove(role);
                await message.reply(`${emojis.success} Removed **${role.name}** from **${targetUser.tag}**.`);
            }
        } catch (error) {
            console.error(error);
            await message.reply(`${emojis.error} Failed to manage roles.`);
        }
    }
};
