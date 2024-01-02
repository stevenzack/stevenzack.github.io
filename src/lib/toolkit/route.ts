import { base } from "$app/paths";
import { subAfterLast, subAfter, subBefore, trimStart } from "./strx";
export function isInsideWechatBrowser(): boolean {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') > -1;
}

// place files you want to import through the `$lib` alias in this folder.
export function getRoute(s: string, ignoreBase: boolean = false): string {
    if (s.startsWith('http')) {
        return s;
    }
    let ss = s.split('?');
    let path = ss[0];
    let query = '';
    if (ss.length > 0 && ss[1]) {
        query = '?' + ss[1];
    }

    let b = base;
    if (ignoreBase) {
        b = '';
    }
    if (path.endsWith('/')) {
        return b + path + query;
    }
    if (import.meta.env.MODE === 'development') {
        return b + path + query;
    }
    let name = subAfterLast(path, '/', '');
    let ext = subAfterLast(name, '.', '');
    if (ext) {
        return path + query;
    }

    return b + path + '.html' + query;
}

export function parseQuery(url: string): Record<string, string> {
    var m: Record<string, string> = {};
    var query = subAfter(url, '?', '');
    if (query == '') {
        return m;
    }
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i]
        var key = subBefore(pair, '=', '');
        if (key == '') {
            continue
        }
        key = decodeURIComponent(key);

        var value = subAfter(pair, '=', '');
        if (value == '') {
            continue
        }
        value = decodeURIComponent(value)
        m[key] = value
    }
    return m;
}

export function isRegionMainlandChina(): boolean {
    let s = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
    return s.indexOf('shanghai') > -1 || s.indexOf('urumqi') > -1;
}

export function checkOkRedirection() {
    let s = location.search;
    let m = parseQuery(s);
    let ok = m['ok'];
    if (ok && ok.startsWith('/')) {
        location.pathname = ok;
        return;
    }
    location.pathname = getRoute('/')
}


export function getOtherLanguageRoute(route: string, targetLanguage: string): string {
    route = trimStart(route, '/zh/');
    route = trimStart(route, '/en/');
    route = trimStart(route, '/');
    if (route.startsWith('a/') || route.startsWith('articles/')) {
        return '/' + route;
    }
    return '/' + targetLanguage + '/' + route;
}