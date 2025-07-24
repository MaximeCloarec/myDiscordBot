const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("food-list-delete")
        .setDescription("Delete a food item from the list")
        .addIntegerOption((option) =>
            option
                .setName("id")
                .setDescription("ID of the food item to delete")
                .setRequired(true)
        ),
    async execute(interaction) {
        const foodId = interaction.options.getInteger("id");
        try {
            fetch(
                `http://192.168.1.25:3050/foodlist/api/deleteFood/${foodId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            await interaction.reply(
                `Successfully deleted food item with ID ${foodId}!`
            );
        } catch (error) {
            console.error("Error deleting food item:", error);
            await interaction.reply("Failed to delete the food item.");
            return;
        }
    },
};
