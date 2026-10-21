import { dict } from "./dict";

/** Blocking head script: stored choice, else navigator.language. Default remains PT. */
export function langBootScript() {
  const payload = JSON.stringify({ pt: dict.pt.meta, en: dict.en.meta }).replace(/</g, "\\u003c");
  return `(function(){try{var T=${payload};var l=null;try{l=localStorage.getItem("lang")}catch(e){}if(l!=="pt"&&l!=="en"){var n=(navigator.language||"pt").toLowerCase();l=n.indexOf("pt")===0?"pt":"en"}var m=T[l],root=document.documentElement;root.lang=m.htmlLang;root.dataset.lang=l;document.title=m.title;var set=function(s,v){var e=document.querySelector(s);if(e)e.setAttribute("content",v)};set('meta[name="description"]',m.description);set('meta[property="og:title"]',m.title);set('meta[property="og:description"]',m.description);set('meta[property="og:locale"]',m.locale);set('meta[name="twitter:title"]',m.title);set('meta[name="twitter:description"]',m.description)}catch(e){}})();`;
}
