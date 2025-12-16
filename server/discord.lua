RegisterServerEvent('report-system:sendDiscordLog')
AddEventHandler('report-system:sendDiscordLog', function(title, description)
    if not Config.Discord.WebhookUrl or Config.Discord.WebhookUrl == "" then
        return
    end
    
    local hex = Config.AccentColor:gsub("#", "")
    local color = tonumber("0x" .. hex:sub(5, 6) .. hex:sub(3, 4) .. hex:sub(1, 2))
    
    local embed = {
        {
            title = title,
            description = description,
            color = color,
            timestamp = os.date("!%Y-%m-%dT%H:%M:%SZ")
        }
    }
    
    PerformHttpRequest(Config.Discord.WebhookUrl, function(err, text, headers)
        if err ~= 200 then
            print("^1Discord Webhook Error: " .. err .. "^7")
        end
    end, 'POST', json.encode({embeds = embed}), {['Content-Type'] = 'application/json'})
end)