render = function() {
	ctx.fillStyle = "#130310";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for(var i in planets)
	{ 
		var planet = planets[i];
		ctx.beginPath();
		if (planet.state == Planet.State.HOVERED)
		{
			ctx.fillStyle = teamHoveredColors[planet.owner];
		}
		else
		{
			ctx.fillStyle = teamColors[planet.owner];
		}
		ctx.arc(planet.x,planet.y,planet.radius,0,Math.PI*2,false);
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.closePath();
		if (planet.state == Planet.State.CLICKED)
		{
			ctx.beginPath();
			ctx.arc(planet.x,planet.y,planet.radius+9,0,Math.PI*2,false);
			ctx.strokeStyle = teamCircleColors[1];
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.closePath();
		}

		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = "bold 16px Arial";
		ctx.fillText(planet.population, planet.x-10, planet.y+5);
		ctx.closePath();
	}
	if (target != null && selectedPlanets.length > 1 || fillingTime > 0){
		var percent = fillingTime / fullFillTime;
		percent >>= 0;
		if (percent > 100) percent = 100;
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.font = "bold 16px Arial";
		ctx.fillText(percent, target.x-10, target.y-target.radius - 5);
		ctx.closePath();
	}

	for (var i in drones)
	{
		var drone = drones[i];
		if (!drone.isAlive) continue;
		ctx.beginPath();
		ctx.arc(drone.x,drone.y,4,0,Math.PI*2,false);
		ctx.fillStyle = teamColors[drone.owner];
		ctx.fill();
		ctx.closePath();
	}
};
