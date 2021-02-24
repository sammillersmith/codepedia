<div align="center">
  <h1>Codepedia 📕</h1>
  <strong>Documentation and glossary for popular programming languages.</strong><br>
  <strong>Built by the community. Maintained by Codecademy.</strong>
</div>
<br>

<<<<<<< HEAD
Welcome to the [Codepedia](https://codecademy.github.io/codepedia) codebase. We are so excited to have you. With your help, we can build out Codepedia’s content to better serve our learners.
=======
Community-driven code documentations and glossary for popular programming languages and frameworks. If you're interested in contributing, check out our [Contribution Guide](https://github.com/codecademy/codepedia/blob/main/contribute.md).
>>>>>>> kp-restructure


<<<<<<< HEAD
1. Create a folder for the concept in **codepedia** (i.e. **loops**).
2. Update **map.json** to include the phrase that should lead to that concept. (i.e. `"Loops": ["loops"]`)
3. Create a file in said folder with the format **[folder_name].md**. (i.e. **loops.md**)
4. For language specific files, name them as **[folder_name].[language_file_suffix].md** (i.e. **loops.py.md**)

## Running locally

1. `cd` to the **gh-page** folder
1. Run `yarn && yarn start`
=======
📕 https://codecademy.github.io/codepedia

## Running locally

1. Run `yarn install-all` to download all of the app's dependencies
1. Run `yarn start` in the root folder
>>>>>>> kp-restructure
1. Navigate to `localhost:5050` to see the local version of Codepedia

> If you're running locally and make changes to any file in a `_meta` folder, you
> will need to re-run the map generator (`yarn build:map`) in order to see those
> changes. There is no live-update version of this script (but you are welcome 
> to create one!)
## Adding a new concept

1. In the root folder, run `yarn new-entry`
1. Follow the prompts to create a new entry for a particular concept / language
1. Open up the Markdown (md) file that the tool generates for you
1. You should be able to see your new entry in the local version of Codepedia (you may need a refresh)
1. When ready to commit your changes, make sure to include the `[concept].md`, `_meta/[concept].json`, and `map.json` files that were changed