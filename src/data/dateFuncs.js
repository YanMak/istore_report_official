const endOfMonth = (date) => (new Date(date.getFullYear(), date.getMonth() + 1, 0));

const beginOfMonth = (date) => (new Date(date.getFullYear(), date.getMonth() , 1));

const beginOfDay = (date) => (date.setHours(0,0,0,0));

const endOfDay = (date) => {
    //const res = date.setUTCHours(23,59,59,999);
    //return (new Date(1000*res)).getTime();
    //return res.toString();
    //alert(date.getMonth());
    //alert(date.getDate());
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
};

export {
  endOfMonth, 
  beginOfMonth,
  beginOfDay,
  endOfDay  
};
