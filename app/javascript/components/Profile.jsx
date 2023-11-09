import React from 'react';

export default () => {
    return <div>
        <h1 className="display-4">Profile</h1>
        <hr className="my-4" />
        <div className="d-grid gap-2">
            <a href="/session" data-turbo-method='delete' className='btn btn-primary btn-lg'>Logout</a>
        </div>
    </div>
}