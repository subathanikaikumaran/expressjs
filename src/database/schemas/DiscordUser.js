const mongoose = require("mongoose");

const DiscordUser = new mongoose.Schema({
    discordId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },  
  creatAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});


module.exports = mongoose.model('discord_users',DiscordUser);
