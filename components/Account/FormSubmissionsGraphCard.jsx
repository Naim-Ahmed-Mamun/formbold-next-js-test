import dynamic from "next/dynamic";
import React from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const FormSubmissionsGraphCard = (props) => {
  const { items, categories } = props;
  const series = [
    {
      data: items,
    },
  ];

  const options = {
    colors: ["#5750F1"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inter",

      markers: {
        radius: 99,
      },
    },
    yaxis: {
      title: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      marker: {
        show: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return undefined;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="mb-8 w-full rounded-[10px] bg-white p-6 shadow-fb-one sm:p-10 xl:p-8 2xl:p-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[22px] font-bold leading-tight text-black">
            Your form submissions
          </h3>

          {/* <div>
            <div className="relative rounded-md border border-stroke px-3.5 py-2">
              <span className="pr-2.5 text-sm font-medium text-black">Show:</span>

              <select name="" id="" className="text-sm font-medium text-body-color outline-none">
                <option value="">This month</option>
                <option value="">This week</option>
                <option value="">Today</option>
              </select>
            </div>
          </div> */}
        </div>

        <div className="relative">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </>
  );
};

export default FormSubmissionsGraphCard;
