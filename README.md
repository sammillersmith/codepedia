# Codepedia

Describe coding concepts in a variety of ways

Link: https://codecademy.github.io/codepedia/

## Adding a new concept

1. Create a folder for the concept in `codepedia`
1. Update `map.json` to include the phrase that should lead to that concept
1. Create a file in said folder with the format `[folder_name].md`.
1. For language specific files, name them as `[folder_name].[language_file_suffix].md`

## Running locally

`yarn start` is currently broken; here's a workaround to test locally

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
1. `cd` to the `docs` folder
1. Run `yarn build` (to just compile) or `yarn build -w` (to watch for any changes)
1. Right click `index.html` in VS Code and choose to open with Live Server
1. Navigate to `localhost:5500` to see the local codepedia

## Commiting development changes

1. Run `yarn build` in the docs folder to generate the compiled files
1. Commit all files that changed, including the `dist` folder
