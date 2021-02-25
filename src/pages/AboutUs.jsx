import { AboutUsBody } from "components/Body/aboutUs";
import { AppContainer } from "containers/AppContainer";
import React from "react";

export function AboutUs() {
  return (
    <div className='about_us_page'>
      <AppContainer>
        <AboutUsBody />
      </AppContainer>
    </div>
  );
}
