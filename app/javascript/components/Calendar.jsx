import React from 'react';
import parseLocalDate from '../helpers/parseLocalDate';

export default ({user}) => {
    const today = new Date();
    const day14 = parseLocalDate(user.most_recent_date)
    day14.setDate(day14.getDate + 14)
    const iterator = new Date();
    iterator.setDate(iterator.getDate() - today.getDay() - 1);
    const dayOne = parseLocalDate(user.most_recent_date)
    const nextDayOne = parseLocalDate(user.most_recent_date)
    nextDayOne.setDate(nextDayOne.getDate() + user.period)
    const nextOvulation = parseLocalDate(user.most_recent_date)
    nextOvulation.setDate(nextOvulation.getDate() + 14)

    const highChanceStart = new Date(nextOvulation)
    highChanceStart.setDate(highChanceStart.getDate() - 6)
    const highChanceEnd = new Date(nextOvulation)
    highChanceEnd.setDate(highChanceEnd.getDate() + 3)

    const getNext = () => {
        iterator.setDate(iterator.getDate() + 1)
        return iterator
    }

    const isDayOne = () => ([dayOne.toDateString(), nextDayOne.toDateString()].includes(iterator.toDateString()))
    const isOvulation = () => (iterator.toDateString() == nextOvulation.toDateString())
    const isHighChance = () => (highChanceStart < iterator && iterator < highChanceEnd )
    const isToday = () => (iterator.toDateString() == today.toDateString())

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
                        return <td key={Math.random()} className={`${isHighChance() ? 'table-danger' : ''} position-relative text-center`}>
                            {date.getDate()}
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