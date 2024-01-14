//Allowing people to select their roles from what the bot offers

require('dotenv').config()
const { Client, IntentsBitField, InteractionCollector, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],

});


//describing all the roles and id-ing and labelling them accordingly
const roles = [
    {
        id: ,
        label: 
    }
]

//creating rows for the buttons to be displayed in for the roles to chose
client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('');
        if(!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary) 
            )
        })

        await channel.send({
            content: 'Claim or remove a role below',
            components: [row]
        })
     } catch (error) {
        console.log(error);
    }        
});

client.login(process.env.TOKEN);
