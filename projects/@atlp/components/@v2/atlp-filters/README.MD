# ATLP Filter

<!-- vscode-markdown-toc -->
* 1. [How to use](#Howtouse)
* 2. [Input Parameters](#InputParameters)
* 3. [Output Parameters](#OutputParameters)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->


# Introduction

ATLP filter is a component can be used cross all ATLP streems, this components contains many features such as:
* Apply Filter.
* Get saved filters.
* Recent Filters.
* Clear Filters.
* Delete Saved Filter.
* Apply Saved Filter.

##  1. <a name='Howtouse'></a>How to use
Include in your html component: 

```html
 <atlp-filters-v2
        [dataType]="'service'"
        title="{{ 'FILTER' | translate }}"
        [service]="atlpFilterService"
        [key]="atlpDemoFilterKey"
        [isTwoColumnLayout]="false"
      >
        <sample-service-filter-content
          [source]="_atlpDemoSampleServiceTableDataService"
          class="filter-body"
          (onCloseSelection)="closeSelection()"
        ></sample-service-filter-content>
      </atlp-filters-v2>
```
##  2. <a name='InputParameters'></a>Input Parameters
* <b>Title</b>:
input tag is <b>title</b> , it can be used as static value or parameter value as following:

* <b>Title</b>:
input tag is <b>title</b> , it can be used as static value or parameter value as following:

* <b>savedFiltersData</b>: the list of data provided by user for saved filters list, the interface type provided below

```javascript

const savedFiltersData = AtlpSavedFilter[];

export interface AtlpFilterModel {
  filterBy: string;
  displayName?: string;
  filterType: string; //equal, contains, greater than, less than,
  value: any;
  originalVal?: any;
}

export interface AtlpSavedFilter {
  id?: string;
  filterName: string;
  filterTypeName: string;
  searchDate?: string;
  filters: AtlpFilterModel[];
}

```

* <b>source</b>: the angular service for atlp filter


##  3. <a name='OutputParameters'></a>Output Parameters

- onSearch: output parameter to perform custom action on search click

- onSaveSearch: action to be performed on click of save search button

- onSelectFilter: action to be performed on filter selection

- onResetFilter: action to be performed on filter reset



# Important Note:
The documentation provided above is not final and developed based on the best assumptions, feel free to contact **ATLP Core Shared Team** for any suggestions to make it better or fix any issues