import { Heading, Text } from "@codecademy/gamut";
import styled from "@emotion/styled";
import { Spacing, EntryPreviews, Search } from "../../../components";
import React, { useCallback, useMemo, useState } from "react";
import {
  selectConcepts,
  selectEntriesForConceptAndLanugage,
  selectLanguages,
} from "../../../selectors";
import { useSelector } from "react-redux";
import { IStore } from "../../../models";
import { isValidForFilter } from "../../../helpers/filter";
import { useNavigate } from "@reach/router";
import { IEntry } from "../../../models/entry";
import { navigateToEntry } from "../../../helpers/navigate";

export type HubEntriesProps = {
  concept: string;
  language: string;
};

export const HubEntries: React.FC<HubEntriesProps> = ({
  concept,
  language,
}) => {
  const languages = useSelector(selectLanguages);
  const concepts = useSelector(selectConcepts);
  const entries = useSelector((s: IStore) =>
    selectEntriesForConceptAndLanugage(s, concept, language)
  );

  // ==> Handle filtering
  const [filterTxt, setFilterTxt] = useState("");
  const unfilteredEntries = useMemo(() => {
    return entries.filter((e) =>
      isValidForFilter(e, filterTxt, languages, concepts)
    );
  }, [entries, filterTxt]);

  // ==> Handle navigation
  const navigate = useNavigate();
  const onEntrySelect = useCallback((entry: IEntry) => {
    navigateToEntry(navigate, entry);
  }, []);

  return (
    <EntrySection>
      <Heading as="h1" fontSize="xl">
        Codepedia
      </Heading>

      <Search
        value={filterTxt}
        onChange={(e) => setFilterTxt(e.target.value)}
      />

      <Spacing size={1} />

      <Text as="p" fontSize="md" style={{ lineHeight: 1.2 }}>
        👋 Welcome to Codepedia! Community-driven code documentations and
        glossary for popular programming languages and frameworks. If you're
        interested in contributing, check out our&nbsp;
        <a href="https://github.com/codecademy/codepedia/blob/main/contribute.md">
          {`Contribution Guide.`}
        </a>
      </Text>

      <Spacing size={2} />

      <EntryPreviews
        title="Language-Agnostic Concepts"
        onEntrySelect={onEntrySelect}
        entries={unfilteredEntries.filter((e) => !e.language)}
      />

      {Object.keys(languages).map((l) =>
        l ? (
          <EntryPreviews
            key={`previews-${l}`}
            title={l}
            onEntrySelect={onEntrySelect}
            entries={unfilteredEntries.filter(
              (e) => e.language === languages[l]
            )}
          />
        ) : null
      )}
    </EntrySection>
  );
};

const EntrySection = styled.div`
  padding: 2rem;
  overflow-y: auto;
  height: 100%;
  flex-grow: 1;
`;
