import React from "react";
import { Heading } from "../Heading";
import { colors } from "@codecademy/gamut-styles";
import styled from "@emotion/styled";

export type HeaderProps = {
  path: string;
};

export const Header: React.FC<HeaderProps> = ({ path }) => {
  return (
    <StyledHeader>
      <Heading as="h1" fontSize="sm">
        {path}
      </Heading>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid ${colors["gray-200"]};
`;
