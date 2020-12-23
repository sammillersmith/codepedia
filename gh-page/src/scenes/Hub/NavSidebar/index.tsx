import React from "react";
import { NavSidebar, NavSection, Spacing } from "../../../components/";
import { useSelector } from "react-redux";
import { selectConcepts, selectLanguages } from "../../../selectors";

export type HubSidebarProps = {
  language: string;
  setLanguage: (l: string) => void;
  concept: string;
  setConcept: (c: string) => void;
};

const HubSidebar: React.FC<HubSidebarProps> = ({
  language,
  setLanguage,
  concept,
  setConcept,
}) => {
  const languages = useSelector(selectLanguages);
  const concepts = useSelector(selectConcepts);
  return (
    <NavSidebar>
      <Spacing size={2.75} />

      <NavSection
        title="Language"
        options={languages}
        selectedOption={language}
        onSelectOption={setLanguage}
      />

      <NavSection
        title="Concepts"
        options={concepts}
        selectedOption={concept}
        onSelectOption={(c: string[]) => setConcept(c[0])}
      />
    </NavSidebar>
  );
};

export default HubSidebar;
