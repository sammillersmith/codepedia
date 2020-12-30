const fs = require('fs')

const SRC_PATH = "./codepedia/byConcept"
const ENTRY_PATH = "./codepedia/entries";

const titleCase = (name) => {
    const words = name.split(" ");
    const out = [];
    for (let w of words) {
        if (!w) {
            out.push(w);
            continue;
        }

        out.push(`${w[0].toUpperCase()}${w.substr(1)}`)
    }
    return out.join(" ");
}

const loadMap = async () => {
    const rawMap = await fs.promises.readFile(`${SRC_PATH}/map.json`, 'utf-8');
    const map = JSON.parse(rawMap);
    return map;
}

const getFileUrl = (language, concept, noPrefix) => {
    return `${getFileDir(language, noPrefix)}/${concept}.md`
}

const getFileDir = (language, noPrefix) => {
    const base = `codepedia/entries/${language}`;
    if (noPrefix) { return base }
    return `./${base}`
}

const getMetaUrl = (language, concept, noPrefix) => {
    return `${getMetaDir(language, noPrefix)}/${concept}.json`
}

const getMetaDir = (language, noPrefix) => {
    const base = `codepedia/entries/${language}/_meta`;
    if (noPrefix) { return base }
    return `./${base}`
}

module.exports = {
    ENTRY_PATH,
    titleCase,
    loadMap,
    getFileUrl,
    getFileDir,
    getMetaUrl,
    getMetaDir
}