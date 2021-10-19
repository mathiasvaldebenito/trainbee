async function registerVehicle(URL, patent){
    const response = await fetch(`${URL}/vehicles`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({'patent': patent})
    });
    const vehicle = await response.json();
    return vehicle;
}

async function registerWaypoint(URL, waypoint){
    const response = await fetch(`${URL}/waypoints`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(waypoint)
      });
    const result = await response.json();
    return result;
}

function existVehicle(vehicles, patent){
    let vehicle = null;
    vehicles.forEach((item) => {
        if (item.patent === patent) {
            vehicle = item;
            console.log(vehicle);
        }
    })
    return vehicle;
}

export default {
    registerVehicle,
    registerWaypoint,
    existVehicle
  };