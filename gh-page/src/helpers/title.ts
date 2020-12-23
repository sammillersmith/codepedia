export const toTitleCase = (ipt: string) => {
  const pieces = ipt.split(" ");
  const out = [];
  for (let pc of pieces) {
    const word = pc[0].toUpperCase() + pc.substr(1);
    out.push(word);
  }
  return out.join(" ");
};
