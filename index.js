require('dotenv').config()
const { Client, IntentsBitField, InteractionCollector } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],

});

client.on('ready',(c) => {
    console.log(`${c.user.tag} is online`)
});

client.on('messageCreate',(msg)=>{
    
    if(msg.author.bot){
        return;
    }

    if(msg.content === 'hello')
    {
        msg.reply('Hey!');
    }
    else if(msg.content === 'hi')
    {
        msg.reply('Wassup?!');
    }
    else if(msg.content === 'hey')
    {
        msg.reply('Wassgood!?');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add'){
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`);
    }

    if(interaction.isButton()) {
        await interaction.deferReply({ephemeral: true});

        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role){
            interaction.editReply({
                content: 'Role Not Found!'
            })
        }
    
        const hasRole = interaction.member.roles.cache.has(role.id);
        if (hasRole){
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The role ${role} has been removed`)
        }

        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`)
    }    
});

client.login(process.env.TOKEN);
