AI = function(owner) {
	this.owner = owner;
	this.lastMove = 0;
	this.minMoveCD = 4000;
	this.maxMoveCD = 6500;
	this.curCd = 2000;
	this.curTime = 0;
};

getRealCD = function(CD, player){
	var planetsCount = 0;
	for (var i in planets){
		var planet = planets[i];
		if (planet.owner == player){
			++planetsCount;
		}
	}
	if (planetsCount == 0) planetsCount = 1;
	return 2000 + (CD - 2000) / planetsCount;
};

AI.prototype.update = function(dt) {
	this.curTime += dt;
	if (this.curTime > this.lastMove + getRealCD(this.curCd, this.owner))
	{
		this.makeMove();
		this.lastMove = this.curTime;
		this.curCd = Math.random() * (this.maxMoveCD - this.minMoveCD) + this.minMoveCD;
	}

};
AI.prototype.makeMove = function() {
	var myPlanet = null;
	for (var i in planets){
		var planet = planets[i];
		if (planet.owner == this.owner){
			if (myPlanet == null || myPlanet.population < planet.population){
				myPlanet = planet;
			}
		}
	}
	if (!myPlanet) return;
	var targetPlanet = null;
	var targetPriority = Infinity;
	for (i in planets){
		planet = planets[i];
		if (planet.owner != this.owner){
			var priority = planet.population +
				Math.sqrt(sqr(planet.x-myPlanet.x) + sqr(planet.y - myPlanet.y)) / dronesVelocity / plusCD;
			if (targetPlanet == null || targetPriority > priority){
				targetPlanet = planet;
				targetPriority = priority;
			}
		}
	}
	if (myPlanet && targetPlanet){
		launchDrones([myPlanet],targetPlanet,0.95);
	}
};
