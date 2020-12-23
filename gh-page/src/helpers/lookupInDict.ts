export const lookupValue = (
  dict: Record<string, string | string[]>,
  val?: string
) => {
  if (!val) {
    return "";
  }
  for (let key of Object.keys(dict)) {
    if (dict[key] === val) {
      return key;
    }
    if (dict[key] instanceof Array) {
      if (dict[key].includes(val)) {
        return key;
      }
    }
  }
  return val;
};
