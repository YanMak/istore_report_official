const getCinemaData = async () => {
  const urlERP = "https://s3.eu-central-1.wasabisys.com/ghashtag/RNForKids/00-Init/data.json";
  
  let response = await fetch(urlERP);
  let incomingData = [];

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
      
      incomingData = await response.json();

      return incomingData;
      
  } else {
      alert("Ошибка HTTP: " + response.status);
  }

}

const getERPdataForReports = async(beginData_, endData_) => {
  const beginData = Math.floor(new Date(beginData_).getTime() / 1000);
  const endData = Math.floor(new Date(endData_).getTime() / 1000);
  //alert(`begin and end ${beginData} ${endData}`);

  const urlERP = "http://89.223.93.142:3001/geterpdata_onlinereport?begindata="+beginData+"&enddata="+endData;
  alert(urlERP);

  let response = await fetch(urlERP);
  let incomingData = [];

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
      incomingData = await response.json();

      return incomingData;
      
  } else {
      alert("Ошибка HTTP: " + response.status);
  }
}

// fast version, but another data
const getERPdataForReportsFast = async() => {
  const urlERP = "http://89.223.93.142:3001/lists";
  
  let response = await fetch(urlERP);
  let incomingData = [];

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
      incomingData = await response.json();
      //alert(JSON.stringify(incomingData));
      return incomingData;
      //alert(incomingData);
      //let prep = await getERPdataForCharts(incomingData);
      //document.getElementById("expressQueryData1").innerHTML = JSON.stringify(prep);
      //document.getElementById("expressQueryData1").innerHTML = JSON.stringify(incomingData[1]);
      //document.getElementById("expressQueryData2").innerHTML = '*************************************';
      //document.getElementById("expressQueryData3").innerHTML = JSON.stringify(incomingData[0].series[0].data);
      
  } else {
      alert("Ошибка HTTP: " + response.status);
  }
}

export {
  getERPdataForReports, 
  getERPdataForReportsFast,
  getCinemaData};

//export default getERPdataForReports;