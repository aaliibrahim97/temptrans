#ATLP Pagination

## Usage

Simple example:

```ts
  atlpInputPaginatorData: IAtlpInputPaginator = {  
                                                    currentPage: 1,
                                                    pageSize: 10,
                                                    totalCount: 1000,
                                                };

```

```html
   <ng-container *ngIf="dataSource.data?.length > 0">
      <atlp-pagination
        (changePage)="pageChange($event)"
        [atlpInputPaginator]="atlpInputPaginatorData"
       ></atlp-pagination>
    </ng-container>
```

## Output Parameters

- page change event: output function to redceive the page current index

```html
< <atlp-pagination
        (changePage)="pageChange($event)"
        [atlpInputPaginator]="atlpInputPaginatorData"
       ></atlp-pagination>
````

```ts
  pageChange(paginationResult: IAtlpPageResponseModel) {
    console.log(paginationResult.currentPage);
    // do your logic based on current page index
    );
  }
```
## DemosSample image.
![Image of Filter Title](http://10.0.131.131/atlp/atlp_ui/atlp-portal-ui/-/raw/dev/docs/images/atlp-pagination.PNG)

## Demos

1. http://10.0.131.21/ATLP/Main/LBAWeb/#/lba/appointments

# Important Note:
The documentation provided above are not final and developed based on the best assumptions, feel free to contact **Ajmal Salim** or **Linoy Pappachan Malakkaran** for any suggestions to make it better or fix any issues