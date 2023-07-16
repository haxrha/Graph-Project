const xValues = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];
const yValues1 = [10, 15,12,10, 15, 12,10, 15, 12,10, 15, 12]; // First set of y-values
const yValues2 = [1, 2, 3, 4 , 5 , 6 , 7, 8, 9, 10, 11, 12];    // Second set of y-values

const myChart = new Chart("myChart", {
type: 'bar',
data: {
  labels: xValues,  
  datasets: [
    {
      label: 'Visitors',
      data: yValues1,
      borderRadius:25,
      backgroundColor: 'rgba(0,152,212,1.00)' // Customize the bar color
    },
    {
      label: 'Leads',
      data: yValues2,
      backgroundColor: 'rgba(52, 87, 213, 1)' // Customize the bar color
    }
  ]
},
options: {
  responsive: true,
  scales: {
    x: { // Configure the x-axis
      title: {
        display: true,
        text: 'X-axis'
      }
    },
    y: { // Configure the y-axis
      title: {
        display: true,
        text: 'Y-axis'
      }
    }
  }
}
});