import React from "react";
import { Codepedia } from "@codecademy/markdown-overrides";
import { fontBase } from "@codecademy/gamut-styles";
import styled from "@emotion/styled";

export type CrossCodepediaProps = {
  concept: string;
  language?: string;
};

export const CrossCodepedia: React.FC<CrossCodepediaProps> = ({
  concept,
  language,
  children,
}) => {
  console.log(concept, language);
  return (
    <SCodepedia concept={concept} language={language}>
      {children}
    </SCodepedia>
  );
};

const SCodepedia = styled(Codepedia)`
  font-family: ${fontBase};
`;
