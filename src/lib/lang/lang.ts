import { base } from "$app/paths";
import en from "./en";
import type StrIds from "./strids";
import zh_CN from "./zh_CN";

export let ModeCN = true;

export function getStr(id: StrIds): string {
    let m = ModeCN ? zh_CN : en;
    if (base === '/zh') {
        m = zh_CN;
    } else if (base === '/en') {
        m = en;
    }
    return m[id];
}
