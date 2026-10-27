import { dict } from "./dict";
import { LANG_COOKIE_PATTERN, LANG_KEY } from "./detect";

/**
 * Blocking head script: stored choice, else the primary browser language.
 * `navigator.languages` matches Accept-Language; `navigator.language` is the fallback.
 * Portuguese only when that tag starts with "pt". Does not persist the result.
 */
export function langBootScript() {
  const payload = JSON.stringify({ pt: dict.pt.meta, en: dict.en.meta }).replace(/</g, "\\u003c");
  const key = JSON.stringify(LANG_KEY);
  return `(function(){try{var T=${payload};var l=null;try{l=localStorage.getItem(${key})}catch(e){}if(l!=="pt"&&l!=="en"){var c=document.cookie.match(/${LANG_COOKIE_PATTERN}/);if(c)l=c[1]}if(l!=="pt"&&l!=="en"){var tags=[];try{if(navigator.languages&&navigator.languages.length)tags=navigator.languages}catch(e){}if(!tags.length){try{if(navigator.language)tags=[navigator.language]}catch(e){}}var n=String(tags[0]||"").toLowerCase();l=n.indexOf("pt")===0?"pt":"en"}var m=T[l],root=document.documentElement;root.lang=m.htmlLang;root.dataset.lang=l;document.title=m.title;var set=function(s,v){var e=document.querySelector(s);if(e)e.setAttribute("content",v)};set('meta[name="description"]',m.description);set('meta[property="og:title"]',m.title);set('meta[property="og:description"]',m.description);set('meta[property="og:locale"]',m.locale);set('meta[name="twitter:title"]',m.title);set('meta[name="twitter:description"]',m.description)}catch(e){}})();`;
}
