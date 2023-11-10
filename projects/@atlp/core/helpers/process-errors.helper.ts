export function processErrors(errorList: any) {
    let concatenatedErrorMessage = "";
    errorList?.forEach((val) => {
      if (val.value != null && val.value != "") {
        concatenatedErrorMessage =
          concatenatedErrorMessage.concat(val.error + "(" + val.value + ")") +
          " ,";
      } else {
        concatenatedErrorMessage =
          concatenatedErrorMessage.concat(val.error) + " ,";
      }
    });
    return concatenatedErrorMessage?.substring(
      0,
      concatenatedErrorMessage.length - 1
    );
  }