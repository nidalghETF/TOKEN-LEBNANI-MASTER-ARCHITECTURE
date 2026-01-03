// auth.js - Security Logic

// 1. Configuration
const PASSWORD = "Token"; // Case-sensitive as requested
const STORAGE_KEY = "token_lebnani_access";
const PROTECTED_PAGES = ["index.html", "architecture.html"];

// 2. Check Authorization on Load
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const isProtected = PROTECTED_PAGES.some(page => path.includes(page));
    const isSplash = path.includes("splash.html") || path.endsWith("/"); // Assumption for root

    // If on a protected page and NO token -> Kick to splash
    if (isProtected && !isAuthenticated()) {
        window.location.href = "splash.html";
    }

    // If on splash page, setup the login UI
    if (path.includes("splash.html")) {
        setupSplashUI();
    }
});

function isAuthenticated() {
    return localStorage.getItem(STORAGE_KEY) === "granted";
}

// 3. Setup Splash UI (The Bottom-Right Trigger)
function setupSplashUI() {
    // Create the Fixed Bottom-Right Button
    const triggerBtn = document.createElement("div");
    triggerBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    `;
    triggerBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #D4AF37;
        transition: all 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;

    // Hover Effect
    triggerBtn.onmouseover = () => { triggerBtn.style.background = "rgba(212, 175, 55, 0.2)"; };
    triggerBtn.onmouseout = () => { triggerBtn.style.background = "rgba(255, 255, 255, 0.05)"; };

    // Create Modal (Hidden by default)
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); backdrop-filter: blur(15px);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        z-index: 2000;
    `;
    
    modal.innerHTML = `
        <div style="background: rgba(255,255,255,0.05); padding: 40px; border-radius: 20px; border: 1px solid rgba(212,175,55,0.2); text-align: center;">
            <h3 style="color: #fff; margin-bottom: 20px; font-family: sans-serif;">Confidential Portal</h3>
            <input type="password" id="passInput" placeholder="Enter Access Token" style="
                background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
                padding: 12px; color: #fff; border-radius: 8px; width: 100%; outline: none; margin-bottom: 20px;">
            <button id="loginBtn" style="
                background: #D4AF37; color: #000; border: none; padding: 12px 24px;
                border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%;">ACCESS</button>
            <div id="errorMsg" style="color: #ff4444; margin-top: 15px; font-size: 0.8rem; opacity: 0;">Invalid Token</div>
        </div>
    `;

    document.body.appendChild(triggerBtn);
    document.body.appendChild(modal);

    // Event Listeners
    triggerBtn.addEventListener("click", () => {
        modal.style.opacity = "1";
        modal.style.pointerEvents = "all";
        document.getElementById("passInput").focus();
    });

    // Close on click outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.opacity = "0";
            modal.style.pointerEvents = "none";
        }
    });

    // Login Logic
    const attemptLogin = () => {
        const input = document.getElementById("passInput");
        const err = document.getElementById("errorMsg");
        
        if (input.value === PASSWORD) {
            localStorage.setItem(STORAGE_KEY, "granted");
            // Animation out
            modal.innerHTML = `<div style="color:#D4AF37; font-size:1.5rem;">Access Granted</div>`;
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to Executive Summary
            }, 800);
        } else {
            err.style.opacity = "1";
            input.style.borderColor = "#ff4444";
            // Shake effect
            input.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
        }
    };

    document.getElementById("loginBtn").addEventListener("click", attemptLogin);
    document.getElementById("passInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") attemptLogin();
    });
}
