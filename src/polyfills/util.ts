export function inherits(ctor: any, superCtor: any) {
  if (superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
}

export function debuglog() {
  return () => {};
}

export function inspect(obj: any) {
  return JSON.stringify(obj);
}

export function deprecate(fn: Function) {
  return fn;
}

export function promisify(fn: Function) {
  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      fn(...args, (err: any, res: any) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };
}

export default {
  inherits,
  debuglog,
  inspect,
  deprecate,
  promisify
};
