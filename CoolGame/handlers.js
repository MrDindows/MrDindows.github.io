
var mousePressed = false;
var selectedPlanets = [];
var fullFillTime = 1500;
var fillingTime = 0;
window.onmousemove = function(e)
{
	var elPos = { X:canvas.offsetLeft , Y:canvas.offsetTop };
	var mPos  = { x:e.clientX-elPos.X, y:e.clientY-elPos.Y };
	for (var i in planets)
	{
		var planet = planets[i];
		if (planet.inCoords(mPos))
		{
			planet.mouseHover();
			if (mousePressed && planet.owner == 1)
			{
				if (selectedPlanets.indexOf(planet) == -1)
				{
					selectedPlanets.push(planet);
					planet.state = Planet.State.CLICKED;
				}
			}
		}
		else
		{
			planet.mouseOut();
		}
	}
};
window.onmousedown = function(e){
	selectedPlanets = [];
	var elPos = { X:canvas.offsetLeft , Y:canvas.offsetTop };
	var mPos  = { x:e.clientX-elPos.X, y:e.clientY-elPos.Y };
	for (var i in planets)
	{
		var planet = planets[i];
		if (planet.inCoords(mPos))
		{
			if (mousePressed && planet.owner == 1)
			{
				if (selectedPlanets.indexOf(planet) == -1)
				{
					selectedPlanets.push(planet);
					planet.state = Planet.State.CLICKED;
				}
			}
		}
		else
		{
			planet.mouseOut();
		}
	}
	mousePressed = true;
};
window.onmouseup = function(e){
	mousePressed = false;

	var elPos = { X:canvas.offsetLeft , Y:canvas.offsetTop };
	var mPos  = { x:e.clientX-elPos.X, y:e.clientY-elPos.Y };
	if (selectedPlanets.length > 0)
	{
		var targetPlanet = null;
		for (var i in planets)
		{
			var planet = planets[i];
			if (planet.inCoords(mPos))
			{
				targetPlanet = planet;
				break;
			}
		}
		if (targetPlanet != null)
		{
			var ind = selectedPlanets.indexOf(targetPlanet);
			if (ind != -1)
			{
				selectedPlanets.splice(ind,1);
			}
			launchDrones(selectedPlanets,planet,1);
			targetPlanet.state = Planet.State.NORMAL;
		}
		for (var i in selectedPlanets)
		{
			var planet = selectedPlanets[i];
			planet.state = Planet.State.NORMAL;
		}
	}
	selectedPlanets = [];
};