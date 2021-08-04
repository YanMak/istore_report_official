import logo from './logo.svg';
import './App.css';

import Menu from './Menu/Menu';

//crm api
import {getERPdataForReports, getERPdataForReportsFast, getCinemaData} from './data/api';

import {endOfMonth, beginOfMonth, beginOfDay, endOfDay} from './data/dateFuncs';

// reactive components
import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

//const axios = require('axios');

const App = () => {

  // ham menu
  const [menuActive, setMenuActive] = useState(false);

  const menuItemsSrc = [
    {value: 'Главная', href: '/main', icon: 'anchor'},
    {value: 'Корзина', href: '/main', icon: 'api'}, 
    {value: 'Каталог', href: '/main', icon: 'android'},
    {value: 'Профиль', href: '/main', icon: 'android'},
    {value: 'Карта', href: '/main', icon: 'android'}
  ];
  const [menuItems, setMenuItems] = useState(menuItemsSrc);

  const [count, setCount] = useState(0);

  const [fastData, setFastData] = useState(null);
  const [data, setData] = useState(null);
  const [cinemaData, setCinemaData] = useState(null);
  
  const [page, setPage] = useState(1);

  //(beginOfMonth(new Date()));
  //alert(endOfMonth(new Date()));
  const [calendarDate1, onCalendarDate1Change] = useState(new Date());
  const [calendarDate1pl, onCalendarDate1plChange] = useState([new Date(), new Date()]);
  
  useEffect(async () => {
    
    const res1 = await getERPdataForReportsFast();
    setFastData(res1);
    //alert(JSON.stringify(res1));
    
    const beginData = beginOfMonth(calendarDate1pl[0]);
    const endData = endOfDay(endOfMonth(calendarDate1pl[1]));
    //alert(`${beginData} ${endData}`);
    const res2 = await getERPdataForReports(beginData, endData);
    setData(res2);
    //alert(JSON.stringify(res2));
    
    const res3 = await getCinemaData();
    setCinemaData(res3);
    //alert(JSON.stringify(res3));


  }, [count]);

  const printFilmData = (elem) => {
    return (
      <div>{elem.name}</div>    
    )
  }

  const printCinemaData = () => {
    return (
      cinemaData ? cinemaData.map((elem) => (printFilmData(elem))) : null
    )
  }

  const printTableHeader = () => (
      <div class="soflex2">
        <div>Период</div>
        <div>Всего отгружено</div>
        <div>Оплачено онлайн</div>
        <div>Отгружено в СРС</div>
        <div>Отгружено курьерам</div>
        <div>Средний чек</div>
        <div>Наценка, %</div>
        <div>Получено средств</div>
        <div>Заказов отгружено</div>
        <div>CR в отгруженные, %</div>
      </div>   
  )

  const printTableColumn = (incomingData) => (
      <div class="soflex2">
        <div>{incomingData.Период}</div>
        <div>{incomingData.ВсегоОтгружено}</div>
        <div>{incomingData.ОплаченоОнлайн}</div>
        <div>{incomingData.ОтгруженоВСРС}</div>
        <div>{incomingData.ОтгруженоКурьерам}</div>
        <div>{incomingData.СреднийЧек}</div>
        <div>{incomingData.Наценка}</div>
        <div>{incomingData.ПолученоСредств}</div>
        <div>{incomingData.ЗаказовОтгружено}</div>
        <div>{incomingData.КонверсияВОтгруженные}</div>
      </div>
  )

  const printTableData = (data) => {
    return (      
      data ? data.map((elem) => (printTableColumn(elem))) : null
    );    
    
  }

  const printFastElem = (val) => {
    //const elem = JSON.stringify(val___)
    return (<div>{val.id + '-' + val.name}</div>)
  }

  const printElem = (val) => {
    // val is obj
    const valstr = JSON.stringify(val);
    return (<div>{valstr}</div>)
  }

  return (
    <div className="App">
      <nav>
        <div className = "burger-btn" onClick = {()=>(setMenuActive(!menuActive))}>
          <span/>
        </div>
      </nav>
      <main>
        <p>{'menu active: ' + menuActive}lorem ipsum dolorem</p>
        <p>lorem ipsum dolorem</p>
        <p>lorem ipsum dolorem</p>
        <p>lorem ipsum dolorem</p>
        <p>lorem ipsum dolorem</p>
        <p>lorem ipsum dolorem</p>
      </main>
      <Menu active = {menuActive} setActive = {setMenuActive} items = {menuItems} header = {'Hello header'}/>
      <header>    
      </header>
      <body>
        <div>
          {/*<div>
            <Calendar
              onChange={onCalendarDate1Change}
              value={calendarDate1}
            />
          </div>
          */}
          <div>
            <DateRangePicker 
              onChange={onCalendarDate1plChange}
              value={calendarDate1pl}/>
            <button onClick={() => (setCount(count + 1))}>
              Обновить
            </button>  
          </div>
          
          <div>{/*`Calendar date value is ${calendarDate1}`*/}</div>
          <div>{/*`Calendar pl date value is from ${calendarDate1pl[0]} to ${calendarDate1pl[1]} `*/}</div>
          <div>{/*`begin of month ${beginOfMonth(calendarDate1pl[0])} to end of month ${endOfDay(endOfMonth(calendarDate1pl[1]))} `*/}</div>
  
          <div class="soflex1">
            {printTableHeader()}
            {printTableData(data)}
          </div>
          <div>{printCinemaData()}</div>
        </div>
    
      </body>
    </div>
  );
}

export default App;
