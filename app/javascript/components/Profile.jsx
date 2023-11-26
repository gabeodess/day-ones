import React, { useEffect, useState } from 'react';

export default () => {
  const [newFollow, setNewFollow] = useState({email: ""});
  const [follows, setFollows] = useState(null);
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors({});
    response = await fetch('/api/follows', {
      method: 'post',
      body: JSON.stringify({follow: newFollow}),
      headers: {"Content-Type": "application/json"},  
    });
    if(response.status == 422) {
      setErrors((await response.json())['errors'])
    }else{
      setNewFollow({email: ""});
      fetchFollows();
    }
  }

  const handleDelete = async (id) => {
    await fetch(`/api/follows/${id}`, {method: 'delete'});
    fetchFollows();
  }

  const fetchFollows = async () => {
    setFollows((await (await fetch('/api/follows')).json())['items'])
  }

  const fetchUser = async () => {
    setUser(await (await fetch('/api/session')).json());
  }

  useEffect(() => {
    fetchFollows();
    fetchUser();
  }, [])
  
  return <div>
    <h1 className="display-4">Profile</h1>
    {user && <p className="lead">
      Logged in as {user.email}
    </p>}
    <hr className="my-4" />
    <form onSubmit={handleSubmit}>
      <div className='input-group mb-3'>
        <input 
          name='follow[email]' 
          placeholder='Email' 
          className={`form-control ${(errors.follower_id || errors.follower || []).length > 0 ? 'is-invalid' : ''}`} 
          value={newFollow.email} 
          onChange={e => setNewFollow({...newFollow, email: e.target.value})} />
        <input type='submit' value="Add Follower" className='btn btn-primary'/>
        {errors.follower_id && errors.follower_id.length > 0 && <div className="invalid-feedback">
          {errors.follower_id.map(error => <div  key={error}>{error}</div>)}
        </div>}
        {errors.follower && errors.follower.length > 0 && <div className="invalid-feedback">
          {errors.follower.map(error => <div  key={error}>{error}</div>)}
        </div>}
      </div>
    </form>
    {follows && follows.length > 0 && <div>
      <ul>
        {follows.map(follow => <li key={follow.id}>
          {follow.follower.email}
          <button className='btn btn-link text-danger' onClick={() => handleDelete(follow.id)}><i className='bi bi-trash'></i></button>
        </li>)}
      </ul>
    </div>}
    <div className="d-grid gap-2">
        <a href="/session" data-turbo-method='delete' className='btn btn-primary btn-lg'>Logout</a>
    </div>
  </div>
}