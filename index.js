const { Ritsu } = require('./src/Ritsu')
const { readFileSync } = require('fs')

require('dotenv').config()

console.log(readFileSync('title.txt', 'utf8').toString())
console.log('Made by FelipeSazz with Javascript and Love.\n\n')

const client = new Ritsu(process.env.TOKEN, {
  prefix: process.env.BOT_PREFIX,
})
client.start("ODQyMjA1NDUwODI0MzE5MDM3.YJx68g.Tehw3b-zbpp2ATTIxSGP5Dc3_VQ")
