const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deepdives-news")
        .setDescription("Get the DeepDives DRG News"),
    async execute(interaction) {
        var data = await fetch("https://drgapi.com/v1/deepdives")
        data = await data.json()
        await interaction.reply(`${data}`)
    }
}