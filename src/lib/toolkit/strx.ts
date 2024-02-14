
export function subBefore(s: string, sep: string, def: string): string {
    for (var i = 0; i <= s.length - sep.length; i++) {
        if (s.substring(i, i + sep.length) == sep) {
            return s.substring(0, i)
        }
    }
    return def
}

export function subAfter(s: string, sep: string, def: string): string {
    for (var i = 0; i <= s.length - sep.length; i++) {
        if (s.substring(i, i + sep.length) == sep) {
            return s.substring(i + sep.length)
        }
    }
    return def
}

export function subBeforeLast(s: string, sep: string, def: string): string {
    if (sep.length >= s.length) {
        return def;
    }
    for (var i = s.length - sep.length; i > -1; i--) {
        if (s.substring(i, i + sep.length)) {
            return s.substring(0, i);
        }
    }
    return def;
}

export function subAfterLast(s: string, sep: string, def: string): string {
    if (sep.length >= s.length) {
        return def;
    }
    for (var i = s.length - sep.length; i > -1; i--) {
        if (s.substring(i, i + sep.length) === sep) {
            return s.substring(i + sep.length);
        }
    }
    return def;
}
export function trimEnd(s: string, sep: string): string {
    if (s.endsWith(sep)) {
        return s.substring(0, s.length - sep.length)
    }
    return s;
}

export function trimStart(s: string, sep: string): string {
    if (s.startsWith(sep)) {
        return s.substring(sep.length)
    }
    return s;
}

export function trimBoth(s: string, sep: string): string {
    return trimStart(trimEnd(s, sep), sep)
}

export function toMimeType(s: string): string {
    let ext = subAfterLast(s, '.', '');
    switch (ext) {
        case "html":
        case "css":
        case "csv":
        case "htm":
        case "xml": return "text/" + ext;
        case 'avif':
        case "jpeg":
        case "png":
        case "jpg":
        case "bmp":
        case "gif":
        case "tiff":
        case "webp":
            return "image/" + ext;
        case "aac":
        case "opus":
        case "wav":
            return "audio/" + ext;
        case "webm":
        case "mp4":
        case "flv":
        case "amv":
        case "wmv":
        case "mov":
        case "rmvb":
        case "mtv":
        case "dat":
        case "dmv":
            return "video/" + ext;
        case "json":
        case "pdf":
        case "php":
        case "rtf":
        case "zip":
            return "application/" + ext;
        case "csh":
        case "sh":
        case "tar":
            return "application/x-" + ext;
        case "otf":
        case "ttf":
        case "woff":
        case "woff2": return "font/" + ext;
        case "js":
        case "mjs": return "text/javascript";
        case "abw": return "application/x-abiword";
        case "avi": return "video/x-msvideo";
        case "arc": return "application/x-freearc";
        case "azw": return "application/vnd.amazon.ebook";
        case "bin": return "application/octet-stream";
        case "bz": return "application/x-bzip";
        case "bz2": return "application/x-bzip2";
        case "gz": return "application/gzip";
        case "epub": return "application/vnd.ms-fontobject";
        case "doc": return "application/msword";
        case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case "eot": return "application/vnd.ms-fontobject";
        case "ico": return "image/vnd.microsoft.icon";
        case "ics": return "text/calendar";
        case "jar": return "application/java-archive";
        case "jsonld": return "application/ld+json";
        case "mid": return "audio/midi";
        case "midi": return "audio/x-midi";
        case "mp3": return "audio/mpeg";
        case "mpeg": return "video/mpeg";
        case "mpkg": return "application/vnd.apple.installer+xml";
        case "odp": return "application/vnd.oasis.opendocument.presentation";
        case "ods": return "application/vnd.oasis.opendocument.spreadsheet";
        case "odt": return "application/vnd.oasis.opendocument.text";
        case "oga": return "audio/oga";
        case "ogv": return "video/ogg";
        case "ogx": return "application/ogg";
        case "ppt": return "application/vnd.ms-powerpoint";
        case "pptx": return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        case "rar": return "application/x-rar-compressed";
        case "svg": return "image/svg+xml";
        case "swf": return "application/x-shockwave-flsh";
        case "tif": return "image/tiff";
        case "ts": return "video/mp2t";
        case "vsd": return "application/vnd.visio";
        case "weba": return "audio/webm";
        case "xhtml": return "application/xhtml+xml";
        case "xls": return "application/vnd.ms-excel";
        case "xlsx": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        case "xul": return "application/vnd.mozilla.xul+xml";
        case "3gp": return "video/3gpp";
        case "3g2": return "video/3gpp2";
        case "7z": return "application/x-7z-compressed";
        case "apk": return "application/vnd.android.package-archive";
        default:
            return "text/plain";
    }
}