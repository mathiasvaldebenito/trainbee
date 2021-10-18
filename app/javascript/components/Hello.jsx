import React, { useState } from 'react';
import Santiago from './../../assets/images/comunas.svg';

const { URL } = require('./../packs/application');

function Example(props) {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [waypoints, setWaypoints] = useState([]);
  const [vehicles, setVehicles] = useState(props.vehicles);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [patent, setPatent] = useState(null);

  console.log(props.waypoints);
  console.log(props.vehicles);
  console.log(URL);

  const handleSubmmit = (e) => {
      e.preventDefault();
    
      let vehicleID;
      vehicles.forEach((vehicle) => {
        if (vehicle.patent === patent) {
          vehicleID = vehicle.id;
        }
      })

      const newWaypoint = {latitude, longitude, "vehicle_id": vehicleID};
      //const newWaypoint = {latitude, longitude, patent};
      const newVehicle = {patent};

      console.log(newVehicle);
      console.log(newWaypoint);

      // if vehicle does not exist, we register it.
      if (!vehicles.includes(newVehicle.patent)) {
        fetch(`${URL}/vehicles`, {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(newVehicle)
        }).then(() => {
          console.log("new vehicle added");
        });
      };
      
      fetch(`${URL}/waypoints`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newWaypoint)
      }).then(() =>{
        console.log("new waypoint added");
        setWaypoints(result => [...result, newWaypoint]);
      });
  }

  return (

    <>
    
    <div>
      <form onSubmit={handleSubmmit}>
        <label>Latitud:</label>
        <input
          type="text"
          required
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label>Longitud:</label>
        <input
          type="text"
          required
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <label>Patente:</label>
        <input
          type="text"
          required
          value={patent}
          onChange={(e) => setPatent(e.target.value)}
        />

        <button>Enviar</button>
      </form>
    </div>
      { waypoints.map( (waypoint) => {
        <div key={waypoint.id}>
          <span>Latitud: {waypoint.latitude}</span>
          <span>Longitud: {waypoint.longitude}</span>
          <span>Patente: {waypoint.patent}</span>
        </div>
      }) }
    <div>

    </div>

    <div className="center">
      <img src={Santiago} alt="Santiago" />
    </div>
    
    </>
  );
}

export default Example