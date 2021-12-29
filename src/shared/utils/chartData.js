export const options={
    chart:{
        background:"#efefef",
        foreColor:"teal"
      },
      xaxis:{
       categories:[
         "National Id",
         "Diploma degrees",
         "Driving certificate",
         "Land certificate",
         "Passport",
         "Visa"
       ]
     
      },
      fill:{
        colors:["dodgerblue"]
     },
      dataLabels:{
        enabled:true
      },
     title:{
       text:"The most searched items on Shaka",
       align:"center",
       margin:18,
       style:{
         fontSize:"20px"
       }
     }
};

export const series=[{
    name:"Lost & found items",
    data:[
       2352,
       1682,
       1546,
       1103,
       820,
       350
    ]
}];