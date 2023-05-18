import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useFirebase } from "../context/firebase";

function Donut() {
  const firebase = useFirebase();
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        // Generate random values for plastic and general waste
        const plasticWaste = Math.floor(Math.random() * 100);
        const generalWaste = Math.floor(Math.random() * 100);

        setWasteData([plasticWaste, generalWaste]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWasteData();
  }, []);

  return (
    <div className="DonutChart">
      {wasteData.length > 0 ? (
        <Chart
          type="donut"
          width="100%"
          height="300"
          series={wasteData}
          options={{
            labels: ['Plastic', 'General Waste'],
            colors: ['#ff5500', '#007bff'],
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                  },
                },
              },
            ],
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default Donut;