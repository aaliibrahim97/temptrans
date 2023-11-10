# ATLP Filter
ATLP filter is a component can be used cross all ATLP streems, this components contains many features such as:
* Apply Filter.
* Get saved filters.
* Recent Filters.
* Clear Filters.
* Delete Saved Filter.
* Apply Saved Filter.

## How to use
Include in your html component: 

```html
<atlp-filter>
    // the form below should not have search button
    <my-search-form></my-search-form>
</atlp-filter>
```
## Input Parameters
* <b>Title</b>:
input tag is <b>title</b> , it can be used as static value or parameter value as following:
```html
<atlp-filter title='Search Component'> or <atlp-filter [title]='searchTitle'>
.
.
.
``` 
<p>and this is will reflect in the title of the component.</p>
![Image of Filter Title](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/raw/dev/docs/images/filter-title.PNG)

## Output Parameters

- onSearch: output parameter to perform custom action on search click

```html
<atlp-filter (onSearch)='search()'>
````

- onSaveSearch: action to be performed on click of save search button
```html
<atlp-filter (onSaveSearch)='saveSearch()'>
````

- onSelectFilter: action to be performed on filter selection
```html
<atlp-filter (onSelectFilter)='selectFilter($event)'>
````

```javascript
selectFilter(filter){
   // selected filter is received in the parameters
}
```
