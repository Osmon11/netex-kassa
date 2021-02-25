import { AppContainer } from "containers/AppContainer";
import React from "react";
import { DocumentationBody } from "components";

export function Documentation() {
  return (
    <div className='documentation_page'>
      <AppContainer>
        <DocumentationBody />
      </AppContainer>
    </div>
  );
}
