exports('openReportUI', function()
    TriggerEvent('report-system:openReportUI')
end)

exports('closeReportUI', function()
    TriggerEvent('report-system:closeReportUI')
end)

exports('getReportData', function(callback)
    TriggerServerEvent('report-system:getReportData', function(data)
        callback(data)
    end)
end)