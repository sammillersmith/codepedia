import { RouteComponentProps } from "@reach/router";
import { Container } from "@codecademy/gamut";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { HubEntries } from "./Entries";
import HubSidebar from "./NavSidebar";

export type HubProps = RouteComponentProps & {};

export const Hub: React.FC<HubProps> = ({}) => {
  const [concept, setConcept] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <Container flex column>
      <Header path="Hub" />

      <Container flex row grow={1}>
        <HubSidebar
          concept={concept}
          setConcept={setConcept}
          language={language}
          setLanguage={setLanguage}
        />
        <HubEntries concept={concept} language={language} />
      </Container>
    </Container>
  );
};
