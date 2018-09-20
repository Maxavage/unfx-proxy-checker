export const getLinesCount = content =>
    content
        .split(/\r\n|\r|\n/)
        .length.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const getContentSize = content => {
    let size = content.length;

    for (let i = content.length - 1; i >= 0; i--) {
        const code = content.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) size++;
        else if (code > 0x7ff && code <= 0xffff) size += 2;
        if (code >= 0xdc00 && code <= 0xdfff) i--;
    }

    const result = size / 1024;

    if (result >= 1024) {
        return `${(result / 1024).toFixed(2)} MB`;
    } else {
        return `${result.toFixed(2)} KB`;
    }
};