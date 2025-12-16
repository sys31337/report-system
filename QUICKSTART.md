# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Clone the Repository
```bash
git clone https://github.com/sys31337/report-system.git
cd report-system
```

### 2. Install Dependencies
```bash
cd ui
yarn install
# or: npm install
```

### 3. Choose Your Development Mode

#### Option A: Local Development (Recommended)
```bash
yarn dev:game
```

This binds to `127.0.0.1:5173` and is perfect for in-game testing.

**Update fxmanifest.lua:**
```lua
ui_page 'http://127.0.0.1:5173'  -- Dev server
```

#### Option B: Full Network (Cross-machine testing)
```bash
yarn dev
```

Binds to `0.0.0.0:5173` - accessible from other machines.

### 4. Start Your FiveM Server

Add to `server.cfg`:
```
ensure report-system
```

Then start the server:
```bash
./run.cmd  # Windows
# or your FiveM server startup command
```

### 5. Test In-Game

- Open FiveM
- Connect to your local server
- Use command: `/report`
- Changes to `ui/src/` auto-reload!

## ⚡ Got a 404 Error?

### Problem: React files return 404

**Causes:**
- Dev server not running
- Wrong URL in fxmanifest.lua
- Port 5173 already in use
- Vite not fully initialized

### Solution:

1. **Verify dev server is running:**
   ```bash
   cd ui
   yarn dev:game
   ```
   
   You should see:
   ```
   VITE v5.x.x  ready in 500 ms

   → Local:   http://127.0.0.1:5173/
   ```

2. **Test in browser first:**
   - Open `http://127.0.0.1:5173` in your browser
   - Should load the report UI directly
   - Check browser console (F12) for errors

3. **Update fxmanifest.lua if needed:**
   ```lua
   ui_page 'http://127.0.0.1:5173'
   ```

4. **Restart FiveM resource:**
   ```
   refresh
   ensure report-system
   ```

5. **Check FiveM console (F8):**
   - Look for JavaScript errors
   - Verify NUI is loading

## 🔧 Development Scripts

```bash
# In-game dev server (localhost only)
yarn dev:game

# Full network dev server (all interfaces)
yarn dev

# Production build
yarn build

# Preview production build
yarn preview
```

## 🎨 Customize Accent Color

Edit `shared/config.lua`:
```lua
Config.AccentColor = "#FF6B6B"  -- Change this hex code
```

Restart resource to see changes!

## 📝 For Production

1. **Build the UI:**
   ```bash
   cd ui
   yarn build
   ```

2. **Update fxmanifest.lua:**
   ```lua
   ui_page 'ui/dist/index.html'  -- Production
   
   files {
       'ui/dist/index.html',
       'ui/dist/assets/*'
   }
   ```

3. **Deploy to server:**
   ```bash
   git add .
   git commit -m "Production build"
   git push
   ```

## 🤝 Need Help?

See **[DEVELOPMENT.md](DEVELOPMENT.md)** for detailed troubleshooting and advanced setup.

See **[README.md](README.md)** for configuration and features.

---

**That's it! You're ready to develop.** 🚀
