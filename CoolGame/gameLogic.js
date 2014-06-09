
var plusTime = 0;
var step = 0;
update = function() {
	++step;
	if (step % 2 == 1){
		if (stateMachine.currentState == GameState.GAME){
			var t = Date.now();
			var dt = t - time;
			time = t;
			plusTime += dt;
			while (plusTime >= plusCD)
			{
				plusTime -= plusCD;
				for (i in planets)
				{
					planet = planets[i];
					if (planet.owner != 0)
					{
						planet.population++;
					}
				}
			}
			var enemyDrones = 0;
			var myDrones = 0;
			for (i in drones)
			{
				var drone = drones[i];
				if (drone.isAlive){
					if (drone.owner == 1){
						myDrones++;
					} else {
						enemyDrones++;
					}
					drone.update(dt);

				}
			}
			updateTargeting(dt);
			for (i in AIs)
			{
				AIs[i].update(dt);
			}
			var enemyPlanets = 0;
			var myPlanets = 0;
			for (var i in planets){
				var planet = planets[i];
				if (planet.owner > 1){
					enemyPlanets++;
				} else if (planet.owner == 1){
					myPlanets++;
				}
			}
			if (enemyPlanets == 0 && enemyDrones == 0){
				stateMachine.setState(GameState.WON);
			} else if (myPlanets == 0 && myDrones == 0){
				stateMachine.setState(GameState.LOSE);
			}

		}
		render();
	}
	requestAnimFrame(function(){update(dt);});
};


launchDrones = function(sourcePlanets, targetPlanet, percent){
	var cur = 0;
	for (var i in sourcePlanets)
	{
		var planet = sourcePlanets[i];
		if (planet == null) continue;
		var count = (planet.population * percent + 0.95)>>0;
		var p = ((count + 40 - 1)/ 40)>>0;
		var q = ((count + p - 1) / p)>>0;
		var e = count;
		var baseAngle = Math.atan2(targetPlanet.x - planet.x, targetPlanet.y - planet.y);
		for (var j=0;j<q;++j)
		{
			while (cur < drones.length && drones[cur].isAlive) ++cur;
			if (cur == drones.length)
			{
				drones.push(new Drone({x:0,y:0}));
			}
			var angle = baseAngle + 1.2 * Math.PI * (j - q/2) / q;
			if (angle < 0) angle += 2 * Math.PI;
			if (angle > 2 * Math.PI) angle -= 2 * Math.PI;
			var d = planet.radius + 5;
			var pos = {x: planet.x + d * Math.sin(angle), y : planet.y + d * Math.cos(angle)};
			drones[cur].assign(pos,targetPlanet,planet.owner,Math.min(p,e));
			e -= p;
		}
		planet.population -= count;
	}
};


