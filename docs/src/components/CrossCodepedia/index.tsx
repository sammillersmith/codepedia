import React from "react";
import { Codepedia } from "@codecademy/markdown-overrides";
import { fontBase } from "@codecademy/gamut-styles";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectConceptName, selectEntry } from "../../selectors";
import { IStore } from "../../models";
import { useNavigate } from "@reach/router";
import { navigateToEntry } from "../../helpers/navigate";

export type CrossCodepediaProps = {
  concept: string;
  language?: string;
};

export const CrossCodepedia: React.FC<CrossCodepediaProps> = ({
  concept,
  language,
  children,
}) => {
  const entry = useSelector((s: IStore) =>
    selectEntry(s, concept, language || "")
  );
  const name = useSelector((s: IStore) => selectConceptName(s, concept));

  const navigate = useNavigate();

  if (!entry) {
    return null;
  }

  return (
    <SCodepedia
      concept={concept}
      language={language}
      linkOverrides={{
        label: `Jump to ${name}`,
        onLoad: async () => entry?.mdBody || "",
        onViewClick: () => navigateToEntry(navigate, entry),
      }}
    >
      {children}
    </SCodepedia>
  );
};

const SCodepedia = styled(Codepedia)`
  font-family: ${fontBase};
`;
