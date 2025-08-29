// ==UserScript==
// @name         Tracker Seeding Time Indicator
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Show seeding time requirement per tracker in bottom-right corner with tooltip
// @author       Eyck
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Example config — add your tracker domains + seeding time here
    const seedingTimes = {
        "lst.gg": "3 days",
        "aither.cc": "5 days",
        "oldtoons.world": "2 days",
        "onlyencodes.cc": "2 days",
        "seedpool.org": "10 days",
        "torrenleech.org": "8 days",
        "sportscult.org": "36 hours",
        "digitalcore.club": "5 days"
    };

    // Detect domain
    const domain = window.location.hostname.replace("www.","");
    if (!(domain in seedingTimes)) return; // exit if not configured

    // Create seeding icon
    const icon = document.createElement("div");
    icon.innerHTML = "🌱"; // seeding icon
    icon.style.position = "fixed";
    icon.style.bottom = "15px";
    icon.style.right = "15px";
    icon.style.fontSize = "22px";
    icon.style.cursor = "default";
    icon.style.zIndex = "9999";
    icon.style.userSelect = "none";

    // Tooltip
    const tooltip = document.createElement("div");
    tooltip.innerText = `Minimum seeding time: ${seedingTimes[domain]}`;
    tooltip.style.position = "fixed";
    tooltip.style.padding = "6px 10px";
    tooltip.style.background = "rgba(0,0,0,0.8)";
    tooltip.style.color = "#fff";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "13px";
    tooltip.style.fontFamily = "sans-serif";
    tooltip.style.textRendering = "optimizeLegibility";
    tooltip.style.webkitFontSmoothing = "antialiased";
    tooltip.style.mozOsxFontSmoothing = "grayscale";
    tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.bottom = "50px"; // just above the icon
    tooltip.style.right = "15px";
    tooltip.style.zIndex = "10000";
    tooltip.style.display = "none";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.15s ease-in-out";

    document.body.appendChild(icon);
    document.body.appendChild(tooltip);

    // Show/hide tooltip with smooth fade
    icon.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
        requestAnimationFrame(() => { tooltip.style.opacity = "1"});
    });
    icon.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
        setTimeout(() => { tooltip.style.display = "none"}, 150);
    });
})();
