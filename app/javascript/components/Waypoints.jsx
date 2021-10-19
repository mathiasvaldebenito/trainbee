import React, { useState } from 'react';
import Santiago from './../../assets/images/comunas.svg';
import Pointer from './../../assets/images/location-icon.svg';
import apiService from './services';

const { URL } = require('./../packs/application');

function Waypoints(props) {
  const [waypoints, setWaypoints] = useState([]);
  const [vehicles, setVehicles] = useState(props.vehicles);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [patent, setPatent] = useState(''); 
  const [pointerXY, setPointerXY] = useState({transform: "translate(0px, 0px)", display: "none"});


  const handleSubmmit = async (e) => {
      e.preventDefault();
      let vehicle = apiService.existVehicle(vehicles, patent);
      if (!vehicle) {
        vehicle = await apiService.registerVehicle(URL, patent)
        setVehicles(result => [...result, vehicle]);
      }
      const newWaypoint = await apiService.registerWaypoint(URL, 
                  {latitude, longitude, "vehicle_id": vehicle.id});      
      setWaypoints(result => [...result, newWaypoint]);
      setPointerXY({transform: `translate(${newWaypoint.latitude}px, ${newWaypoint.longitude}px)`});
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
          <div className="bitacora">
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
          <img src={Santiago} alt="Santiago" className="map"/>
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
                  <td>{waypoint.patent}</td>
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