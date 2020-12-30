const fs = require('fs');
const { Builder } = require('xml2js');
const { loadMap, getFileDir, getFileUrl, getMetaDir, getMetaUrl } = require('./shared');

const SRC_PATH = "./codepedia/byConcept"

const getLanguageName = (languageId, map) => {
    const languages = Object.keys(map.languages);
    for (let l of languages) {
        if (map.languages[l] === languageId) {
            return l
        }
    }
    return languageId;
}

const getConceptName = (conceptId, map) => {
    const concepts = Object.keys(map.concepts);
    for (let c of concepts) {
        if (map.concepts[c].indexOf(conceptId) !== -1) {
            return c;
        }
    }
    return conceptId;
}

const getFolders = async () => {
    const out = [];
    const folders = await fs.promises.opendir(SRC_PATH);
    for await (const folder of folders) {
        if (folder.isDirectory()) {
            out.push(folder);
        }
    }
    return out;
}

const getFiles = async (folder) => {
    const out = [];
    const files = await fs.promises.opendir(`${SRC_PATH}/${folder.name}`);
    for await (const file of files) {
        out.push(file.name)
    }   
    return out;
}

const copyFile = async (folder, file, map) => {
    let languageId = "";
    let languageName = ""
    let language = "_"


    const namePieces = file.split(".");

    if (namePieces[1] !== "md") {
        languageId = namePieces[1];
        languageName = getLanguageName(languageId, map)
        language = languageName.replace(/ /g, "-").toLowerCase();
    }
    const concept = folder;

    const targetUrl = getFileDir(language, concept)
    await fs.promises.mkdir(targetUrl, { recursive: true })
    await fs.promises.copyFile(`${SRC_PATH}/${folder}/${file}`, getFileUrl(language, concept));

    const conceptName = getConceptName(folder, map);

    const data = {
        title: conceptName,
        description: "",
        language: languageName,
        concept: concept,
        keywords: [languageId, language, languageName, concept, conceptName],
        path: getFileUrl(language, concept, true)
    }

    await fs.promises.mkdir(getMetaDir(language, concept), { recursive: true })
    await fs.promises.writeFile(
        getMetaUrl(language, concept), 
        JSON.stringify(data, null, 2)
    );
}

const _init = async () => {
    const map = await loadMap();

    const folders = await getFolders();
    for (let folder of folders) {
        const files = await getFiles(folder);
        for (let file of files) {
            copyFile(folder.name, file, map);
        }
    }
}

_init();