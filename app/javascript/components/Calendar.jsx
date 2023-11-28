import React from 'react';
import parseLocalDate from '../helpers/parseLocalDate';
import dateHelper from '../helpers/dateHelper';
import classNames from 'classnames';

export default ({user: {calendar}}) => {
  const today = dateHelper.beginningOfDayLocal();
  const dayOne = parseLocalDate(calendar.day_one)
  const nextDayOne = parseLocalDate(calendar.next_day_one)
  const nextOvulation = parseLocalDate(calendar.ovulation)
  const highChanceStart = parseLocalDate(calendar.high_chance_start)
  const highChanceEnd = parseLocalDate(calendar.high_chance_end)
  const lowChanceStart = parseLocalDate(calendar.low_chance_start)
  const lowChanceEnd = parseLocalDate(calendar.low_chance_end)

  let cycleIterator = 0;
  const iterator = dateHelper.beginningOfDayLocal();
  iterator.setDate(iterator.getDate() - today.getDay() - 1)

  const getNext = () => {
    iterator.setDate(iterator.getDate() + 1)
    return iterator
  }

  const isDayOne = () => ([dayOne.toDateString(), nextDayOne.toDateString()].includes(iterator.toDateString()))
  const isOvulation = () => (iterator.toDateString() == nextOvulation.toDateString())
  const isHighChance = () => (highChanceStart <= iterator && iterator <= highChanceEnd)
  const isLowChance = () => (!isHighChance() && lowChanceStart <= iterator && iterator <= lowChanceEnd)
  const isToday = () => (iterator.toDateString() == today.toDateString());
  const isInCycle = () => (dayOne <= iterator && iterator < nextDayOne);

  return <div>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Su</th>
          <th>Mo</th>
          <th>Tu</th>
          <th>We</th>
          <th>Th</th>
          <th>Fr</th>
          <th>Sa</th>
        </tr>
      </thead>
      <tbody>
        {Array(5).fill().map(i => <tr key={Math.random()}>
          {Array(7).fill().map(i => {
            const date = getNext();
            return <td 
              key={Math.random()} 
              className={classNames("position-relative", "text-center", {
                "table-danger": isHighChance(), 
                "table-warning": isLowChance(),
              })}
            >
              {date.getDate()}
              {isInCycle() && <span className="position-absolute end-0 bottom-0 me-1 fw-lighter fs-7">{cycleIterator += 1}</span>}
              {isToday() && <i className="bi bi-calendar text-primary position-absolute top-0 start-0 today" style={{width: '100%', fontSize: '25px'}}></i>}
              {isDayOne() && <i className="bi bi-droplet position-absolute top-0 end-0 me-1 text-danger"></i>}
              {isOvulation() && <i className="bi bi-egg-fill position-absolute top-0 end-0 me-1 text-white"></i>}
            </td>
          })}
        </tr>)}
      </tbody>
    </table>
  </div>
}