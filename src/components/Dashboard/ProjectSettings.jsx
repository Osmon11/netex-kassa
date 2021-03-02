import { ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { GoldToggleButton } from "shared/Buttons/buttons";

export function ProjectSettings() {
  return (
    <section>
      <div className='flex_box' style={{ justifyContent: "space-between" }}>
        <span className='title' style={{ fontSize: 25 }}>
          Netex.kg
        </span>
        <span className='subtitle'>Настройки проекта</span>
      </div>
      <ToggleButtonGroup
        exclusive
        value={tab}
        style={{ minWidth: xs ? "100%" : 350, margin: "33px 0" }}
        onChange={(_, tab) => setTab(tab)}
      >
        <GoldToggleButton className={classes.toggleBtn} value='Инфо'>
          Инфо
        </GoldToggleButton>
        <GoldToggleButton className={classes.toggleBtn} value='Настройки'>
          Настройки
        </GoldToggleButton>
      </ToggleButtonGroup>
    </section>
  );
}
