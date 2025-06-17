const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("food-list-add")
        .setDescription("Add a food to the list")
        .addStringOption((option) =>
            option
                .setName("foodname")
                .setDescription("The name of the food to add")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("foodquantity")
                .setDescription("The quantity of the food to add")
                .setRequired(true)
        ),
    async execute(interaction) {
        const foodName = interaction.options.getString("foodname");
        const foodquantity = interaction.options.getInteger("foodquantity");
        console.log(
            `Adding ${foodquantity} of ${foodName} to the food list...`
        );

        try {
            var data = await fetch(
                "http://192.168.1.25:3050/foodList/api/addFood",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        foodName: foodName,
                        foodQuantity: foodquantity,
                    }),
                }
            );
            await interaction.reply(
                `Added ${foodquantity} of ${foodName} to the food list!`
            );
        } catch (error) {
            console.error(error);
            await interaction.reply(
                `An error occurred while adding the food to the list. ${error.message}`
            );
        }
    },
};
