import React from "react";
import { Container } from "@codecademy/gamut";
import { colors } from "@codecademy/gamut-styles";
import styled from "@emotion/styled";

export type NavSidebarProps = {};

export const NavSidebar: React.FC<NavSidebarProps> = ({ children }) => {
  return (
    <StyledSidebar flex column>
      {children}
    </StyledSidebar>
  );
};

const StyledSidebar = styled(Container)`
  border-right: 1px solid ${colors["gray-200"]};
  height: 100%;
  width: 20vw;
  flex-shrink: 0;
  padding-top: 1rem;

  button span {
    white-space: normal;
  }
`;
