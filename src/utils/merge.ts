import { isObject, isString } from "./defined";

export function mergeWith(target: object, ...args: object[]) {
  args.forEach((arg) => {
    target = mergeTo(target, arg);
  });

  return target;
}

export function mergeTo(target: object, other: object) {
  for (const key in other) {
    // 当key在target原对象中也存在
    if (key in target) {
      /*
      优先级:target > other
      1.都为字符串：替换
      2.target字符串，other对象：不变
      3.target为对象，other为字符串：不变
      4.target为对象，other为对象：替换
      */
      if (isString(target[key])) {
        if (isString(other[key])) {
          target[key] = other[key];
        }
      } else {
        if (isObject(target[key])) {
          if (isObject(other[key])) {
            mergeTo(target[key], other[key]);
          }
        }
      }
    } else {
      target[key] = other[key];
    }
  }
  return target;
}
