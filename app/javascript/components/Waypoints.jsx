import React, { useState } from 'react';
import Santiago from './../../assets/images/comunas.svg';
import Pointer from './../../assets/images/location-icon.svg';

const { URL } = require('./../packs/application');

function Waypoints(props) {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [waypoints, setWaypoints] = useState([]);
  const [vehicles, setVehicles] = useState(props.vehicles);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [patent, setPatent] = useState(''); 

  const [pointerXY, setPointerXY] = useState({transform: "translate(0px, 0px)", display: "none"});


  const handleSubmmit = async (e) => {
      e.preventDefault();
    
      let vehicle = null;
      vehicles.forEach((item) => {
        if (item.patent === patent) {
          vehicle = item;
          console.log(vehicle);
        }
      })

      if (!vehicle) {
        console.log("no está registrado");
        const response = await fetch(`${URL}/vehicles`, {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({'patent': patent})
        });
        if (response.ok){
          vehicle = await response.json();
        }
        setVehicles(result => [...result, vehicle]);
      }
    
      const newWaypoint = {latitude, longitude, "vehicle_id": vehicle.id};

      fetch(`${URL}/waypoints`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newWaypoint)
      }).then(() =>{
        setWaypoints(result => [...result, newWaypoint]);
        setPointerXY({transform: `translate(${latitude}px, ${longitude}px)`});
      });
  }

  return (

    <>
    <div className="box">
        <div className="form center">
          <h2>Registra un Waypoint!</h2>
          <form onSubmit={handleSubmmit}>
            <label className="label-form">Latitud</label>
            <input
              type="text"
              required
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <label className="label-form">Longitud</label>
            <input
              type="text"
              required
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <label className="label-form">Patente</label>
            <input
              type="text"
              required
              value={patent}
              onChange={(e) => setPatent(e.target.value)}
            />
            <div className="center">
              <button className="btn">Enviar</button>
            </div>
          </form>
          <div>
            <h2>Vehiculos registrados</h2> 
            <ul>
              { vehicles.map((vehicle) => (
                <li>{vehicle.patent}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <img src={Pointer} alt="Pointer" style={pointerXY}/>
          <img src={Santiago} alt="Santiago" />
        </div>
        <div className="form">
          <table className="center">
            <thead>
              <tr>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>Patente</th>
              </tr>
            </thead>
            <tbody>
              { waypoints.map((waypoint) => (
                <tr key={waypoint.id}>
                  <td>{waypoint.latitude}</td>
                  <td>{waypoint.longitude}</td>
                  <td>{waypoint.vehicle_id}</td>
                </tr>
                )) 
              }
            </tbody>
          </table>
        </div>
    </div>
    
    </>
  );
}

export default Waypoints