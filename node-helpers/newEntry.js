const fs = require('fs');
const { getFileDir, getMetaDir, getFileUrl, getMetaUrl } = require('./shared');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const helptext = (text) => {
    console.log("    ->", text, "\n")
}

const read = async (text, required) => {

    return new Promise((success) => {
        readline.question(text + " ", (resp) => {
            if (!required || resp) {
                success(resp);
            } else {
                console.warn("This field is required!\n")
                read(text, required).then(success)
            }
            
        })
    })
}

const collectDetails = async () => {
    const out = {
        title: "",
        description: "",
        keywords: [],
        language: "_",
        concept: ""
    }

    console.log("Please add some details about the entry you are adding:\n")
    console.log("(You can type '?' at any prompt to see more information. These can all be changed later)")

    out.concept = await collectConcept();
    out.language = await collectLanguage();
    out.title = await collectTitle();
    out.description = await collectDescription();
    out.keywords = await collectKeywords()

    return out;
}

const collectConcept = async () => {
    let concept = await read("    Concept:", true)
    if (concept === "?") { 
        helptext("The high-level idea that this entry will describe");
        concept = await collectConcept();
    }
    return concept.replace(/ /g, "-");
}

const collectLanguage = async () => {
    let language = await read("    Language (leave blank for language-agnostic):")
    if (language === "?") {
        console.log("    -> Current languages are:")

        const folder = await fs.promises.opendir(`./codepedia/entries`);
        for await (const f of folder) {
            if (f.isDirectory() && f.name !== "_") {
                console.log("      -", f.name)
            }
        }
        console.log("")

        language = await collectLanguage();
    }
    return language || "_";
}

const collectTitle = async () => {
    let title = await read("    Title:")
    if (title === "?") {
        helptext("The name that starts the file")
        title = await collectTitle();
    }
    return title;
}

const collectDescription = async () => {
    let description = await read("    Description:")
    if (description === "?") {
        helptext("A short description of the concept this entry covers; used for previews")
        description = await collectDescription();
    }
    return description;
}

const collectKeywords = async () => {
    let keywords = [];

    const joinedKeywords = await read("    Keywords (separated by commas):")
    if (joinedKeywords === "?") {
        helptext("A comma-delimited list of all of the keywords associated with this entry")
        keywords = await collectKeywords();
    } else {
        if (joinedKeywords) { keywords = joinedKeywords.split(",") }
    }
    
    return keywords;
}

const generateNewEntry = async (entryDetails) => {
    const { language, concept, title } = entryDetails;

    const path = getFileDir(language)
    const metaPath = getMetaDir(language)

    // ==> create the directories
    await fs.promises.mkdir(path, { recursive: true });
    await fs.promises.mkdir(metaPath, { recursive: true });

    // ==> create the actual files
    await fs.promises.writeFile(getFileUrl(language, concept), `# ${title || concept}`)
    await fs.promises.writeFile(
        getMetaUrl(language, concept), 
        JSON.stringify({ 
            ...entryDetails, 
            path: getFileUrl(language, concept, true)
        }, null, 2));

    // ==> tell the user of our success
    console.clear()
    console.log("Success! Your new entry was created at", getFileUrl(language, concept));
    console.log("(You can edit details about the entry in", getMetaUrl(language, concept), ")");
}

const _init = async () => {
    console.clear();
    const details = await collectDetails();
    readline.close();

    if (!details) { return }
    await generateNewEntry(details);
}

_init();