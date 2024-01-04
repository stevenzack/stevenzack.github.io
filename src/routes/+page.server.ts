import { loadMarkdownDir } from "$lib/toolkit/markdown";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad=async({fetch})=>{
    let fs=await loadMarkdownDir('src/routes/a/md');
    return {
        articles:fs
    };
}