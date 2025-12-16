RegisterNetEvent('report-system:openReportUI')
AddEventHandler('report-system:openReportUI', function()
    SendNUIMessage({
        type = 'OPEN_UI'
    })
    SetNuiFocus(true, true)
end)

RegisterNetEvent('report-system:closeReportUI')
AddEventHandler('report-system:closeReportUI', function()
    SendNUIMessage({
        type = 'CLOSE_UI'
    })
    SetNuiFocus(false, false)
end)

RegisterNetEvent('report-system:reportClaimed')
AddEventHandler('report-system:reportClaimed', function(reportId, claimedBy)
    SendNUIMessage({
        type = 'REPORT_CLAIMED',
        reportId = reportId,
        claimedBy = claimedBy
    })
end)

RegisterNetEvent('report-system:reportClosed')
AddEventHandler('report-system:reportClosed', function(reportId)
    SendNUIMessage({
        type = 'REPORT_CLOSED',
        reportId = reportId
    })
end)