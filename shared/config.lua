Config = {}

Config.AccentColor = "#FF6B6B"
Config.DarkMode = false
Config.MaxReports = 10
Config.ReportTimeout = 30
Config.EnableDiscordLogs = true

Config.Categories = {
    "Bug Report",
    "Player Report",
    "Feature Request",
    "Support",
    "Other"
}

Config.Discord = {
    WebhookUrl = "",
    LogReports = true,
    LogClaims = true,
    LogClosures = true,
    LogChats = false
}

local function hexToRgb(hex)
    hex = hex:gsub("#", "")
    return tonumber("0x" .. hex:sub(1, 2)) / 255, 
           tonumber("0x" .. hex:sub(3, 4)) / 255,
           tonumber("0x" .. hex:sub(5, 6)) / 255
end

local accentColor = Config.AccentColor
if type(accentColor) == 'string' and accentColor:sub(1, 1) == "#" then
    local r, g, b = hexToRgb(accentColor)
    accentColor = {r = r, g = g, b = b}
end

Config.ProcessedAccentColor = accentColor