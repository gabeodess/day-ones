import React, {useEffect, useState} from "react";
import Calendar from "./Calendar";

export default () => {
  const [dayOne, setDayOne] = useState({date: new Date().toJSON().slice(0, 10)});
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState();

  const fetchUser = async () => {
    setUser(await (await fetch('/api/session')).json())
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const response = await fetch(event.target.action, {
      method: 'post', body: JSON.stringify({day_one: dayOne}),
      headers: {
        "Content-Type": "application/json",
      },  
    })
    const body = await response.json();
    if(response.status < 400) {
    } else if(response.status < 500) {
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
      <div className="container secondary-color">
        <h1 className="display-4">Period</h1>
        <p className="lead">
          Track your period.
        </p>
        <hr className="my-4" />
        {user && user.most_recent_date && <div>
          <Calendar user={user}/>
        </div>}
        {user && !user.most_recent_date && <div>
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
        </div>}
      </div>
      <nav className="navbar fixed-bottom bg-body-tertiary">
        <div className="container-fluid">
          <a href="/"><i className="bi bi-house"></i></a>
          <a href="/"><i className="bi bi-plus-square"></i></a>
          <a href="/"><i className="bi bi-person"></i></a>
        </div>
      </nav>
    </div>
  )
};
