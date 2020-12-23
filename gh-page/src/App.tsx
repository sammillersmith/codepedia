import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMap } from "./thunks/loadMap";
import { RouteComponentProps, Router } from "@reach/router";
import { fontBase } from "@codecademy/gamut-styles";
import styled from "@emotion/styled";
import { Hub } from "./scenes/Hub";
import { Entry } from "./scenes/Entry";

export const App: React.FC<RouteComponentProps> = () => {
  // ==> kickoff loading all of the data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMap());
  }, []);

  return (
    <StyledApp>
      <Router>
        <Entry path="/codepedia/entries/:concept/*language" />
        <Hub path="/codepedia/" default />
      </Router>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  font-family: ${fontBase};
  height: 100%;
  width: 100%;
`;
