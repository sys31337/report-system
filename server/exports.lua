exports('getReport', function(reportId)
    local report = FindReport(reportId)
    return report
end)

exports('getPlayerReports', function(playerId)
    return reports[playerId] or {}
end)

exports('updateReportStatus', function(reportId, status)
    local report = FindReport(reportId)
    if report then
        report.status = status
        return true
    end
    return false
end)

exports('closeReport', function(reportId)
    local report = FindReport(reportId)
    if report then
        report.status = Constants.REPORT_STATUS.CLOSED
        report.closedAt = os.time()
        return true
    end
    return false
end)