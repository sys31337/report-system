local reports = {}
local reportId = 1

AddEventHandler('onServerResourceStart', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        print("^2Report System Started^7")
    end
end)

RegisterServerEvent('report-system:submitReport')
AddEventHandler('report-system:submitReport', function(data)
    local playerId = source
    local playerName = GetPlayerName(playerId)
    
    if not reports[playerId] then
        reports[playerId] = {}
    end
    
    if #reports[playerId] >= Config.MaxReports then
        TriggerClientEvent('chat:addMessage', playerId, {
            args = {"Report System", "You have reached the maximum number of reports"},
            color = {255, 0, 0}
        })
        return
    end
    
    local report = {
        id = reportId,
        playerId = playerId,
        playerName = playerName,
        subject = data.subject,
        category = data.category,
        description = data.description,
        status = Constants.REPORT_STATUS.OPEN,
        claimedBy = nil,
        claimedByName = nil,
        messages = {},
        createdAt = os.time(),
        closedAt = nil
    }
    
    reports[playerId][reportId] = report
    TriggerClientEvent('report-system:reportSent', playerId, report)
    
    if Config.EnableDiscordLogs then
        TriggerEvent('report-system:sendDiscordLog', "New Report", string.format(
            "**Player:** %s\n**Category:** %s\n**Subject:** %s\n**Description:** %s",
            playerName, data.category, data.subject, data.description
        ))
    end
    
    reportId = reportId + 1
end)

RegisterServerEvent('report-system:sendMessage')
AddEventHandler('report-system:sendMessage', function(data)
    local playerId = source
    local playerName = GetPlayerName(playerId)
    local report = FindReport(data.reportId)
    
    if report then
        table.insert(report.messages, {
            sender = playerName,
            senderId = playerId,
            message = data.message,
            timestamp = os.time()
        })
        
        TriggerClientEvent('report-system:notifyNewMessage', -1, report.id, {
            sender = playerName,
            message = data.message,
            timestamp = os.time()
        })
    end
end)

RegisterServerEvent('report-system:claimReport')
AddEventHandler('report-system:claimReport', function(reportId)
    local staffId = source
    local staffName = GetPlayerName(staffId)
    local report = FindReport(reportId)
    
    if report and report.status == Constants.REPORT_STATUS.OPEN then
        report.status = Constants.REPORT_STATUS.CLAIMED
        report.claimedBy = staffId
        report.claimedByName = staffName
        TriggerClientEvent('report-system:reportClaimed', -1, reportId, staffName)
        
        if Config.EnableDiscordLogs and Config.Discord.LogClaims then
            TriggerEvent('report-system:sendDiscordLog', "Report Claimed", string.format(
                "**Report ID:** %d\n**Claimed By:** %s",
                reportId, staffName
            ))
        end
    end
end)

RegisterServerEvent('report-system:closeReport')
AddEventHandler('report-system:closeReport', function(reportId)
    local closedBy = source
    local closedByName = GetPlayerName(closedBy)
    local report = FindReport(reportId)
    
    if report then
        report.status = Constants.REPORT_STATUS.CLOSED
        report.closedAt = os.time()
        TriggerClientEvent('report-system:reportClosed', -1, reportId)
        
        if Config.EnableDiscordLogs and Config.Discord.LogClosures then
            TriggerEvent('report-system:sendDiscordLog', "Report Closed", string.format(
                "**Report ID:** %d\n**Closed By:** %s",
                reportId, closedByName
            ))
        end
    end
end)

function FindReport(id)
    for playerId, playerReports in pairs(reports) do
        for reportId, report in pairs(playerReports) do
            if report.id == id then
                return report
            end
        end
    end
    return nil
end