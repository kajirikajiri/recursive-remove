type Option = {
  removeOption?: {
    isFalseLike?: boolean;
    isEmptyArray?: boolean;
    isEmptyObject?: boolean;
  };
};

export const recursiveRemove = (target: any, option?: Option) => {
  const canRemove = generateCanRemove(option?.removeOption);
  if (canRecursive(target)) {
    recursive(target, canRemove);
  }
  return target;
};

const generateCanRemove = (option: Option["removeOption"]) => {
  if (option === undefined) return canRemoveDefault;

  const result: ((x: any) => boolean)[] = [];
  if (option.isFalseLike) {
    result.push(isFalseLike);
  }
  if (option.isEmptyArray) {
    result.push(isEmptyArray);
  }
  if (option.isEmptyObject) {
    result.push(isEmptyObject);
  }
  return (x: Array<[string, any]>) => {
    return result.some((f) => {
      return f(x[1]);
    });
  };
};

const canRemoveDefault = (_: any) => false;

const isFalseLike = (x: any) => {
  return !x;
};

const isEmptyArray = (x: any) => {
  if (!Array.isArray(x)) return false;
  if (x.length > 0) return false;
  return true;
};

const isEmptyObject = (x: any) => {
  if (!isObject(x)) return false;
  if (Object.keys(x).length > 0) return false;
  return true;
};

const isObject = (x: any) => {
  if (x === null) return false;
  if (typeof x !== "object") return false;
  if (Array.isArray(x)) return false;
  return true;
};

const canRecursive = (x: any): x is { [x: string | number]: any } => {
  if (x === null) return false;
  if (typeof x !== "object") return false;
  return true;
};

const recursive = (
  arg: {
    [x: string]: any;
    [x: number]: any;
  },
  canRemove: (x: any) => boolean
) => {
  Object.values(arg).forEach((v) => {
    if (canRecursive(v)) {
      recursive(v, canRemove);
    }
  });
  const loop = true;
  while (loop) {
    const a = Object.entries(arg).find((x) => {
      return canRemove(x);
    });
    if (!Array.isArray(a)) {
      break;
    } else {
      if (Array.isArray(arg)) {
        arg.splice(parseInt(a[0]), 1);
      } else {
        delete arg[a[0]];
      }
      continue;
    }
  }
};
