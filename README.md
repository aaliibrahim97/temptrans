# Atlp Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

# Info

ATLP Portal Repository :
This workspace contains ATLP landing portal with common navigation and sub applications with seperate navigation.

# Code Formatter

Use VS code extension: Prettier - Code formatter

# Development server

Examples:
Run below commands for a dev server. Navigate to `http://localhost:{port}/`. The app will automatically reload if you change any of the source files.  
 a. `npm run start:atlp-landing-ui` Navigate to `http://localhost:4000`  
 b. `npm run start:atlp-air-ui` Navigate to `http://localhost:4100`  
 c. `npm run start:atlp-ecz-ui` Navigate to `http://localhost:4200`  
 d. `npm run start:atlp-lba-ui` Navigate to `http://localhost:4300`  
 e. `npm run start:atlp-reg-ui` Navigate to `http://localhost:4400`  
 f. `npm run start:atlp-sea-ui` Navigate to `http://localhost:4500`  
 g. `npm run start:atlp-umg-ui` Navigate to `http://localhost:4600`  
 h. `npm run start:atlp-iac-ui` Navigate to `http://localhost:4700`

# Code scaffolding

## To create project outer config

```
ng new atlp-portal --new-project-root projects --create-application false --style scss
```

### To create inner application

```
ng g application atlp-iac-ui --style scss --routing true
```

#### To create library project

```
ng g lib atlp-iac-shared-lib
```

##### To create Module

```
ng g m ../../complementary-service --project=atlp-iac-ui --routing true --routing-scope Child
```

###### To create Component

```
ng g c ../../complementary-service/duty-refund-list --module complementary-service --project=atlp-iac-ui --selector iac-duty-refund-list --style scss
or
npx ng generate @schematics/angular:component widget-chooser --path=C:\ADPorts\Git\atlp-portal-ui\projects\atlp-iac-ui\projects\iac-dec-ui\src\modules\complimentary --no-interactive

```

# Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
eg: `npm run test:atlp-lba-ui`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Development Setup

Clone the parent project and after cloning, please open submodule batch commands folder [from here](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/tree/dev/SubModule-BatchCommands), or from the links below seperatly.

### Here you can find all the commands seperatly for each sub project

- [All ATLP Submodules](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-all-submodules.bat)
- [ATLP Air Only](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-air.bat)
- [ATLP Air Service Provider Only](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-air-sp.bat)
- [ATLP Air and Service Provider Both](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-air-sp-both.bat)
- [ATLP Ec0nomic Zone](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-ecz.bat)
- [ATLP IAC](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-iac.bat)
- [ATLP Landing](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-landing.bat)
- [ATLP LBA](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-lba.bat)
- [ATLP REG](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-reg.bat)
- [ATLP SEA](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-sea.bat)
- [ATLP UMG](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/blob/dev/SubModule-BatchCommands/atlp-umg.bat)

Once the batch file is downloaded, copy to the parent project and run the batch file.
This is will run the git commands and download the relevant sub module/project.

# Atlp portal project sub modules details

You can also manually run the command inorder to clone the submodule(s)

- Step 1: Go to parent project folder
- Step 2: `git submodule init` run only once
- Step 3: Then run the following command to load the sub module(s)/project(s)

```
git submodule update -–remote projects/{sub project folder name}
```

```
git submodule update --remote projects/atlp-lba-ui - For LBA
```

```
git submodule update --remote projects/atlp-iac-ui - For IAC
```

```
git submodule update --remote projects/atlp-ecz-ui - For Economic Zone
```

To Download complete sub modules (developers having access)

```
git submodule update --remote
```

### To get submodule recursirecursivily

```
`git submodule update --init --recursive`
`git submodule update --recursive`
```

### To add new submodules

```
git submodule add <remote git url>https://repo/details
```

### To remove submodule example

```
git submodule deinit projects/atlp-lba-ui
git rm projects/atlp-lba-ui
git commit-m "Removed submodule"
rm -rf .git/modules/projects/atlp-lba-ui
```

### Add submodule to local git

```
git submodule update --init --remote <folder path>projects/atlp-epass-ui
```

### to avoid long path issue

```
git config --system core.longpaths true
```

## Commit format for contributers (husky)

eg: type: your commit message

- type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

- type meanings

```
{
	description: "Select the type of change that you're committing",
	enum: {
		feat: {
			description: 'A new feature',
			title: 'Features',
			emoji: '✨',
		},
		fix: {
			description: 'A bug fix',
			title: 'Bug Fixes',
			emoji: '🐛',
		},
		docs: {
			description: 'Documentation only changes',
			title: 'Documentation',
			emoji: '📚',
		},
		style: {
			description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
			title: 'Styles',
			emoji: '💎',
		},
		refactor: {
			description: 'A code change that neither fixes a bug nor adds a feature',
			title: 'Code Refactoring',
			emoji: '📦',
		},
		perf: {
			description: 'A code change that improves performance',
			title: 'Performance Improvements',
			emoji: '🚀',
		},
		test: {
			description: 'Adding missing tests or correcting existing tests',
			title: 'Tests',
			emoji: '🚨',
		},
		build: {
			description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
			title: 'Builds',
			emoji: '🛠',
		},
		ci: {
			description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
			title: 'Continuous Integrations',
			emoji: '⚙️',
		},
		chore: {
			description: "Other changes that don't modify src or test files",
			title: 'Chores',
			emoji: '♻️',
		},
		revert: {
			description: 'Reverts a previous commit',
			title: 'Reverts',
			emoji: '🗑',
		}
	}
}
```

## Build status and web pack bundle analyzer check

1. Build status for individual projects

```
npm run build-prod-stats --projects air-sp-ui

```

2. Build report for individual projects

```
npm run bundle-report-args -- dist/en/air-sp-ui/en/stats.json

```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the below.

1. [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
2. [Monorepo Pattern: Setting up Angular workspace for multiple applications in one single repository](https://kgotgit.medium.com/monorepo-pattern-setting-up-angular-workspace-for-multiple-applications-in-one-single-repository-4e14bc0d0cc0) Page.

# Common Components under @atlp folder

Full descriptions in the wiki of the project
[Wiki Link](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/wikis/home)
