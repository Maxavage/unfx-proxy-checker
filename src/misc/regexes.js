export const findProxies = str => str.match(new RegExp('[1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[:][1-9]?[0-9]{1,5}', 'g'));
export const findIPs = str => str.match(new RegExp('[1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}(?!/)', 'g'));
export const findIPsWithRanges = str => str.match(new RegExp('[1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[/][1-2]?[0-9]{2}', 'g'));
export const findScripts = str => str.match(new RegExp('<script.*?src="(.*?)"', 'gi'));

export const isIP = str => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(str);
export const isURL = str => /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(str);
export const isPath = str => /^[a-z]:((\/|(\\?))[\w .]+)+\.txt$/i.test(str);
