import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { langBootScript } from "./boot";
import { dict } from "./dict";
import { langCookieAssignment, langFromCookie, resolveLang } from "./detect";

type Fixture = {
  name: string;
  stored: string | null;
  cookie: string;
  languages: string[];
  language: string;
  expect: "pt" | "en";
};

const cases: Fixture[] = [
  { name: "en-US", stored: null, cookie: "", languages: ["en-US", "en"], language: "en-US", expect: "en" },
  { name: "pt-BR", stored: null, cookie: "", languages: ["pt-BR", "pt", "en-US"], language: "pt-BR", expect: "pt" },
  { name: "pt language when the list is empty", stored: null, cookie: "", languages: [], language: "pt-PT", expect: "pt" },
  { name: "en language when the list is empty", stored: null, cookie: "", languages: [], language: "en-US", expect: "en" },
  { name: "missing language is English", stored: null, cookie: "", languages: [], language: "", expect: "en" },
  { name: "es-ES is English", stored: null, cookie: "", languages: ["es-ES", "es"], language: "es-ES", expect: "en" },
  { name: "languages pt wins over language en", stored: null, cookie: "", languages: ["pt-BR", "en-US"], language: "en-US", expect: "pt" },
  { name: "languages en wins over language pt", stored: null, cookie: "", languages: ["en-US", "en"], language: "pt-BR", expect: "en" },
  { name: "uppercase PT-BR", stored: null, cookie: "", languages: ["PT-BR"], language: "PT-BR", expect: "pt" },
  { name: "en-PT is not Portuguese", stored: null, cookie: "", languages: ["en-PT"], language: "en-PT", expect: "en" },
  { name: "stored en overrides a Portuguese browser", stored: "en", cookie: "", languages: ["pt-BR", "pt"], language: "pt-BR", expect: "en" },
  { name: "stored pt overrides an English browser", stored: "pt", cookie: "", languages: ["en-US"], language: "en-US", expect: "pt" },
  { name: "cookie en overrides a Portuguese browser", stored: null, cookie: "theme=dark; lang=en", languages: ["pt-BR"], language: "pt-BR", expect: "en" },
  { name: "cookie pt overrides an English browser", stored: null, cookie: "lang=pt", languages: ["en-US"], language: "en-US", expect: "pt" },
  { name: "localStorage beats a conflicting cookie", stored: "pt", cookie: "lang=en", languages: ["en-US"], language: "en-US", expect: "pt" },
  { name: "invalid stored value falls through to the cookie", stored: "fr", cookie: "lang=en; theme=dark", languages: ["pt-BR"], language: "pt-BR", expect: "en" },
  { name: "cookie region tag is ignored", stored: null, cookie: "lang=pt-BR", languages: ["en-US"], language: "en-US", expect: "en" },
  { name: "unrelated cookie is ignored", stored: null, cookie: "xlang=pt; theme=dark", languages: ["fr-FR"], language: "fr-FR", expect: "en" },
];

function tagsFor(fx: Fixture): string[] {
  if (fx.languages.length) return fx.languages;
  return fx.language ? [fx.language] : [];
}

function runBoot(fx: Fixture) {
  const writes: string[] = [];
  const meta = new Map<string, string>();
  const document = {
    cookie: fx.cookie,
    title: "",
    documentElement: { lang: "pt-BR", dataset: {} as { lang?: string } },
    querySelector(sel: string) {
      return {
        setAttribute(_name: string, value: string) {
          meta.set(sel, value);
        },
      };
    },
  };
  const localStorage = {
    getItem(key: string) {
      return key === "lang" ? fx.stored : null;
    },
    setItem(key: string, value: string) {
      writes.push(`${key}=${value}`);
    },
  };
  const navigator = { language: fx.language, languages: fx.languages };
  const context = vm.createContext({ document, localStorage, navigator });
  vm.runInContext(langBootScript(), context);
  return { document, meta, writes };
}

test("resolveLang matches the cases", () => {
  for (const fx of cases) {
    assert.equal(
      resolveLang({ stored: fx.stored, cookie: fx.cookie, languages: tagsFor(fx) }),
      fx.expect,
      fx.name,
    );
  }
});

test("boot script agrees with resolveLang and does not persist detection", () => {
  const script = langBootScript();
  assert.equal(script.includes("localStorage.setItem"), false);
  for (const fx of cases) {
    const result = runBoot(fx);
    assert.equal(result.document.documentElement.dataset.lang, fx.expect, fx.name);
    assert.equal(result.document.documentElement.lang, dict[fx.expect].meta.htmlLang, fx.name);
    assert.equal(result.document.title, dict[fx.expect].meta.title, fx.name);
    assert.equal(result.meta.get('meta[name="description"]'), dict[fx.expect].meta.description, fx.name);
    assert.equal(result.meta.get('meta[property="og:locale"]'), dict[fx.expect].meta.locale, fx.name);
    assert.deepEqual(result.writes, [], fx.name);
  }
});

test("cookie helper round-trips only exact pt and en", () => {
  assert.equal(langFromCookie(langCookieAssignment("en", true)), "en");
  assert.equal(langFromCookie(langCookieAssignment("pt", false)), "pt");
  assert.match(langCookieAssignment("en", true), /Secure/);
  assert.equal(langCookieAssignment("pt", false).includes("Secure"), false);
  assert.equal(langFromCookie("lang=english"), null);
  assert.equal(langFromCookie(""), null);
});
