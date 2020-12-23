import styled from "@emotion/styled";

export const Spacing = styled.div<{ size: number }>`
  width: ${(p) => p.size || 1}rem;
  height: ${(p) => p.size || 1}rem;
`;
