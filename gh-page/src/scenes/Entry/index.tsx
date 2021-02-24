import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Container } from "@codecademy/gamut";
import { Header } from "../../components/Header";
import { useSelector } from "react-redux";
import {
  selectConceptName,
  selectLanguageName,
  selectEntry,
} from "../../selectors";
import { IStore } from "models";
import { toTitleCase } from "../../helpers/title";
import EntrySidebar from "./NavSidebar";
import { EntryBody } from "./EntryBody";
import { Loading } from '@codecademy/gamut-labs';
import styled from '@emotion/styled';

type EntryProps = RouteComponentProps & {
  concept?: string;
  language?: string;
};

export const Entry: React.FC<EntryProps> = ({ concept, language }) => {
  const entry = useSelector((s: IStore) =>
    selectEntry(s, concept || "", language || "")
  );
  const conceptName = useSelector((s: IStore) =>
    selectConceptName(s, entry?.concept || "")
  );
  const languageName = useSelector((s: IStore) =>
    selectLanguageName(s, entry?.language || "")
  );

  if (!entry) {
    return <StyledContainer justify="center" align="center" style={{height: '100%', width: '100%'}}><Loading /></StyledContainer>;
  }

  const path = languageName
    ? `${toTitleCase(conceptName)} > ${toTitleCase(languageName)}`
    : `${toTitleCase(conceptName)}`;

  return (
    <Container column style={{height: '100%', width: '100%'}}>
      <Header path={path} />

      <Container flex row grow={1}>
        <EntrySidebar
          entry={entry}
          conceptName={conceptName}
          languageName={languageName}
        />
        <EntryBody entry={entry} />
      </Container>
    </Container>
  );
};

const StyledContainer = styled(Container)`
  width: 100%;
  height: 100vh;
`;
