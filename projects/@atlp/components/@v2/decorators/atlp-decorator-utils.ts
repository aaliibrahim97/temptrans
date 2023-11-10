import { orderBy } from 'lodash';
import { atlpMethodFactory } from './atlp-decorator-factory';

export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

/** Usage.
  @sum
  public getSum () {
      return [1, 2, 3, 4, 5];
  }
  */
export function sum<T>(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<() => T[]> | TypedPropertyDescriptor<T[]>
) {
  return atlpMethodFactory<any>(sum.bind(sum), descriptor);
}

/** Usage.
   @arrayOrderBy("age", "desc")
    public getOrderBy () {
        return [{name: "Bob", age: 25}, {name: "Jane", age: 18}, {name: "Chris", age: 20}];
    }
  */
export function arrayOrderBy<T>(iteratees: string, orders?: string) {
  const i = iteratees.split(' ');
  const o = orders ? orders.split(' ') : undefined;
  return function (
    _target: any,
    _propertyKey: string,
    descriptor:
      | TypedPropertyDescriptor<() => T[]>
      | TypedPropertyDescriptor<T[]>
  ) {
    return atlpMethodFactory<any>(
      (arr: any[]) => orderBy.call(arrayOrderBy, arr, i, o),
      descriptor
    );
  };
}
