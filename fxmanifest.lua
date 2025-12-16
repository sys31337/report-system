fx_version 'cerulean'
game 'gta5'

author 'Report System Community'
description 'Free Report System for FiveM Servers'
version '1.0.0'

fx_metadata 'provides' { 'report-system' }

shared_scripts {
    'shared/config.lua',
    'shared/constants.lua'
}

client_scripts {
    'client/main.lua',
    'client/events.lua',
    'client/exports.lua'
}

server_scripts {
    'server/main.lua',
    'server/database.lua',
    'server/discord.lua',
    'server/exports.lua'
}

ui_page 'ui/dist/index.html'

files {
    'ui/dist/index.html',
    'ui/dist/**/*'
}

dependencies {
    '/onesync'
}