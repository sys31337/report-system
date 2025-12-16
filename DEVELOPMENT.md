# Development Guide

## Local Development Setup

### Prerequisites
- Node.js 16+ and Yarn/NPM
- FiveM server running locally
- Code editor (VSCode recommended)

### Development Scripts

#### `yarn dev` - Full Development Mode
```bash
cd ui
yarn dev
```

**Use this for:**
- General development
- Cross-machine testing
- Network development
- Binding to all interfaces (0.0.0.0:5173)

**Access at:**
- Local: `http://localhost:5173`
- Network: `http://<YOUR_IP>:5173`

#### `yarn dev:game` - FiveM In-Game Development
```bash
cd ui
yarn dev:game
```

**Use this for:**
- Testing inside FiveM NUI
- Hot reload while playing
- Localhost-only binding (127.0.0.1:5173)
- Safer testing on same machine

**FiveM Config:**
```lua
ui_page 'http://127.0.0.1:5173'
```

### Full Development Workflow

1. **Start the dev server:**
```bash
cd ui
yarn install
yarn dev:game
```

2. **Update fxmanifest.lua for development:**
```lua
ui_page 'http://127.0.0.1:5173'
```

3. **Start your FiveM server:**
```bash
ensure report-system
```

4. **Test in-game:**
   - Use `/report` command
   - Changes auto-reload in real-time
   - Check console (F8) for errors

5. **Build for production:**
```bash
yarn build
```

6. **Switch fxmanifest.lua back:**
```lua
ui_page 'ui/dist/index.html'
```

## Troubleshooting

### React 404 Errors

**Problem:** `yarn dev` shows 404 in browser

**Solution:**
- Verify Vite is running: Check console for `VITE v5.x.x ready in x ms`
- Clear browser cache (Ctrl+Shift+Delete)
- Check port 5173 is free: `netstat -an | grep 5173`
- Restart dev server

### FiveM NUI Not Loading

**Problem:** `/report` command doesn't open UI in-game

**Solutions:**
1. Verify dev server is running: `http://127.0.0.1:5173` in browser
2. Check fxmanifest.lua uses correct URL
3. Restart resource: `refresh` then `ensure report-system`
4. Check F8 console for JavaScript errors
5. Verify NUI is enabled in server.cfg

### Network Binding Issues

**Problem:** Can't access dev server from other machines

**Solution:**
```bash
# Use yarn dev (binds to 0.0.0.0:5173)
yarn dev

# Access from other machine
http://<YOUR_IP_ADDRESS>:5173
```

### Module Not Found Errors

**Problem:** `Cannot find module 'react'` or similar

**Solution:**
```bash
cd ui
rm -rf node_modules package-lock.json
yarn install
yarn dev:game
```

## File Structure During Development

```
report-system/
├── fxmanifest.lua              # Points to dev server during dev
├── client/                     # No hot reload needed
├── server/                     # Restart resource to apply changes
├── shared/                     # Restart resource to apply changes
└── ui/
    ├── src/                    # HOT RELOAD - Edit here!
    │   ├── App.jsx
    │   ├── components/
    │   ├── styles/
    │   └── config/
    ├── public/
    ├── dist/                   # Production build only
    ├── vite.config.js
    ├── package.json
    └── .env                    # Create from .env.example
```

## Hot Module Reload (HMR)

**React files automatically reload** when you:
- Edit `.jsx` files
- Edit `.css` files
- Edit component props/state

**Requires manual refresh:**
- Changes to Lua files (client/server)
- Changes to fxmanifest.lua
- Adding new exports/events

## Performance Tips

1. **Use React DevTools** - Install React DevTools browser extension
2. **Check Console** - F8 in FiveM or F12 in browser dev tools
3. **Profile Performance** - Use React Profiler in DevTools
4. **Minimize Console Logs** - Remove before production build

## Production Build

```bash
cd ui
yarn build
```

Output:
```
ui/dist/
├── index.html
├── assets/
│   ├── index-HASH.js       (minified React code)
│   └── index-HASH.css      (minified styles)
```

Then update fxmanifest.lua:
```lua
ui_page 'ui/dist/index.html'

files {
    'ui/dist/index.html',
    'ui/dist/assets/*'
}
```

## Git Workflow

**Don't commit:**
- `ui/node_modules/`
- `ui/dist/` (will rebuild on clone)
- `ui/.env` (use .env.example)
- `*.log` files

**.gitignore already includes these**

## Environment Variables

Create `ui/.env` from `ui/.env.example`:

```bash
cp ui/.env.example ui/.env
```

Edit as needed for your setup.

## Resources

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [FiveM NUI Docs](https://docs.fivem.net/docs/scripting-reference/nui-development/)
- [Lua FiveM](https://docs.fivem.net/docs/scripting-reference/lua/)
