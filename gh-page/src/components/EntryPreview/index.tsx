import { IEntry } from "../../models/entry";
import React from "react";
import { Card } from "@codecademy/gamut-labs";
import { ButtonDeprecatedBase, Container, Text } from "@codecademy/gamut";
import styled from "@emotion/styled";
import { toTitleCase } from "../../helpers/title";
import { selectConceptName } from "../../selectors";
import { useSelector } from "react-redux";
import { IStore } from "../../models";
import { Heading } from "../Heading";

const StyledBox = styled(Card)`
  cursor: pointer;
  width: 25vw;
  height: 8rem;
`;

const StyledDescription = styled.div`
  white-space: normal;
  line-height: 1.5;
  width: 100%;
`;

export type EntryPreviewProps = {
  entry: IEntry;
  onClick: () => void;
};

const EntryPreview: React.FC<EntryPreviewProps> = ({ entry, onClick }) => {

  if (!entry.mdBody) {
    return null;
  }

  return (
    <ButtonDeprecatedBase onClick={onClick}>
      <StyledBox padding={16} variant="white" shadowOffset={4}>
        <Container justify="center" align="center" column>
          <Heading as="h3" fontSize="xs">
            <span>{toTitleCase(entry.title || entry.concept)}</span>
          </Heading>
          <StyledDescription>{entry.description || ""}</StyledDescription>
        </Container>
      </StyledBox>
    </ButtonDeprecatedBase>
  );
};

export default EntryPreview;
