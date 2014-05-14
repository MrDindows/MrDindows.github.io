AI = function(owner) {
	this.owner = owner;
	this.lastMove = 0;
	this.minMoveCD = 3000;
	this.maxMoveCD = 6000;
	this.curCd = 2000;
	this.curTime = 0;
};
AI.prototype.update = function(dt) {
	this.curTime += dt;
	if (this.curTime > this.lastMove + this.curCd)
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
	var targetPlanet = null;
	for (var i in planets){
		var planet = planets[i];
		if (planet.owner != this.owner){
			if (targetPlanet == null || targetPlanet.population > planet.population){
				targetPlanet = planet;
			}
		}
	}
	if (myPlanet && targetPlanet){
		launchDrones([myPlanet],targetPlanet,0.95);
	}
};
