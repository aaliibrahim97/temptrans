import { debounce, delay, throttle } from 'lodash';
import { atlpMethodFactoryBind } from './atlp-decorator-factory';

export function atlpDebounceTimeDecorator<T>(
  wait: number,
  maxWait = wait * 4,
  leading = true,
  trailing = !leading
) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    return atlpMethodFactoryBind<any>(
      function (func: Function) {
        return debounce.call(this, func, wait, { maxWait, leading, trailing });
      },
      propertyKey,
      descriptor
    );
  };
}

export function delayTimeDecorator(wait: number) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    return atlpMethodFactoryBind<any>(
      function (func: Function) {
        return delay.call(this, func, wait);
      },
      propertyKey,
      descriptor
    );
  };
}

export function throttleTimeDecorator(
  wait: number,
  leading = true,
  trailing = !leading
) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    return atlpMethodFactoryBind<any>(
      function (func: Function) {
        return throttle.call(this, func, wait, { leading, trailing });
      },
      propertyKey,
      descriptor
    );
  };
}

export function tryCatch(
  _target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  const func = function (f: () => any) {
    return function (...a: any[]) {
      try {
        return f.apply(this, a);
      } catch (err) {
        console.log(
          `An error occurred on property "${propertyKey}".`,
          err.stack
        );
        return undefined;
      }
    };
  };

  if (!!descriptor.value) {
    descriptor.value = func(descriptor.value as any) as any;
  } else if (!!descriptor.get) {
    descriptor.get = func(descriptor.get);
  } else {
    throw new TypeError('Only put a decorator on a method or get accessor.');
  }
}

export function tryCatchAsync(errorHandlerFnName?: string) {
  return (
    _target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>
  ) => {
    let func = descriptor.value;

    if (!!descriptor.value) {
      descriptor.value = async function () {
        try {
          return await func.apply(this, arguments);
        } catch (err) {
          console.log(
            `An error occurred on property "${propertyKey}".`,
            err.stack
          );
          return errorHandlerFnName
            ? this[errorHandlerFnName].apply(this, arguments, err)
            : undefined;
        }
      };
    } else if (!!descriptor.get) {
      async () => {
        descriptor.get = await func(descriptor.get);
      };
    } else {
      throw new TypeError('Only put a decorator on a method or get accessor.');
    }
  };
}

// export function tryCatchWithCallBack(errorHandlerFnName?: string) {
//   return function (
//     _target: any,
//     propertyKey: string,
//     descriptor:
//       | TypedPropertyDescriptor<() => string>
//       | TypedPropertyDescriptor<string>
//   ) {
//     return tryCatchMethodFactory<any>(
//       descriptor,
//       propertyKey,
//       errorHandlerFnName
//     );
//   };
// }

// export function tryCatchMethodFactory<T>(
//   descriptor: TypedPropertyDescriptor<T>,
//   propertyKey: string,
//   errorHandlerFnName?: string
// ) {
//   const func = function (f: () => any) {
//     return function (...a: any[]) {
//       try {
//         return f.apply(this, a);
//       } catch (err) {
//         console.log(
//           `An error occurred on property "${propertyKey}".`,
//           err.stack
//         );
//         return errorHandlerFnName
//           ? this[errorHandlerFnName].apply(this, arguments)
//           : undefined;
//       }
//     };
//   };

//   if (!!descriptor.value) {
//     descriptor.value = func(descriptor.value as any) as any;
//   } else if (!!descriptor.get) {
//     descriptor.get = func(descriptor.get);
//   } else {
//     throw new TypeError("Only put a decorator on a method or get accessor.");
//   }
// }
