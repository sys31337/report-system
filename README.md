# Report System

🎮 A free, fully working report system for FiveM servers combining React frontend UI with Lua backend. Perfect for ESX, QBCore, and QBox servers.

**Live Repository:** https://github.com/sys31337/report-system

## ✨ Features

### Player Features
- ✅ Submit reports with category & description
- ✅ View personal reports with real-time updates
- ✅ Live chat with staff members
- ✅ Track report status (open, claimed, closed)
- ✅ Character counters and form validation

### Staff Features
- ✅ Staff overview dashboard with all reports
- ✅ Filter reports by status and category
- ✅ Claim/unclaim reports
- ✅ Execute actions (heal, teleport, bring player)
- ✅ Close completed reports
- ✅ Real-time report synchronization

### System Features
- ✅ **Customizable accent colors** (hex format like `#FF6B6B`)
- ✅ Dark/Light mode toggle
- ✅ Discord webhook logging
- ✅ Live player synchronization
- ✅ Fully translatable
- ✅ Exports & events for extensibility
- ✅ Production-ready code

## 🚀 Quick Start

1. **Clone to your FiveM resources folder:**
```bash
git clone https://github.com/sys31337/report-system.git
cd report-system
```

2. **Install and build the UI:**
```bash
cd ui
npm install
npm run build
cd ..
```

3. **Add to your `server.cfg`:**
```
ensure report-system
```

4. **In-game commands:**
   - `/report` - Open report interface
   - `/closereport` - Close report UI

## ⚙️ Configuration

Edit `shared/config.lua`:

```lua
Config.AccentColor = "#FF6B6B"          -- Main UI accent color (hex)
Config.DarkMode = false                 -- Enable dark mode by default
Config.MaxReports = 10                  -- Max reports per player
Config.Categories = {
    "Bug Report",
    "Player Report",
    "Feature Request",
    "Support",
    "Other"
}
```

### Change Accent Color Instantly

Simply modify the hex color:
```lua
Config.AccentColor = "#00FF00"  -- Green
Config.AccentColor = "#0099FF"  -- Blue
Config.AccentColor = "#FF00FF"  -- Magenta
```

Restart the resource and colors update everywhere!

## 🔧 Discord Webhook Setup

1. Create a Discord channel for logs
2. Get webhook URL from channel settings
3. Add to `shared/config.lua`:
```lua
Config.Discord.WebhookUrl = "https://discord.com/api/webhooks/YOUR_URL"
```

## 📤 Exports

### Server
```lua
exports['report-system']:getReport(reportId)
exports['report-system']:getPlayerReports(playerId)
exports['report-system']:updateReportStatus(reportId, status)
exports['report-system']:closeReport(reportId)
```

### Client
```lua
exports['report-system']:openReportUI()
exports['report-system']:closeReportUI()
```

## 📝 Project Structure

```
report-system/
├── fxmanifest.lua
├── shared/
│   ├── config.lua
│   └── constants.lua
├── client/
│   ├── main.lua
│   ├── events.lua
│   └── exports.lua
├── server/
│   ├── main.lua
│   ├── discord.lua
│   └── exports.lua
└── ui/
    ├── package.json
    ├── vite.config.js
    ├── public/index.html
    └── src/
        ├── App.jsx
        ├── config/themeConfig.js
        ├── components/
        │   ├── ReportInterface.jsx
        │   ├── ReportDetail.jsx
        │   └── StaffOverview.jsx
        └── styles/
            ├── theme.css
            └── App.css
```

## 🎨 Color System

Hex colors automatically convert to RGB across Lua and React:

**Lua:** Converts `#FF6B6B` → `{r: 1.0, g: 0.42, b: 0.42}`

**React:** Converts `#FF6B6B` → `{r: 255, g: 107, b: 107}`

CSS applies via custom properties for instant theming!

## ⚡ Performance

- Optimized Lua code with minimal overhead
- React UI with memoized components
- Client-side caching
- Full player synchronization without lag
- Minified production build

## 📦 What's Included

- Complete Lua backend (client & server)
- Full React frontend with 3 views
- Customizable theme system
- Discord integration
- Production build configuration
- Dark/Light mode support
- Responsive design
- Ready to deploy

## 📄 License

Free for community use. Attribution appreciated!

## 🚀 Getting Started

```bash
git clone https://github.com/sys31337/report-system.git
cd report-system
cd ui && npm install && npm run build && cd ..
echo "ensure report-system" >> ../server/server.cfg
```

---

**Built with ❤️ for the FiveM community**