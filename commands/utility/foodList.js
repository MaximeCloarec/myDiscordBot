const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("food-list")
        .setDescription("Get the current food list"),
    async execute(interaction) {
        try {
            const response = await fetch(
                "http://192.168.1.25:3050/foodList/api/foods"
            );
            data = await response.json();
            if (!data || data.length === 0) {
                await interaction.reply("No food items found.");
                return;
            }
            const foodList = data
                .map(
                    (food) =>
                        `${food.foodName} (x${food.foodQuantity}) (id: ${food.id})`
                )
                .join("\n");
            console.log("Fetched food list:", data);

            await interaction.reply(`Current food list: \n${foodList}`);
        } catch (error) {
            console.error("Error fetching food list:", error);
            await interaction.reply("Failed to fetch the food list.");
            return;
        }
    },
};
