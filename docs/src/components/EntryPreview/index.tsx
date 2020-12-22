import { IEntry } from "../../models/entry";
import React from "react";
import { Card } from "@codecademy/gamut-labs";
import { ButtonDeprecatedBase, Container, Heading } from "@codecademy/gamut";
import styled from "@emotion/styled";
import { toTitleCase } from "../../helpers/title";
import { fontAccent } from "@codecademy/gamut-styles";
import { selectConceptName } from "../../selectors";
import { useSelector } from "react-redux";
import { IStore } from "../../models";

const StyledBox = styled(Card)`
  cursor: pointer;
  :after,
  :before {
    width: 100%;
    height: 100%;
  }
`;
export type EntryPreviewProps = {
  entry: IEntry;
  onClick: () => void;
};

const EntryPreview: React.FC<EntryPreviewProps> = ({ entry, onClick }) => {
  const name = useSelector((s: IStore) => selectConceptName(s, entry.concept));

  if (!entry.mdBody) {
    return null;
  }

  return (
    <ButtonDeprecatedBase onClick={onClick}>
      <StyledBox padding={16} variant="white" shadowOffset={4}>
        <Container justify="center">
          <Heading as="h3" fontSize="xs">
            <span style={{ fontFamily: fontAccent }}>{toTitleCase(name)}</span>
          </Heading>
        </Container>
      </StyledBox>
    </ButtonDeprecatedBase>
  );
};

export default EntryPreview;
