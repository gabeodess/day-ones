import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default () => {
  const handleNotifications = () => {    
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: window.vapidPublicKey
      }).then(() => {
        serviceWorkerRegistration.pushManager.getSubscription().then((subscription) => {
          if(subscription) {
            const {endpoint, keys: {auth, p256dh}} = subscription.toJSON();
            fetch('/pushers', {
              method: 'post',
              body: JSON.stringify({pusher: {endpoint, auth, p256dh}}),
              headers: {"Content-Type": "application/json"},  
            });
          }
        });
      });        
    });  
  }

  useEffect(() => {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Permission to receive notifications has been granted");
      handleNotifications()
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          console.log("Permission to receive notifications has been granted (asked)");
          handleNotifications()
        }
      });
    }
  }, [])

  return <div>
    <div className="container">
      <Outlet />
    </div>
    <nav className="navbar fixed-bottom bg-body-tertiary">
      <div className="container-fluid justify-content-around">
        <Link className='fs-1 btn btn-outline-secondary border-0' to="/"><i className="bi bi-calendar"></i></Link>
        <Link className='fs-1 btn btn-outline-secondary border-0' to="/day-ones/new"><i className="bi bi-plus-square"></i></Link>
        <Link className='fs-1 btn btn-outline-secondary border-0' to="/profile" title='Profile'><i className="bi bi-person"></i></Link>
      </div>
    </nav>
  </div>
}