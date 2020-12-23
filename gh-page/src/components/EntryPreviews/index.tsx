import { Container } from "@codecademy/gamut";
import styled from "@emotion/styled";
import EntryPreview from "../EntryPreview";
import { IEntry } from "../../models/entry";
import React from "react";
import { toTitleCase } from "../../helpers/title";
import { Heading } from "../Heading";
import { fontAccent } from "@codecademy/gamut-styles";

export type EntryPreviewsProps = {
  title: string;
  entries: IEntry[];
  onEntrySelect: (e: IEntry) => void;
};

export const EntryPreviews: React.FC<EntryPreviewsProps> = ({
  title,
  entries,
  onEntrySelect,
}) => {
  if (entries.length === 0) {
    return null;
  }
  return (
    <>
      <StyledColumn column>
        <AccentText as="h2" fontSize="md">
          {toTitleCase(title)}
        </AccentText>

        <StyledGrid>
          {entries.map((e) => (
            <EntryPreview
              key={`epreview-${e.concept}-${e.language}`}
              entry={e}
              onClick={() => onEntrySelect(e)}
            />
          ))}
        </StyledGrid>
      </StyledColumn>
    </>
  );
};

const StyledColumn = styled(Container)``;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin: 2rem 0;
`;

const AccentText = styled(Heading)`
  font-family: ${fontAccent};
`;
