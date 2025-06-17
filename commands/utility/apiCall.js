const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("api-call")
        .setDescription("Call an api")
        .addStringOption((option) =>
            option
                .setName("pokemonname")
                .setDescription("The name of the Pokémon to fetch data for")
                .setRequired(true)
        ),

    async execute(interaction) {
        const pokemonName = interaction.options.getString("pokemonname");
        try {
            var data = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            );
            data = await data.json();
            await interaction.reply(`Nom du pokémon : ${data.forms[0].name}`);
        } catch (error) {
            console.error(error);
            await interaction.reply(
                "Une erreur s'est produite lors de l'appel à l'API. Ou le Pokémon n'existe pas."
            );
        }
    },
};
