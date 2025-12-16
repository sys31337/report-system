local reportOpen = false
local reportData = {}

RegisterCommand('report', function(source, args, rawCommand)
    if not reportOpen then
        SendNUIMessage({
            type = 'OPEN_UI'
        })
        reportOpen = true
        SetNuiFocus(true, true)
    end
end, false)

RegisterCommand('closereport', function(source, args, rawCommand)
    if reportOpen then
        SendNUIMessage({
            type = 'CLOSE_UI'
        })
        reportOpen = false
        SetNuiFocus(false, false)
    end
end, false)

RegisterNUICallback('getConfig', function(data, cb)
    cb({
        accentColor = Config.AccentColor,
        darkMode = Config.DarkMode,
        categories = Config.Categories
    })
end)

RegisterNUICallback('submitReport', function(data, cb)
    TriggerServerEvent('report-system:submitReport', data)
    cb('ok')
end)

RegisterNUICallback('closeUI', function(data, cb)
    reportOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('sendMessage', function(data, cb)
    TriggerServerEvent('report-system:sendMessage', data)
    cb('ok')
end)

RegisterNUICallback('claimReport', function(data, cb)
    TriggerServerEvent('report-system:claimReport', data.reportId)
    cb('ok')
end)

RegisterNUICallback('closeReport', function(data, cb)
    TriggerServerEvent('report-system:closeReport', data.reportId)
    cb('ok')
end)

RegisterNetEvent('report-system:notifyReportUpdate')
AddEventHandler('report-system:notifyReportUpdate', function(report)
    SendNUIMessage({
        type = 'UPDATE_REPORT',
        report = report
    })
end)

RegisterNetEvent('report-system:notifyNewMessage')
AddEventHandler('report-system:notifyNewMessage', function(reportId, message)
    SendNUIMessage({
        type = 'NEW_MESSAGE',
        reportId = reportId,
        message = message
    })
end)