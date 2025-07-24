const { REST, Routes } = require("discord.js");
const { clientId, token } = require("./config.json");
const guilds = require("./guilds.json");
const fs = require("node:fs");
const path = require("node:path");

const getCommandsForGuild = (folderName) => {
    const commands = [];

    // Ajouter les commandes "shared"
    const sharedPath = path.join(__dirname, "commands", "shared");
    if (fs.existsSync(sharedPath)) {
        const sharedFiles = fs
            .readdirSync(sharedPath)
            .filter((file) => file.endsWith(".js"));
        for (const file of sharedFiles) {
            const command = require(path.join(sharedPath, file));
            if ("data" in command && "execute" in command)
                commands.push(command.data.toJSON());
        }
    }

    // Ajouter les commandes spécifiques à la guilde
    const guildPath = path.join(__dirname, "commands", folderName);
    if (fs.existsSync(guildPath)) {
        const guildFiles = fs
            .readdirSync(guildPath)
            .filter((file) => file.endsWith(".js"));
        for (const file of guildFiles) {
            const command = require(path.join(guildPath, file));
            if ("data" in command && "execute" in command)
                commands.push(command.data.toJSON());
        }
    }

    return commands;
};

const rest = new REST().setToken(token);

(async () => {
    try {
        for (const [folder, guildId] of Object.entries(guilds)) {
            const commands = getCommandsForGuild(folder);
            console.log(
                `Deploying ${commands.length} commands to guild ${guildId}`
            );

            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands }
            );

            console.log(
                `✅ Successfully reloaded ${data.length} commands for guild ${guildId}`
            );
        }
    } catch (error) {
        console.error("❌ Error while deploying commands:", error);
    }
})();
