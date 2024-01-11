import { readdir, stat, readFile } from "fs/promises";
import { join } from "path";
import { subAfter, subBefore, toMimeType, trimBoth, trimEnd, trimStart } from "./strx";

class MarkdownConverter {
    private processors: MarkdownProcessor[];
    constructor() {
        this.processors = [
            this.createPrefix('# ', 'h4'),
            this.createPrefix('## ', 'h5'),
            this.createPrefix('### ', 'h5'),
            this.createPrefix('#### ', 'h5'),
            this.createPrefix('---', 'hr'),
            this.createPrefix('- ', 'li'),
            this.createPrefix('    - ', 'li', 'style="margin-left:18px;"'),
            this.createPrefix('    ', 'mark', 'style="padding-left:18px;"'),
            this.createMediaProcessor(),
        ];
    }

    private createMediaProcessor(): MarkdownProcessor {
        return {
            check: s => s.startsWith('!['),
            parse: s => {
                let alt = subBefore(s, '](', '');
                alt = subAfter(alt, '![', alt);
                s = subAfter(s, '](', '');
                s = subBefore(s, ')', s);
                let mime = toMimeType(s);
                if (mime.startsWith('image/')) {
                    return `<img src="${s}" load="lazy" width="80%" style="max-width:700px;" alt="${alt}"/> <figcaption style='font-style: italic;'>${alt}</figcaption>`;
                }
                if (mime.startsWith('audio/')) {
                    return `<audio src="${s}" controls/>`
                }
                if (mime.startsWith('video/')) {
                    return `<video src="${s}" controls preload="none" loop style="max-height:700px;max-width:700px"/>`
                }
                return s;
            }
        }
    }
    private createPrefix(prefix: string, elemTag: string, attr?: string): MarkdownProcessor {
        return {
            check: s => s.startsWith(prefix),
            parse: s => {
                s = trimStart(s, prefix);
                s = s.trim();
                return `<${elemTag} ${attr ? attr : ''}>${s}</${elemTag}>`;
                // return `<a class="plainlink" href="#${encodeURIComponent(s)}"><${elemTag}>${s}</${elemTag}></a>`;
            }
        };
    }
    convert(content: string): MarkdownArticle {
        let v: MarkdownArticle = {
            id: '',
            title: '',
            cover: '',
            keywords: [],
            from: '',
            author: '',
            publishTime: '',
            content: '',
            relatedArticles: [],
            previousArticle: null,
            nextArticle: null,
            children: [],
            headers: {},
        };
        if (content.startsWith('---\n')) {
            content = trimStart(content, '---\n');
            let headers = subBefore(content, '---\n', '');
            content = subAfter(content, '---\n', content);

            let lines = headers.split('\n');
            for (let l of lines) {
                if (!l) {
                    continue;
                }
                let { key, value } = this.parseHeader(l);
                v.headers[key] = value;
            }

            // parse
            v.id = v.headers['id']
            v.title = v.headers['title']
            v.cover = v.headers['cover']
            v.keywords = this.parseKeywords(v.headers['keywords'])
            v.from = v.headers['from'];
            v.author = v.headers['author'];
            v.publishTime = v.headers['publishTime'];
            v.relatedArticles = this.parseArticleLinks(v.headers['related']);
            v.previousArticle = this.parseArticleLink(v.headers['prev']);
            v.nextArticle = this.parseArticleLink(v.headers['next'])
            v.children = this.parseArticleLinks(v.headers['children']);
        }

        let lines = content.split('\n');
        let renderred = '';
        let lastLineIsEmpty = false;
        for (let line of lines) {
            if (!line) {
                if (lastLineIsEmpty && !renderred.endsWith('<br/>\n')) {
                    renderred += '<br/>\n';
                }
                lastLineIsEmpty = true;
                continue;
            }
            lastLineIsEmpty = false;
            let isTitleLine = line.startsWith('#');

            let wrapped = false
            for (let pro of this.processors) {
                if (pro.check(line)) {
                    wrapped = true;
                    line = pro.parse(line);
                }
            }
            if (!line) {
                continue;
            }
            if (wrapped) {
                if (isTitleLine && !renderred.endsWith('<br/>\n')) {
                    renderred += '<br/>\n';
                }
                renderred += line + '\n';
                continue;
            }
            renderred += `<p>${line}</p>` + '\n';
        }
        v.content = renderred;
        return v;
    }

    private parseArticleLinks(v: string): MarkdownArticle[] {
        if (!v) {
            return [];
        }
        v = v.replaceAll('，', ',');
        v = v.replaceAll('；', ',');
        v = v.replaceAll(';', ',');
        let vs = v.split(',');
        let out: MarkdownArticle[] = [];
        for (let v of vs) {
            let item = this.parseArticleLink(v);
            if (!item) {
                continue;
            }
            out.push(item);
        }
        return out;
    }

    private parseArticleLink(l: string): MarkdownArticle | null {
        if (!l) {
            return null;
        }
        let title = subBefore(l, '|', l);
        let id = subAfter(l, '|', title);
        return {
            id: id,
            title: title,
            cover: '',
            keywords: [],
            from: '',
            author: '',
            publishTime: '',
            content: '',
            relatedArticles: [],
            previousArticle: null,
            nextArticle: null,
            children: [],
            headers: {},
        }
    }

    private parseKeywords(v: string | null | undefined): string[] {
        if (!v) {
            return [];
        }
        v = v.replaceAll('，', ',');
        v = v.replaceAll('；', ',');
        v = v.replaceAll(';', ',');
        return v.split(',');
    }

    private parseHeader(l: string): { key: string, value: string } {
        let kv = { key: '', value: '' };
        l = l.replaceAll('：', ':');
        if (l.indexOf(':') > -1) {
            kv.key = subBefore(l, ':', '');
            kv.value = subAfter(l, ':', l);
            kv.key = trimBoth(kv.key, ' ');
            kv.value = trimBoth(kv.value, ' ');
        }
        return kv;
    }
}

interface MarkdownProcessor {
    check: (s: string) => boolean,
    parse: (s: string) => string,
}
export interface MarkdownArticle {
    id: string,
    title: string,
    cover: string,
    keywords: string[],
    from: string,
    author: string,
    publishTime: string,
    content: string,
    relatedArticles: MarkdownArticle[],
    previousArticle: MarkdownArticle | null,
    nextArticle: MarkdownArticle | null,
    children: MarkdownArticle[],
    headers: Record<string, string>,
}
export async function loadMarkdownFile(dst: string): Promise<MarkdownArticle> {
    dst = trimEnd(dst, '.md')
    dst = trimEnd(dst, '.html')
    const content = (await readFile(dst + '.md')).toString();
    let c = new MarkdownConverter();
    return c.convert(content);
}
export async function loadMarkdownDir(dir: string): Promise<MarkdownArticle[]> {
    let list = await readdir(dir);
    let out: MarkdownArticle[] = [];
    let converter = new MarkdownConverter();
    for (let item of list) {
        const dst = join(dir, item);
        const info = await stat(dst);

        let id = trimEnd(item, '.md');
        if (info.isDirectory()) {
            let children = await loadMarkdownDir(dst);
            out.push({
                id: id,
                title: id,
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
            })
            continue;
        }

        if (!item.endsWith('.md')) {
            continue;
        }
        //content
        let content = (await readFile(dst)).toString();
        let v = converter.convert(content);
        if (!v.id) {
            v.id = id;
        }
        if (!v.title) {
            v.title = id;
        }
        out.push(v);
    }
    return out;
}