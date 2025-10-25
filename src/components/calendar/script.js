window.onload = function() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  document.getElementById('right--section--header--title').innerText = `Upcoming Events for Today ${formattedDate}`;    
    

    const calendarViewMonth = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    const dayOfWeek = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday",
        "Saturday"
    ];
    let cm = today.getMonth();
    let cmh = [cm];
    console.log(cmh);
    let cd = today.getDate();
    let cdy = dayOfWeek[today.getDay()];
    let cy = [today.getFullYear()];
    let calendarView = []
    let clickCounter = 0;
    // fun to find number of days for calendar
    
    function mNd(month, year) {
        if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
            return "31";
        };
        if (month === 0 || month === 3 || month === 5 || month === 8 || month === 10) {
            return "30";
        };
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return "29";
        } else {
            return "28";
        }
    }
// calendar creator
  const firstDay = new Date(cy, cm, 1).getDay();
  const totalDays = new Date(cy, cm + 1, 0).getDate();
  let calendarDays = [];
  // previous month days
  for (let i = 0; i < firstDay; i++) {
    let pdsd = mNd(cmh[0], cy) - (firstDay + 1) + i + 1;
    calendarDays.push(pdsd);
  }
// main month days
  for (let d = 0; d < mNd(cm, cy); d++) {
        calendarDays.push(d+1);
        console.log (mNd(cm, cy))
  }

  // next month days
  let fcd = 35 - calendarDays.length;
  for (let fd = 1; fd < fcd + 1; fd++) {
    if (fcd > 0) {
      calendarDays.push(fd);
    }
  }
  document.getElementById('header2--title').innerText = calendarViewMonth[cm] + ' ' + cy;
  for (let i = 0; i < 35; i++) {
        const dayContainer = document.createElement('div');
        const day = document.createElement('p');
        dayContainer.className = 'days--container';
        day.className = 'day';
        day.innerText = calendarDays[i];
        dayContainer.appendChild(day);
        document.getElementById('calendar--days').appendChild(dayContainer);  

}

// calendar population

    // calendar navigation
    const prevMonth = document.getElementById("previous--month--button")
    const nxtMonth = document.getElementById("next--month--button")
    // previous month nav
    prevMonth.onclick = function () {
        document.getElementById('calendar--days').innerHTML = '';
        calendarDays.innerHTML = "";
        calendarDays.length = 0;
        
        if (clickCounter < cm) {
            cm = cm - 1;
          }
          cmh.pop(0);
            cmh.push(cm);
        console.log(cm);
        console.log(cmh);
        const mfirstDay = new Date(cy, cmh[0], 1).getDay();
        // fun to find number of days for calendar
    function pmNd(month, year) {
        if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
            return "31";
        };
        if (month === 0 || month === 3 || month === 5 || month === 8 || month === 10) {
            return "30";
        };
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return "29";
        } else {
            return "28";
        }
    }
// calendar creator

  // previous month days
  for (let i = 0; i < mfirstDay; i++) {
    let pdsd = pmNd(cmh[0], cy) - (mfirstDay) + i + 1;
    console.log(pmNd(cmh[0], cy));
    calendarDays.push(pdsd);
  }
// main month days
  for (let d = 0; d < pmNd(cmh[0], cy); d++) {
        calendarDays.push(d+1);
        console.log (pmNd(cmh[0], cy))
  }

  // next month days
  let fcd = 35 - calendarDays.length;
  for (let fd = 1; fd < fcd + 1; fd++) {
    if (fcd > 0) {
      calendarDays.push(fd);
    }
  }
  document.getElementById('header2--title').innerText = calendarViewMonth[cm] + ' ' + cy;
  for (let i = 0; i < 35; i++) {
        const dayContainer = document.createElement('div');
        const day = document.createElement('p');
        dayContainer.className = 'days--container';
        day.className = 'day';
        day.innerText = calendarDays[i];
        dayContainer.appendChild(day);
        document.getElementById('calendar--days').appendChild(dayContainer);  

}
        

    console.log("clicked")
}
    // next month nav
    nxtMonth.onclick = function () {
        console.log("clicked")
        
    }

}
