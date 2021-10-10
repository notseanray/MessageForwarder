# MessageForwarder
This simple bot is used to forward messages from a collection of channels to other channels.
### Config Options
`token` - discord token
`color` - hexcolor of embeds
`channels` - an array of channel ids to watch for messages in
`send` - an array of ids of channels to send to, the index position of channels gets sent to the index position of this array
`ignored` - an array of guild ids to ignore activity from, this can slightly improve the speed for large amounts of channels
