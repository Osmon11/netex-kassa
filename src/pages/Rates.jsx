import { RatesBody } from "components/Body/rates";
import { AppContainer } from "containers/AppContainer";
import React from "react";

export function Rates() {
  return (
    <div className='rates_page'>
      <AppContainer>
        <RatesBody />
      </AppContainer>
    </div>
  );
}
