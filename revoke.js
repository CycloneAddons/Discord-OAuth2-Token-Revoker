// ================================================
// Discord OAuth2 Token Revoker
// Author: CycloneAddons
// Repository: https://github.com/CycloneAddons/Discord-OAuth2-Token-Revoker
// ================================================

// This script revokes ALL authorized OAuth2 applications (third-party bots/apps)
// connected to your Discord account in one go.

(async () => {
    console.clear();
    console.log("%cDiscord OAuth2 Token Revoker", "color: #5865F2; font-size: 18px; font-weight: bold;");
    console.log("%cStarting revocation process...\n", "color: #7289DA;");

    let token = null;

    try {
        window.webpackChunkdiscord_app.push([[Symbol()], {}, (o) => {
            for (let e of Object.values(o.c)) {
                try {
                    if (!e.exports || e.exports === window) continue;
                    
                    if (e.exports?.getToken) {
                        token = e.exports.getToken();
                    }
                    
                    for (let key in e.exports) {
                        if (e.exports?.[key]?.getToken && 
                            "IntlMessagesProxy" !== String(e.exports[key][Symbol.toStringTag])) {
                            token = e.exports[key].getToken();
                        }
                    }
                } catch (err) {}
            }
        }]);
        window.webpackChunkdiscord_app.pop();

        if (!token) {
            console.error("❌ Failed to extract Discord token. Please refresh the page and try again.");
            return;
        }
    } catch (err) {
        console.error("❌ Token extraction failed:", err.message);
        return;
    }

    console.log("Fetching authorized applications...");
    
    const listRes = await fetch("https://discord.com/api/v9/oauth2/tokens", {
        headers: {
            "Authorization": token,
            "x-discord-locale": "en-US"
        },
        credentials: "include"
    });

    if (!listRes.ok) {
        console.error(`❌ Failed to fetch authorized apps: ${listRes.status}`);
        return;
    }

    const apps = await listRes.json();

    if (!Array.isArray(apps) || apps.length === 0) {
        console.log("✅ No authorized applications found.");
        return;
    }

    console.log(`Found ${apps.length} authorized application(s). Starting revocation...\n`);

    let success = 0;
    let failed = 0;

    for (const app of apps) {
        const appId = app.id;
        const appName = app.application?.name || "Unknown App";

        console.log(`🔄 Revoking: ${appName}`);

        const revokeRes = await fetch(`https://discord.com/api/v9/oauth2/tokens/${appId}`, {
            method: "DELETE",
            headers: {
                "Authorization": token,
                "x-discord-locale": "en-US"
            },
            credentials: "include"
        });

        if (revokeRes.ok) {
            console.log(`✅ Successfully revoked: ${appName}`);
            success++;
        } else {
            console.error(`❌ Failed to revoke ${appName} (Status: ${revokeRes.status})`);
            failed++;
        }
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    console.log("\n========================================");
    console.log(`🎉 Revocation Complete!`);
    console.log(`✅ Successfully revoked : ${success}`);
    console.log(`❌ Failed            : ${failed}`);
    console.log("========================================");
    console.log("%cRefresh the Authorized Apps page in Discord settings to see the changes.", "color: #7289DA;");

})();
