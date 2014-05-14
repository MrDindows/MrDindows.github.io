// Wait till the browser is ready to render the game (avoids glitches)

var time;
var canvas;
var ctx;
var planets = [];
var drones = [];
var AIs = [];
var teamColors = ["#555555","#CC1111","#11CC11"];
var teamHoveredColors = ["#888888","#FF2222","#22FF22"];
var teamCircleColors = ["#555555","#CC1111","#11CC11"];

var plusCD = 300.0;

sqr = function(x){
	return x*x;
}

initialize = function () {
	time = Date.now();
	canvas = document.getElementById('canva');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	ctx = canvas.getContext('2d');
	resetGame();
	requestAnimFrame(update);
	console.log('Ready, stady, GOOO!!!');
};

window.requestAnimFrame = (function () {
	return window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (callback) {
		window.setTimeout(callback, 0.05);
	};
})();

resetGame = function() { 
	var planetsCount = 9;
	planets = [];
	drones = [];
	var coef = canvas.width / 1200;
	var minR = 40 * coef;
	var maxR = 80 * coef;
	var indent = 100 * coef;
	var maxX = canvas.width - 2*indent;
	var maxY = canvas.height - 2*indent;
	for(var i=0;i<planetsCount;++i){
		var x = indent + Math.random() * maxX;
		var y = indent + Math.random() * maxY;
		var r = Math.random() * (maxR - minR) + minR;
		var ok = true;
		for (var j=0;j<i;++j){
			if (sqr(x-planets[j].x)+sqr(y-planets[j].y)<sqr(r+planets[j].radius+indent/2)){
				ok = false;
				break;
			}
		}
		if (!ok){
			--i;
		}
		else
		{
			planets[i] = new Planet(
				{x:x,y:y},
				r,
				Math.round(5+Math.random()*10));
		}
	}
	AIs = [new AI(2)];
	planets[0].setOwner(1);
	planets[8].setOwner(2);
};

var plusTime = 0;
update = function() {
	var t = Date.now();
	var dt = t - time;
	time = t;
	plusTime += dt;
	while (plusTime >= plusCD)
	{
		plusTime -= plusCD;
		for (var i in planets)
		{
			var planet = planets[i];
			if (planet.owner != 0)
			{
				planet.population++;
			}
		}
	}
	for (var i in drones)
	{
		var drone = drones[i];
		if (drone.isAlive)
		{
			drone.update(dt);
		}
	}
	AIs[0].update(dt);
	render();
	requestAnimFrame(function(){update(dt);});
};


launchDrones = function(sourcePlanets, targetPlanet, percent){
	var cur = 0;
	for (var i in sourcePlanets)
	{
		var planet = sourcePlanets[i];
		var count = (planet.population * percent + 0.95)>>0;
		var p = ((count +49)/ 50)>>0;
		var q = ((count + p - 1) / p)>>0;
		var e = count;
		for (var j=0;j<q;++j)
		{
			while (cur < drones.length && drones[cur].isAlive) ++cur;
			if (cur == drones.length)
			{
				drones.push(new Drone({x:0,y:0}));
			}
			var angle = 2 * Math.PI * j / q;
			var d = planet.radius + 5;
			var pos = {x: planet.x + d * Math.sin(angle), y : planet.y + d * Math.cos(angle)};
			drones[cur].assign(pos,targetPlanet,planet.owner,Math.min(p,e));
			e -= p;
		}
		planet.population -= count;
	}
};

window.requestAnimationFrame(function () {
	initialize();
});

div = function(x, y){
	return (x/y)>>0;
};

