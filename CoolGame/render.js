render = function() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,screen.width,screen.height);
	ctx.drawImage(bgPicture,0,0);//,screen.width,screen.height);
	for(var i in planets)
	{ 
		var planet = planets[i];
		ctx.drawImage(planets[i].image,planet.x-planet.radius,planet.y-planet.radius,planet.radius*2,planet.radius*2);
		ctx.beginPath();
		if (planet.state == Planet.State.HOVERED)
		{
			ctx.fillStyle = teamHoveredColors[planet.owner];
		}
		else
		{
			ctx.fillStyle = teamPlanetColors[planet.owner];
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
      	ctx.textAlign = 'center';
		ctx.fillStyle = "black";
		ctx.font = "bold 16px Arial";
		ctx.fillText(planet.population, planet.x, planet.y+5);
		ctx.closePath();
	}
	if (target != null && selectedPlanets.length > 1 || fillingTime > 0){
		var percent = fillingTime / fullFillTime;
		percent >>= 0;
		if (percent > 100) percent = 100;
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.font = "bold 16px Arial";
		ctx.fillText(percent, target.x, target.y-target.radius - 5);
		ctx.closePath();
	}

	for (var i in drones)
	{
		var drone = drones[i];
		if (!drone.isAlive) continue;
		ctx.drawImage(droneImage,drone.x-2,drone.y-2,4,4);
		ctx.beginPath();
		ctx.arc(drone.x,drone.y,4,0,Math.PI*2,false);
		ctx.fillStyle = teamDronesColors[drone.owner];
		ctx.fill();
		ctx.closePath();
	}
	if (gameIsPaused){

		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.fillRect(0,0,screen.width,screen.height);
		ctx.fillStyle = "white";
		ctx.font = "bold 50px Arial";
      	ctx.textAlign = 'center';
		ctx.fillText('PAUSE', canvas.width/2, canvas.height/2);
	}
};
