import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


export default () => {
  const [dayOne, setDayOne] = useState({date: new Date().toJSON().slice(0, 10)});
  const [dayOnes, setDayOnes] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchDayOnes = async () => {
    setDayOnes((await (await fetch('/api/day_ones')).json())['items'])
  }

  const handleDelete = async id => {
    const response = await fetch(`/api/day_ones/${id}`, { method: 'delete' });
    fetchDayOnes();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const response = await fetch(event.target.action, {
      method: 'post', body: JSON.stringify({day_one: dayOne}),
      headers: {
        "Content-Type": "application/json",
      },  
    })
    if(response.status < 400) {
      return navigate("/");
    } else if(response.status < 500) {
      const body = await response.json();
      setErrors(body.errors);
    } else {
      alert('Something went wrong!')
    }
    fetchDayOnes();
  }

  useEffect(() => {
    fetchDayOnes();
  }, [])

  return (
    <div>
      <div className="container secondary-color">
        <h1 className="display-4">Day One Form</h1>
        <p className="lead">
          Record a new Day One.
        </p>
        <hr className="my-4" />
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
        <hr className="my-4" />
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Period</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dayOnes && dayOnes.map(({id, date, days}) => <tr key={id}>
              <td>{date}</td>
              <td>{days} days</td>
              <td><a onClick={() => handleDelete(id)} className="text-danger"><i className='bi bi-trash'/></a></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <nav className="navbar fixed-bottom bg-body-tertiary">
        <div className="container-fluid">
          <a href="/"><i className="bi bi-calendar"></i></a>
          <a href="/"><i className="bi bi-plus-square"></i></a>
          <a href="/"><i className="bi bi-person"></i></a>
        </div>
      </nav>
    </div>
  )
};
