import { join } from "path";
import type { PageServerLoad } from "./$types";
import { loadMarkdownFile } from "$lib/toolkit/markdown";

export const load: PageServerLoad = async ({ fetch, params }) => {
    let dst = join('src/routes/a/md', params.id + '.md');
    return await loadMarkdownFile(dst);
}