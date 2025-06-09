const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("api-call")
        .setDescription("Call an api"),
    async execute(interaction) {
        var data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        data = await data.json();
        await interaction.reply(`${data} Caca`);
    },
};
