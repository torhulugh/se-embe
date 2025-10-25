import { useState, useEffect } from "react";
import "./style.css";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarDays, setCalendarDays] = useState([]);

  const calendarViewMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Function to get number of days in a month
  const getMonthDays = (month, year) => {
    if (
      month === 0 ||
      month === 2 ||
      month === 4 ||
      month === 6 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      return 31;
    }
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = getMonthDays(currentMonth, currentYear);
    let days = [];

    // Previous month days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthDays = getMonthDays(prevMonth, prevYear);

    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: prevMonthDays - firstDay + i + 1,
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      days.push({
        day: d,
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    // Next month days
    const remainingDays = 35 - days.length;
    for (let fd = 1; fd <= remainingDays; fd++) {
      days.push({
        day: fd,
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    setCalendarDays(days);
  };

  // Handle previous month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Handle next month navigation
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar on component mount and when month/year changes
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth, currentYear]);

  // Get today's date for display
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div id="calendar">
      <div id="calendar--header1">
        <div id="catToggle">
          <p className="cat--title">Day</p>
          <div className="gler--blur"></div>
        </div>
        <div id="catToggle">
          <p className="cat--title">Week</p>
          <div className="gler--blur"></div>
        </div>
        <div id="catToggle">
          <p className="cat--title">Month</p>
          <div className="gler--blur"></div>
        </div>
        <div id="catToggle">
          <p className="cat--title">Year</p>
          <div className="gler--blur"></div>
        </div>
      </div>
      {/* row end */}
      <div id="calendar--header2">
        <p id="header2--title">
          {calendarViewMonth[currentMonth]} {currentYear}
        </p>
        <div id="calNav--btn--container">
          <img
            id="previous--month--button"
            src="images/left-arrow.png"
            alt="previous-month-button"
            onClick={handlePrevMonth}
            style={{ cursor: "pointer" }}
          />
          <img
            id="next--month--button"
            src="images/right-arrow.png"
            alt="next-month-button"
            onClick={handleNextMonth}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div id="calendar--weeks">
        <div className="weekday-container">
          <p className="week--day">Su</p>
        </div>
        <div className="weekday-container">
          <p className="week--day">Mo</p>
        </div>
        <div className="weekday-container">
          <p className="week--day">Tu</p>
        </div>
        <div className="weekday-container">
          <p className="week--day">We</p>
        </div>
        <div className="weekday-container">
          <p className="week--day">Th</p>
        </div>
        <div className="weekday-container">
          <p className="week--day">Fr</p>
        </div>
        <div className="weekday-container">
          <p className="week--day">Sa</p>
        </div>
      </div>
      <div id="calendar--days">
        {calendarDays.map((dayObj, index) => (
          <div key={index} className="days--container">
            <p className={`day ${!dayObj.isCurrentMonth ? "other-month" : ""}`}>
              {dayObj.day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
