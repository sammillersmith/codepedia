import { NavSidebar, NavSection } from "../../../components";
import React from "react";
import { TextButton } from "@codecademy/gamut";
import { useNavigate } from "@reach/router";
import { useSelector } from "react-redux";
import {
  selectConceptsForLanguage,
  selectLanguagesForConcept,
} from "../../../selectors";
import { IStore } from "../../../models";
import { IEntry } from "models/entry";
import {
  navigateToConceptAndLanguage,
  navigateToRoot,
} from "../../../helpers/navigate";
import { toTitleCase } from '../../../helpers/title';

export type EntrySidebarProps = {
  entry: IEntry;
  conceptName: string;
  languageName: string;
};

const EntrySidebar: React.FC<EntrySidebarProps> = ({
  entry,
  conceptName,
  languageName,
}) => {
  const languages = useSelector((s: IStore) =>
    selectLanguagesForConcept(s, entry.concept)
  );
  const concepts = useSelector((s: IStore) =>
    selectConceptsForLanguage(s, entry.language || "")
  );

  const navigate = useNavigate();

  return (
    <NavSidebar>
      <TextButton onClick={() => navigateToRoot(navigate)}>
        &lt; Back
      </TextButton>

      <NavSection
        title={`${toTitleCase(conceptName)} in Other Languages`}
        options={languages}
        selectedOption={entry.language}
        onSelectOption={(l: string) =>
          navigateToConceptAndLanguage(navigate, entry.concept, l)
        }
        defaultName="Multiple Languages"
      />

      <NavSection
        title={`Other Concepts in ${languageName}`}
        options={concepts}
        selectedOption={entry.concept}
        onSelectOption={(c: string[]) =>
          navigateToConceptAndLanguage(navigate, c[0], entry.language || "")
        }
      />
    </NavSidebar>
  );
};

export default EntrySidebar;
