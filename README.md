INCENTIVE GAMES

# Common utilities components for FrontEnd applications.


## Launching the library:

The common component library can be launched as a stand-alone project using storybook. When launched, it will run on port **6006**. To start the project with storybook, run the command:
 > npm run storybook

## Building locally:

If you need to build the library locally, run the command:
> npm run-script build

## Importing components into other projects:

In order to import a component from the **ig-component-common** library, you'll need to target the bundled index file containing all of the components. This file is created after the library is build using GitHub actions. The following syntax will allow you to import components:

```javascript
import { <ComponentName> } from '@incentivegames/ig-component-common/lib/index';
```
## Adding new components

In order to add a new component, the first step is to navigate to the **src/components** folder and create the folder for the new component. 

The name of the component folder itself must be in camelcase starting with a capital letter. Inside the folder create two **.tsx** files, one called **index.tsx** which will contain the actual component code and one file named as the component but with a suffix of **stories**. 

Example:
```javascript
MyExampleComponent.stories.tsx
```

Inside the _story_ component file, you will need to add a default export containing the two attributes **title** and **component**. 

Example:

```javascript
export default {
    title: 'My Example Component',
    component: MyExampleComponent
  };
  ```

Another important thing to add are the arguments passed to the component which will be reflected inside the storybook. 

Example:

```javascript
 MyExampleComponent.args = {
    displayText: 'Welcome to My Example Component',
    textColour: '#DCDCDC',
    fontFamily: 'Monserrat',
    fontSize: '12px',
  };
  ```

For more details on how to build a story and use Storybook, [check out the official documentation](https://storybook.js.org/docs/react/writing-stories/introduction).
## Using the library entry point:

Since the library is bundled using *rollup*, it needs ot have an entry point when exporting separate components. Whenever a new component is created, it needs to be exported inside the **index.ts** file located in the root of the **src** folder. Using the following sintax will suffice:

```javascript
export { <ComponentName> } from './components/<ComponentName>/';
```
## Using the Loading component:

The Loading component has multiple type of Loading included and all of them is created in a way that it's easy to overwrite basic stylings on them to match each project's/client's needs. Or even create a custom Loading component. The project can be run locally to see working examples of loading. See more information and code examples below:

- **loadingType** -> is a required prop for this component and **LoadingType** enum has to be used for it's value from **ig-types** repo
### Default type of loading:

It has two optional props: 

- **loadingText** -> that has to be type of string used to display the text under the animation. It defaults to 'Loading...'
- **loadingIconType** -> that is type of ```LoadingIconType``` from ig-types. If none given ```LoadingType.football``` is being used. If one wishes to extend this a new value needs to be added to ```LoadingIconType``` enum in ig-types and the new icon needs to be added to ```icons-sprites.svg``` in this repo. 

```jsx
import { <Loading> } from './components/<ComponentName>/';
import { LoadingType } from '@incentivegames/ig-types/lib/enums/loading/loading';

<Loading loadingType={LoadingType.default} />
// OR
<Loading loadingType={LoadingType.default} loadingText='Custom text' />
// OR
<Loading loadingType={LoadingType.default} loadingIconType={LoadingIconType.basketball} />
```
### Loading simple:

It has no possible props and only its style can be changed by overwriting its CSS.

```jsx
import { <Loading> } from './components/<ComponentName>/';
import { LoadingType } from '@incentivegames/ig-types/lib/enums/loading/loading';

<Loading loadingType={LoadingType.simple} />
```
### Loading spinner:

Just as LoadingSimple has no possible props and only its style can be changed by overwriting its CSS.

```jsx
import { <Loading> } from './components/<ComponentName>/';
import { LoadingType } from '@incentivegames/ig-types/lib/enums/loading/loading';


<Loading loadingType={LoadingType.spinner} />
```
### Loading custom:

It doesn't have any props neither any base styling applied, however it expects children nodes. If the default HTML elements are enough styling can be added on the project level. The other option is to pass down custom children elements and add styling to it while we keeping the <Loading /> components consistent throughout projects.

```jsx
import { <Loading> } from './components/<ComponentName>/';
import { LoadingType } from '@incentivegames/ig-types/lib/enums/loading/loading';


<Loading loadingType={LoadingType.custom} />

<Loading loadingType={LoadingType.custom} />
  <div class='custom-class'>Custom content</div>
</Loading>
```

## VERSIONING

We are using semantic versioning with MAJOR.MINOR.PATCH.

The official descriptions are as follows:

 - MAJOR version when you make incompatible API changes.
 - MINOR version when you add functionality in a backwards compatible manner.
 - PATCH version when you make backwards compatible bug fixes.
By default, when you merge a branch into master the patch version is increased by one.

If we are adding new functionality or making an incompatible change, we need to manually change the version.

Here are some examples:

 - A variable was named incorrectly and it is causing a bug: In this case we do nothing, the auto PATCH is enough.

 - Add an extra field to the returned object from a function: Even though this is not a bug, we used to release this as a PATCH version, so it is fine to continue like that.

 - Add a completely new function: Manually change MINOR.

 - Change the name of a function: Manually change MAJOR. This would break games where we are using this function.