import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react";
import { useVendor } from "../../context/VendorContext";
import "./Calendar.css";

function Calendar() {
  const { calendarEvents, openModal } = useVendor();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const blanks = Array(firstDayIndex).fill(null);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    return [...blanks, ...days];
  }, [currentDate]);

  const monthLabel = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric"
  });

  const getDayKey = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${month}-${d}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PLAN AHEAD, CELEBRATE MORE</span>
          <h1>Booking Calendar</h1>
          <p>
            Track auspicious Tamil muhurtham dates, confirmed couple bookings, and team availability.
          </p>
        </div>
      </div>

      <div className="calendar-layout">
        {/* Calendar Card */}
        <div className="calendar-card">
          <div className="calendar-head">
            <div>
              <h2>{monthLabel}</h2>
              <p>Your wedding schedule & auspicious dates</p>
            </div>

            <div className="calendar-nav">
              <button onClick={handlePrevMonth} aria-label="Previous month">
                <ChevronLeft size={18} />
              </button>
              <button onClick={handleNextMonth} aria-label="Next month">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="calendar-legend">
            <span>
              <i className="auspicious" /> Auspicious Muhurtham
            </span>
            <span>
              <i className="booked" /> Confirmed Booking
            </span>
            <span>
              <i className="available" /> Available Date
            </span>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div className="weekday" key={day}>
                {day}
              </div>
            ))}

            {daysInMonth.map((day, idx) => {
              if (!day) {
                return <button key={idx} disabled className="calendar-day" />;
              }

              const dateKey = getDayKey(day);
              const eventState = calendarEvents[dateKey] || "Available";
              const isToday =
                day === 20 &&
                currentDate.getMonth() === 10 &&
                currentDate.getFullYear() === 2026;

              return (
                <button
                  key={idx}
                  className={`calendar-day ${eventState.toLowerCase()} ${
                    isToday ? "today" : ""
                  }`}
                  onClick={() => openModal("calendarDay", { dateKey, day, eventState })}
                >
                  <span>{day}</span>
                  {eventState !== "Available" && <i />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Wedding Schedule Sidebar */}
        <aside className="upcoming-card">
          <div className="upcoming-heading">
            <div>
              <span className="eyebrow">WHAT'S NEXT</span>
              <h3>Upcoming Wedding Schedule</h3>
            </div>
            <CalendarDays size={20} />
          </div>

          {UPCOMING_SCHEDULE.map((item, idx) => (
            <div className="upcoming-event" key={idx}>
              <div className="event-date">
                {item.date.split(" ")[0]}
                <small>{item.date.split(" ")[1]}</small>
              </div>
              <div>
                <b>{item.client}</b>
                <small>{item.venue}</small>
                <span
                  className={`status status-${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}

          <button
            className="btn secondary"
            onClick={() => openModal("addCalendarEvent")}
          >
            <Plus size={15} /> Add Custom Calendar Date
          </button>
        </aside>
      </div>
    </>
  );
}

const UPCOMING_SCHEDULE = [
  {
    date: "06 Nov",
    client: "Priya & Karthik Ramanathan",
    venue: "Sri Vari Kalyana Mandapam, Chennai",
    status: "Booked"
  },
  {
    date: "14 Nov",
    client: "Ananya & Vivek",
    venue: "ITC Grand Chola, Chennai",
    status: "Booked"
  },
  {
    date: "20 Nov",
    client: "Auspicious Muhurtham Day",
    venue: "High enquiry volume date",
    status: "Auspicious"
  },
  {
    date: "28 Nov",
    client: "Meera & Arjun",
    venue: "Mahabalipuram Beach Resort",
    status: "Booked"
  },
  {
    date: "05 Dec",
    client: "Siddharth & Deepika",
    venue: "Leela Palace, Chennai",
    status: "Booked"
  }
];

export default Calendar;
export { Calendar };
