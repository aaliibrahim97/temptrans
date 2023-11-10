export class AtlpCheckHelper {
  public static isNull(item: any): boolean {
    if (item === undefined || item === null) {
      return true;
    }
    return false;
  }

  public static isNullOrEmpty(item: any): boolean {
    if (
      item === undefined ||
      item === null ||
      item == "" ||
      (this.isArray(item) && item.length === 0)
    ) {
      return true;
    }
    return false;
  }

  public static isArray(item: any): boolean {
    if (Array.isArray(item)) {
      return true;
    }
    return false;
  }

  public static hasKey(item: any, key: string): boolean {
    if (this.isNull(item)) {
      return false;
    }

    if (this.isArray(item) && item.length > 0) {
      return Object.keys(item[0]).indexOf(key) >= 0;
    }
    return Object.keys(item).indexOf(key) >= 0;
  }

  public static isObject(val): boolean {
    if (val === null) {
      return false;
    }
    return typeof val === "function" || typeof val === "object";
  }

  ValidateExclusiveArabic(value: string): string {
    if (!AtlpCheckHelper.isNullOrEmpty(value)) {
      var arregex =
        /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\u0660-\u0669|[\]?`',={}()\-.<>*!~;:@#+$%^&/\\"\s]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\u0660-\u0669-_\s]*$/;
      return arregex.test(value) ? value : "";
    }
    return value;
  }

  ValidateDateFormat(value: string): boolean {
    if (!AtlpCheckHelper.isNullOrEmpty(value)) {
      var arregex = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/;
      return arregex.test(value);
    }
    return false;
  }

  trim(object: object | string): string | object | null {
    if (!object) {
      return null;
    }
    if (typeof object == "string") {
      return object.trim();
    } else {
      const obj = object;
      Object.keys(obj).map(
        (k) =>
          (obj[k] =
            obj[k] && typeof obj[k] == "string" ? obj[k].trim() : obj[k])
      );
      return obj;
    }
  }

  public static IsNullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
  }

  toBoolean(value: string) {
    if (AtlpCheckHelper.IsNullOrUndefined(value)) {
      return false;
    }

    return value.toString().toLocaleLowerCase() === "true";
  }
}
