import { RatesBody } from "components/Body/tariffPlans";
import { AppContainer } from "containers/AppContainer";
import React from "react";

export default function Rates() {
  return (
    <div className='rates_page'>
      <AppContainer>
        <RatesBody />
      </AppContainer>
    </div>
  );
}
