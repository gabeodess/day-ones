import React, {useEffect, useState} from "react";
import Calendar from "./Calendar";
import classNames from "classnames";
import getLocalDateString from "../helpers/getLocalDateString";

export default () => {
  const [dayOne, setDayOne] = useState({date: getLocalDateString()});
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const {followees} = user || {};

  const handleSelect = async (id) => {
    setSelectedUser(await (await fetch(`/api/users/${id}`)).json());
  }

  const fetchUser = async () => {
    const fetchedUser = await (await fetch('/api/session')).json();
    setUser(fetchedUser);
    setSelectedUser(fetchedUser);
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const response = await fetch(event.target.action, {
      method: 'post', body: JSON.stringify({day_one: dayOne}),
      headers: {
        "Content-Type": "application/json",
      },  
    })
    if(response.status <= 299) {
      fetchUser();
    } else if(response.status < 500) {
      const body = await response.json();
      setErrors(body.errors);
    } else {
      alert('Something went wrong!')
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div>
      <h1 className="display-4">Period</h1>
      <p className="lead">
        Track your period.
      </p>
      <hr className="my-4" />

      {user && <div>
        {followees.length > 0 && <div>
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a 
                className={classNames("nav-link", {active: selectedUser.id == user.id})} 
                aria-current="page" 
                href="#" 
                onClick={(e) => {e.preventDefault(); handleSelect(user.id)}}>me</a>
            </li>
            {followees.map(followee => <li className="nav-item" key={followee.id}>
              <a 
                className={classNames("nav-link", {active: followee.id == selectedUser.id})} 
                href='#' 
                onClick={(e) => {e.preventDefault(); handleSelect(followee.id)}}>{followee.first_name}</a>
            </li>)}
          </ul>
        </div>}
        {selectedUser.calendar && <div>
          <Calendar user={selectedUser}/>
        </div>}
        {user.id === selectedUser.id && !user.calendar && <div>
          <div className="alert alert-light" role="alert">
            <div className="mb-1">You haven't recorded any Day Ones.  </div>
            Enter one below <i className="bi bi-arrow-down"></i>
          </div>
          <div>
            <form action='/api/day_ones' method='post' onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input 
                  type="date" 
                  onChange={event => setDayOne({...dayOne, date: event.target.value})}
                  value={dayOne.date}
                  className={`form-control ${(errors.date || []).length > 0 ? 'is-invalid' : ''}`}
                  placeholder="Day One" 
                  aria-label="First day of bleeding" 
                  aria-describedby="button-addon2" 
                />
                <input type='submit' value='Record Day One' className="btn btn-primary" id="button-addon2"/>
                {errors.date && errors.date.length > 0 && <div className="invalid-feedback">
                  {errors.date.map(error => <div  key={error}>{error}</div>)}
                </div>}
              </div>
            </form>
          </div>
        </div>}
      </div>}
    </div>
  )
};
