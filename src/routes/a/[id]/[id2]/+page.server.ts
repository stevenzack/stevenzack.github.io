import { join } from "path";
import type { PageServerLoad } from "./$types";
import { loadMarkdownFile } from "$lib/toolkit/markdown";

export const load: PageServerLoad = async ({ fetch, params }) => {
    let dst = join('src/routes/a/md', params.id, params.id2 + '.md');
    let v = await loadMarkdownFile(dst);
    v.id = params.id + ' / ' + v.title;
    return v;
}