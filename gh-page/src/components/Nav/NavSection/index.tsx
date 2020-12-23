import { Accordion, StrokeButton, TextButton } from "@codecademy/gamut";
import styled from "@emotion/styled";
import React from "react";
import { toTitleCase } from "../../../helpers/title";
import { lookupValue } from "../../../helpers/lookupInDict";

export type NavSectionProps = {
  options: Record<string, string | string[]>;
  selectedOption?: string;
  defaultName?: string;
  title: string;
  collapsed?: boolean;
  onSelectOption: ((opt: string) => void) | ((opt: string[]) => void);
};

export const NavSection: React.FC<NavSectionProps> = ({
  options,
  selectedOption,
  collapsed,
  title,
  onSelectOption,
  defaultName,
}) => {
  const name = lookupValue(options, selectedOption) || defaultName;

  return (
    <StyledAccordion top={title} initiallyExpanded={!collapsed}>
      {Object.keys(options).map((key) => (
        <AccordionItem key={`${title}-${key}`}>
          {key === name ? (
            <StrokeButton onClick={() => onSelectOption("" as any)}>
              {key ? toTitleCase(key) : ""}
            </StrokeButton>
          ) : (
            <TextButton
              onClick={() => onSelectOption(options[key] as any)}
              style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "white",
              }}
            >
              {key ? toTitleCase(key) : ""}
            </TextButton>
          )}
        </AccordionItem>
      ))}
    </StyledAccordion>
  );
};

const StyledAccordion = styled(Accordion)`
  margin: 1rem 0;
`;

const AccordionItem = styled.div`
  margin: 0.25rem 0.5rem;
`;
