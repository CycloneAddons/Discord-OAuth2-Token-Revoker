# Discord OAuth2 Token Revoker

A simple and fast **browser console script** to mass-revoke all OAuth2 authorized applications connected to your Discord account.

Perfect for quickly cleaning up access from bots like Dyno, MEE6, Carl-bot, Rythm, and many others without manually going through Discord settings.

![Discord Logo](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)

## ✨ Features

- Fetches all authorized OAuth2 tokens
- Revokes them one by one with safe delays to avoid rate limits
- Clean and detailed console output with success/failure status
- Works on the latest Discord Web version

## ⚠️ Compatibility

- **Fully supported**: Discord Web (discord.com) in Chrome, Edge, Firefox, etc.
- **Partially supported**: Discord Desktop App — requires enabling Developer Tools first (Ctrl + Shift + I).  
  Some users may need to enable DevTools manually by editing settings files.

**Best results** are on **Discord Web** (recommended).

## ⚠️ Important Warning

This script will **revoke access from ALL third-party apps** at once.

After running it, you will need to re-authorize any applications/bots you still want to use.

**Use at your own risk.** Only run this on your own account.

## 🚀 How to Use

1. Open **Discord Web** at [https://discord.com](https://discord.com) (recommended) or the Desktop App
2. Press `F12` (or Ctrl + Shift + I) to open DevTools → Go to the **Console** tab
3. Copy and paste the entire script from [`revoke.js`](revoke.js)
4. Press **Enter**

The script will automatically start revoking all authorized apps and show progress in the console.

## 📁 Files

- `revoke.js` — Main script (ready to copy-paste)

## 🔒 Privacy & Safety

- The script runs **entirely in your browser**
- No data is sent to any third-party servers
- Open source — feel free to review the code

## ⚡ Tips

- For best compatibility, use **Discord** in Chrome, Edge or Discord App
- Run this script occasionally for better account hygiene
- After revoking, re-authorize important bots from their official websites
- If the script fails, refresh Discord and try again

---

**Made with ❤️ by [CycloneAddons](https://github.com/CycloneAddons)**

**Repository:** https://github.com/CycloneAddons/Discord-OAuth2-Token-Revoker
