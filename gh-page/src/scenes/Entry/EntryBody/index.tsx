import { IEntry } from "../../../models/entry";
import React from "react";
import { Container, Markdown } from "@codecademy/gamut";
import styled from "@emotion/styled";
import { CodeBlock } from "../CodeBlock";
import { CrossCodepedia } from "../../../components/CrossCodepedia";

export const StyledCard = styled.div`
  margin: 2rem;
`;

export type EntryCardProps = {
  entry: IEntry;
};

export const EntryBody: React.FC<EntryCardProps> = ({ entry }) => {
  const overrides = {
    code: {
      component: CodeBlock,
      allowedAttributes: ["className", "class"],
    },
    Codepedia: {
      component: CrossCodepedia,
      allowedAttributes: ["concept", "language"],
    },
    h1: {
      component: StyledH1
    },
    h2: {
      component: StyledH2
    },
    h3: {
      component: StyledH3
    }
  };
  return (
    <Container column>
      <StyledCard>
        <Markdown text={entry.mdBody} overrides={overrides} />
      </StyledCard>
    </Container>
  );
};

const StyledH1 = styled.h1`font-size: 2.5rem;`
const StyledH2 = styled.h2`font-size: 2.0rem;`
const StyledH3 = styled.h3`font-size: 1.2rem;`