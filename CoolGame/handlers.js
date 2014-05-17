
var mousePressed = false;
var mouseTargeted = false;
var selectedPlanets = [];
var fullFillTime = 7;
var fillingTime = 0;
var target = null;
var aimedPlanet = null;

updateTargeting = function(dt)
{
	if (aimedPlanet == null)
	{
		fillingTime = 0;
		target = null;
	}
	else if (aimedPlanet != target)
	{
		fillingTime = 0;
		target = aimedPlanet;
	}
	else
	{
		if (selectedPlanets.length == 0 || selectedPlanets.length == 1 && selectedPlanets[0] == aimedPlanet)
		{
			target = null;
			fillingTime = 0;
		}
		else
		{
			fillingTime += dt;
		}
	}
};

window.onmousemove = function(e)
{
	var elPos = { X:canvas.offsetLeft , Y:canvas.offsetTop };
	var mPos  = { x:e.clientX-elPos.X, y:e.clientY-elPos.Y };
	aimedPlanet = null;
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
			aimedPlanet = planet;
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
			var percent = 0.01 * fillingTime / fullFillTime ;
			if (percent > 1) percent = 1;
			launchDrones(selectedPlanets,planet,percent);
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