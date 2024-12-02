interface Taxonomy {
    id: string,
    title: string,
    slug: string,
    url: string,
    permalink: string,
    api_url: string,
    media: Medium[]
}

interface Medium {
    id: string,
    image: string,
    video: string,
    title: string,
    slug: string,
    media_type: Taxonomy[]
}

const utils = {
    chunkify(items: Medium[], cols: number, balanced: boolean): Medium[][] | undefined {
        if (cols < 2)
            return [items];

        var len = items.length,
            out = [],
            i = 0,
            size;

        if (len % cols === 0) {
            size = Math.floor(len / cols);
            while (i < len) {
                out.push(items.slice(i, i += size));
            }
        }
        else if (balanced) {
            while (i < len) {
                size = Math.ceil((len - i) / cols--);
                out.push(items.slice(i, i += size));
            }
        }
        else {
            cols--;
            size = Math.floor(len / cols);
            if (len % size === 0)
                size--;
            while (i < size * cols) {
                out.push(items.slice(i, i += size));
            }
            out.push(items.slice(size * cols));
        }
        if (out.length < (cols + 1)) {
            let difference = (cols + 1) - out.length;
            for (let i = 0, num = difference; i < num; i++) {
                out.push([])
            }
        }
        if (out.length >= (cols + 1)) {
            return out;
        }
    }
}

export default utils