import { isValidForFilter } from "../filter";

const ENTRY = { language: "abc", concept: "xyz", mdBody: "" };
const LANGUAGES = { Language: "abc" };
const CONCEPTS = { Concept: ["xyz"] };
describe("basic filter tests", () => {
  it("filters out non matches", () => {
    const out = isValidForFilter(ENTRY, "def", LANGUAGES, CONCEPTS);
    expect(out).toBeFalsy();
  });

  it("filters in matches", () => {
    const out = isValidForFilter(ENTRY, "abc", LANGUAGES, CONCEPTS);
    expect(out).toBeTruthy();
  });

  it("maps language names", () => {
    const out = isValidForFilter(ENTRY, "Language", LANGUAGES, CONCEPTS);
    expect(out).toBeTruthy();
  });

  it("maps concept names", () => {
    const out = isValidForFilter(ENTRY, "Concept", LANGUAGES, CONCEPTS);
    expect(out).toBeTruthy();
  });

  it("does partial matches", () => {
    const out = isValidForFilter(ENTRY, "lang", LANGUAGES, CONCEPTS);
    expect(out).toBeTruthy();
  });
});
