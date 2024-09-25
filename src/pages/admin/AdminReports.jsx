// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function AdminReports() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("/api/reports/estates-by-city").then((response) => {
//       setData(response.data);
//     });
//   }, []);

//   const chartData = {
//     labels: data.map((item) => item.city),
//     datasets: [
//       {
//         label: "Number of Estates",
//         data: data.map((item) => item.count),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <Bar data={chartData} />
//     </div>
//   );
// }

// export default AdminReports;
