import React from "react";
import { Line } from "react-chartjs-2";
import { htmlLegendPlugin } from "./customLegend";
import { externalTooltipHandler } from "./customTooltip";

export function Chart({ labels, paymentData, cashoutData }) {
  let requiredProps =
    Boolean(labels) && Boolean(paymentData) && Boolean(cashoutData);

  return (
    <div className='chart'>
      {requiredProps ? (
        <>
          <Line
            data={{
              labels,
              datasets: [
                // {
                //   label: "Баланс",
                //   data: [12, 19, 3, 5, 2, 3],
                //   borderColor: "#B827EB",
                //   borderWidth: 2,
                // },
                // {
                //   label: "В ожидании",
                //   data: [5, 11, 6, 7, 3, 0],
                //   borderColor: "#FF9900",
                //   borderWidth: 2,
                // },
                {
                  label: "Заработано",
                  data: paymentData,
                  borderColor: "#7AC231",
                  backgroundColor: "#7AC231",
                  borderWidth: 1,
                },
                {
                  label: "Выведено",
                  data: cashoutData,
                  borderColor: "#009FF9",
                  backgroundColor: "#009FF9",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              pointDotRadius: 1,
              pointDotStrokeWidth: 8,
              pointHitDetectionRadius: 20,
              responsive: true,
              radius: 0,
              plugins: {
                htmlLegend: {
                  // ID of the container to put the legend in
                  containerID: "legend-container",
                },
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                  intersect: false,
                  position: "nearest",
                  external: externalTooltipHandler,
                },
              },
              scales: {
                x: {
                  display: true,
                  color: "#fff",
                  grid: {
                    display: true,
                    drawOnChartArea: false,
                    borderColor: "#707070",
                    tickColor: "#707070",
                  },
                  ticks: {
                    color: "#686868",
                  },
                },
                x2: {
                  display: true,
                  position: "top",
                  ticks: {
                    display: false,
                  },
                  grid: {
                    display: true,
                    drawOnChartArea: false,
                    borderColor: "#707070",
                  },
                },
                y: {
                  display: true,
                  color: "#fff",
                  grid: {
                    drawOnChartArea: false,
                    borderColor: "#707070",
                    tickColor: "transparent",
                  },
                  ticks: {
                    color: "#686868",
                    // forces step size to be 50 units
                    stepSize: 100,
                  },
                },
                y2: {
                  display: true,
                  position: "right",
                  ticks: {
                    display: false,
                  },
                  grid: {
                    display: true,
                    drawOnChartArea: false,
                    borderColor: "#707070",
                  },
                },
              },
            }}
            plugins={[htmlLegendPlugin]}
          />
          <div id='legend-container'>
            <ul className='legend_items_container'></ul>
          </div>
          <div id='tooltip_container' className='tooltip_container'>
            <table className='tooltip_table'></table>
          </div>
        </>
      ) : (
        <div className='flex_box' style={{ color: "red" }}>
          Требуемые данные отсутствуют!
        </div>
      )}
    </div>
  );
}
