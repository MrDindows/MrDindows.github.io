var dronesVelocity = 0.12;
Drone = function(position, target, owner, population) {
	this.x = position.x;
	this.y = position.y;
	this.owner = owner;
	this.target = target;
	this.isAlive = true;
	this.population = population;
};
Drone.prototype.assign = function(position, target, owner, population) {
	this.x = position.x;
	this.y = position.y;
	this.owner = owner;
	this.target = target;
	this.isAlive = true;
	this.population = population;
};
Drone.prototype.setPosition = function(position) {
	this.position = position;
};
Drone.prototype.setOwner = function (owner) {
	this.owner = owner;
};
Drone.prototype.setTarget = function(target) {
	this.target = target;
};

sqr = function(x){
	return x*x;
};
Drone.prototype.update = function(dt) {
	var dx = this.target.x - this.x;
	var dy = this.target.y - this.y;
	var absval = Math.sqrt(dx * dx + dy * dy);
	var coef = 1 / absval * dt * dronesVelocity * canvas.width / 1200;
	this.x += dx * coef;
	this.y += dy * coef;
	if (this.target.inCoords({x:this.x,y:this.y}))
	{
		if (this.target.owner == this.owner)
			this.target.population += this.population;
		else
		{
			this.target.population -= this.population;
			if (this.target.population < 0)
			{
				this.target.owner = this.owner;
				this.target.state = Planet.State.NORMAL;
				this.target.population *= -1;
			}
		}
		this.isAlive = false;
	}
};

