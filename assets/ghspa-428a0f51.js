(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();(function(t,o){var i=o?"/"+t.pathname.split("/")[1]:"";function c(){t.replace(t.protocol+"//"+t.hostname+(t.port?":"+t.port:"")+i+"/?"+(t.pathname?"p="+t.pathname.replace(/&/g,"~and~").replace(i,""):"")+(t.search?"&q="+t.search.slice(1).replace(/&/g,"~and~"):"")+t.hash)}function e(){if(t.search){var r={};t.search.slice(1).split("&").forEach(function(n){var s=n.split("=");r[s[0]]=s.slice(1).join("=").replace(/~and~/g,"&")}),r.p!==void 0&&window.history.replaceState(null,null,i+(r.p||"")+(r.q?"?"+r.q:"")+t.hash)}}document.title==="404"?c():e()})(window.location,window.projectPages||!0);