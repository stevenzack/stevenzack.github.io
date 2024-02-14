import { join } from "path";
import type { PageServerLoad } from "./$types";
import { loadMarkdownDir, loadMarkdownFile } from "$lib/toolkit/markdown";
import { stat } from "fs/promises";

export const load: PageServerLoad = async ({ fetch, params }) => {
    const dir = 'src/routes/a/md/' + params.id;
    try {
        const info = await stat(dir);
        if (info.isDirectory()) {
            const children = await loadMarkdownDir(dir);
            return {
                id: params.id,
                title: params.id,
                cover: '',
                keywords: [],
                from: '',
                author: '',
                publishTime: '',
                content: '',
                relatedArticles: [],
                previousArticle: null,
                nextArticle: null,
                children: children,
                headers: {},
            }
        }
    } catch (e) {
    }

    let dst = join('src/routes/a/md', params.id + '.md');
    return await loadMarkdownFile(dst);
}