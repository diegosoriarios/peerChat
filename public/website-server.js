const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')
const os = require('os')
const ifaces = os.networkInterfaces()

//CERTIFICADOS

const express = require('express')
const app = express()

var httpServer = http.createServer(app)

Object.keys(ifaces).forEach(ifname => {
    let alias = 0

    ifaces[ifname].forEach(iface => {
        if('IPv4' !== iface.family || iface.internal !== false) {
            return
        }

        console.log("")
        console.log("Welcome to the Chat Sandbox")
        console.log("")
        console.log("Test the chat interface from this device at: ", "https://localhost:8443")
        console.log("")
        console.log("And access the chat sandbox from another device through LAN using any of the IPS:")
        console.log("Important: Node.js needs to accept inbound connections throug the Host Firewall")
        console.log("")

        if(alias >= 1) {
            console.log("Multiple ipv4 addreses were found...")
            console.log(ifname + ':' + alias, "https://" + iface.address + ":8443")
        } else {
            console.log(ifname, "https://" + iface.address + ":8443")
        }

        ++alias
    })
})

var LANAccess = "0.0.0.0"

httpServer.listen(8080, LANAccess)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.use("/resourecs", express.static("./source"))