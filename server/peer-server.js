const fs = require("fs")
const PeerServer = require("peer").PeerServer

const server = PeerServer({
    port: 9000,
    path: '/peerjs',
    //ssl: {}
})

