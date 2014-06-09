// Wait till the browser is ready to render the game (avoids glitches)

var time;
var canvas;
var ctx;
var planets = [];
var drones = [];
var AIs = [];
/*
var teamColors = ["#555555","#CC1111","#11CC11"];
var teamHoveredColors = ["#888888","#FF2222","#22FF22"];
*/
var teamDronesColors =  ["rgba(85,85,85,0.5)","rgba(234,17,17,0.5)","rgba(17,204,17,0.5)","rgba(17,17,204,0.5)","rgba(255,255,4,0.5)","rgba(205,0,205,0.5)"];
var teamPlanetColors =  ["rgba(85,85,85,0.5)","rgba(234,17,17,0.5)","rgba(17,204,17,0.5)","rgba(17,17,204,0.5)","rgba(255,255,4,0.5)","rgba(205,0,205,0.5)"];
var teamHoveredColors = ["rgba(85,85,85,0.5)","rgba(234,17,17,0.5)","rgba(17,204,17,0.5)","rgba(17,17,204,0.5)","rgba(255,255,4,0.5)","rgba(205,0,205,0.5)"];

var teamCircleColors = ["#555555","#CC1111","#11CC11", "#1111CC", "#11BE88"];
var planetPicture = "images/s_image";
var planetPicturesCount = 3;
var bgPicture;
var droneImageSrc = "images/drone.png";
var droneImage;

var planetsCount = 11;

var gameIsPaused = false;

var plusCD = 300.0;

var playersCount = 3;

var hardness = 1;

var stateMachine;

randomInt = function(x){
	return (Math.random()*x)>>0;
};
randomIntInRange = function(l,r){
	return ((Math.random()*(r-l+1)+l)>>0);
};
sqr = function(x){
	return x*x;
};


initialize = function () {
	canvas = document.getElementById('canva');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	ctx = canvas.getContext('2d');

	bgPicture = new Image();
	bgPicture.src = 'images/bg.jpg';

	droneImage = new Image();
	droneImage.src = droneImageSrc;


	stateMachine = new StateMachine();
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
	$('input').each(function(){
  		$(this).trigger('blur');
 	});
	$('button').each(function(){
  		$(this).trigger('blur');
 	});
	time = Date.now();
	stateMachine.setState(GameState.GAME);
	planets = [];
	drones = [];
	playersCount = $("#playersCount").val();
	var hardType = $("#hardnessInput").val();
	switch(hardType){
		case 'easy': hardness = 1.8; break;
		case 'medium' : hardness = 1.3; break;
		case 'hard': hardness = 0.8; break;
		default: hardness = 1.3; break;
	}
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
		planets[i].image = new Image();
		planets[i].image.src = planetPicture + randomIntInRange(1, planetPicturesCount) +".png";
	}
	AIs = [];
	for (i=2;i<=playersCount;++i)
	{
		AIs[i] = new AI(i);
	}
	for (i=1;i<=playersCount;++i)
	{
		planets[i].setOwner(i);
	}
};

pause = function() {
	$('input').each(function(){
  		$(this).trigger('blur');
 	});
	$('button').each(function(){
  		$(this).trigger('blur');
 	});

	if (stateMachine.currentState == GameState.GAME) {
		stateMachine.setState(GameState.PAUSE);
	} else if (stateMachine.currentState == GameState.PAUSE) {
		stateMachine.setState(GameState.GAME);
	}

	gameIsPaused = !gameIsPaused;
	if (gameIsPaused){

	}
	else {
		time = Date.now();
	}
};




window.requestAnimationFrame(function () {
	initialize();
});

div = function(x, y){
	return (x/y)>>0;
};

