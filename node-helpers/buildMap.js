/**
 * Build Map
 * ----------------------------------------------------------------------------
 * This file loops through all of the folders in `codepedia/entries` and uses 
 * the `_meta` folder within to generate a single collection of all of the meta
 * documents. It will run on every `yarn start`, but any changes made to the 
 * meta fields for a particular entry will need to re-run this in order to get
 * the updated version running locally
 * 
 * @version 1.0
 */

const fs = require('fs');
const { ENTRY_PATH: PATH, titleCase, getFileUrl, getMetaUrl } = require('./shared');

const getFilePaths = async () => {
    
    const out = [];
    try {

        // ==> loop through each of the languages
        const dir = await fs.promises.opendir(PATH);
        for await(const dirent of dir) {
            if (!dirent.isDirectory()) { continue; }

            // loop through the concepts in that langauge
            const innerDir = await fs.promises.opendir(`${PATH}/${dirent.name}`)
            for await (const file of innerDir) {
                if (file.isDirectory()) { continue; }
                out.push([dirent.name, file.name])
            }
        }
    } catch (e) {
        console.log(e)
    } finally {
        return out;
    }
}

const loadFileDetails = async (folder, filename) => {

    const fnamePieces = filename.split(".");
    const concept = fnamePieces[0];
    const language = folder;

    const fPath = getFileUrl(language, concept);
    const metaPath = getMetaUrl(language, concept);

    const strippedFName = titleCase(concept);

    const out = {
        path: fPath,
        keywords: [],
        title: strippedFName,
        description: "",
        concept: strippedFName,
        language: titleCase(folder)
    };

    try {
        const file = await fs.promises.readFile(metaPath, 'utf8');
        const metaDetails = JSON.parse(file);
        return metaDetails;
    } catch (e) {
        console.error(e)
        return out;
    }
}

const writeFile = async (map) => {
    await fs.promises.writeFile(`${PATH}/map.json`, JSON.stringify(map, null, 2))
}

const _init = async () => {
    const map = [];
    
    // TODO: generate a collection of keywords as part of this 
    //       file generation as well; save time on the client
    //       when trying to find those keywords
    const files = await getFilePaths();
    for (let fPair of files) {
        map.push(await loadFileDetails(fPair[0], fPair[1]));
    }
    writeFile(map);
}

_init();