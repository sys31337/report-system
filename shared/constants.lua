Constants = {}

Constants.REPORT_STATUS = {
    OPEN = "open",
    CLAIMED = "claimed",
    CLOSED = "closed"
}

Constants.REPORT_ACTIONS = {
    HEAL = "heal",
    TELEPORT_TO = "teleport_to",
    BRING = "bring",
    KICK = "kick",
    BAN = "ban"
}

Constants.UI_EVENTS = {
    OPEN_REPORT = "report-system:openReport",
    CLOSE_REPORT = "report-system:closeReport",
    SEND_MESSAGE = "report-system:sendMessage",
    CLAIM_REPORT = "report-system:claimReport",
    UNCLAIM_REPORT = "report-system:unclaimReport",
    CLOSE_REPORT_COMPLETE = "report-system:closeReportComplete",
    EXECUTE_ACTION = "report-system:executeAction"
}