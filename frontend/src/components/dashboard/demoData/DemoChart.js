
export const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
    datasets: [
      {
        label: 'Age',
        // data: [18, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  
  export const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun', 'Thu', 'Fri', 'Sat','Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun', 'Thu', 'Fri', 'Sat','Sun', 'Tue', 'Wed', 'Thu'],
    datasets: [
      {
        label: 'male',
        data: [12, 19, 3, 5, 2, 3, 11, 19, 3, 5, 2, 3, 11], // ข้อมูลของผู้ชาย
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // สีฟ้า
        borderColor: 'rgba(54, 162, 235, 1)', // ขอบสีฟ้าเข้ม
        borderWidth: 1,
      },
      {
        label: 'female',
        data: [15, 9, 5, 8, 4, 7], // ข้อมูลของผู้หญิง
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // สีแดง
        borderColor: 'rgba(255, 99, 132, 1)', // ขอบสีแดงเข้ม
        borderWidth: 1,
      },
      {
        label: 'female',
        data: [15, 9, 5, 8, 4, 7], // ข้อมูลของผู้หญิง
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // สีแดง
        borderColor: 'rgba(255, 99, 132, 1)', // ขอบสีแดงเข้ม
        borderWidth: 1,
      },
      {
        label: 'female',
        data: [15, 9, 5, 8, 4, 7], // ข้อมูลของผู้หญิง
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // สีแดง
        borderColor: 'rgba(255, 99, 132, 1)', // ขอบสีแดงเข้ม
        borderWidth: 1,
      },
      {
        label: 'female',
        data: [15, 9, 5, 8, 4, 7], // ข้อมูลของผู้หญิง
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // สีแดง
        borderColor: 'rgba(255, 99, 132, 1)', // ขอบสีแดงเข้ม
        borderWidth: 1,
      },
      {
        label: 'female',
        data: [15, 9, 5, 8, 4, 7], // ข้อมูลของผู้หญิง
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // สีแดง
        borderColor: 'rgba(255, 99, 132, 1)', // ขอบสีแดงเข้ม
        borderWidth: 1,
      },

    ],
  };
  
  export const doughnutChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
  
  export const radarChartData = {
    labels: ['อายุ', 'เพศ', 'สัญชาติ'],
    datasets: [
      {
        label: 'Activities',
        data: [19, 16, 16],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  
  export const polarAreaChartData = {
    labels: ['Asia', 'White', 'Black', 'India', 'Others'],
    datasets: [
      {
        label: 'My dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(54, 162, 235)'],
      },
    ],
  };
  
  export const polarAreaChartDataTwo = {
    labels: ['ไอติม', 'แมว', 'เด็กเล็ก', 'คนแก่', 'คนท้อง'],
    datasets: [
      {
        label: 'Product',
        data: [1, 30, 12, 50, 14],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)', 'rgb(54, 162, 235)'],
      },
    ],
  };
  