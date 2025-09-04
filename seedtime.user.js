// ==UserScript==
// @name         Tracker Seeding Time Indicator
// @namespace    http://tampermonkey.net/
// @version      1.3.1
// @description  Show seeding time requirement per tracker in bottom-right corner with tooltip
// @author       Eyck
// @contributor  mlnl
// @match        *://*aither.cc/*
// @match        *://*animelovers.club/*
// @match        *://*animebytes.tv/*
// @match        *://*animetorrents.me
// @match        *://*bitporn.eu/*
// @match        *://*bitsexy.cc/*
// @match        *://*blutopia.cc/*
// @match        *://*cinemaz.to
// @match        *://*digitalcore.club/*
// @match        *://www.empornium.is/*
// @match        *://*exoticaz.to/*
// @match        *://*fappaizuri.me/*
// @match        *://*fearnopeer.com/*
// @match        *://www.happyfappy.org/*
// @match        *://*hawke.uno/*
// @match        *://hd-space.org/*
// @match        *://*homiehelpdesk.net/*
// @match        *://*itatorrents.xyz/*
// @match        *://www.iptorrents.com/*
// @match        *://*kufirc.com/*
// @match        *://*lat-team.com/*
// @match        *://*lst.gg/*
// @match        *://*milkie.cc/*
// @match        *://www.myanonamouse.net/*
// @match        *://*oldtoons.world/*
// @match        *://*onlyencodes.cc/*
// @match        *://*orpheus.network/*
// @match        *://*privatehd.to
// @match        *://*reelflix.xyz/*
// @match        *://*seedpool.org/*
// @match        *://*sextorrent.eu/*
// @match        *://skipthecommercials.xyz/*
// @match        *://*sportscult.org/*
// @match        *://www.torrentleech.org/*
// @match        *://*upload.cx/*
// @match        *://*upscalevault.com/*
// @match        *://*yoinked.org/*
// @match        *://*yu-scene.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Example config — add your tracker domains + seeding time here
    const seedingTimes = {
        "aither.cc": "5 days",
        "animelovers.club": "7 days",
        "animebytes.tv": "3 days",
        "animetorrents.me": "? days",
        "bitporn.eu": "2 days",
        "bitsexy.cc" : "60 hours",
        "blutopia.cc": "7 days",
        "cinemaz.to": "formula or 7 days",
        "digitalcore.club": "5 days",
        "empornium.is": "0 days",
        "exoticaz.to": "formula or 7 days",
        "fappaizuri.me": "3 days",
        "fearnopeer.com": "5 days",
        "happyfappy.org": "0 days",
        "hawke.uno": "5 days",
        "hd-space.org": "? days",
        "homiehelpdesk.net": "7 days",
        "itatorrents.xyz": "7 giorni",
        "iptorrents.com": "14 days",
        "kufirc.com": "0 days",
        "lat-team.com": "3 días",
        "lst.gg": "3 days",
        "milkie.cc": "0 days",
        "myanonamouse.net": "3 days",
        "oldtoons.world": "2 days",
        "onlyencodes.cc": "2 days",
        "orpheus.network": "3 days",
        "privatehd.to": "formula or 7 days",
        "reelflix.xyz": "3 days",
        "seedpool.org": "10 days",
        "sextorrent.eu" : "? days",
        "skipthecommercials.xyz": "7 days",
        "sportscult.org": "36 hours",
        "torrenleech.org": "8 days",
        "upload.cx": "2 days",
        "upscalevault.com": "14 days",
        "yoinked.org": "0 days",
        "yu-scene.net": "5 days",
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
