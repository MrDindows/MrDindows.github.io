Planet = function(position, r, population) {
	this.x = position.x;
	this.y = position.y;
	this.radius = r;
	this.population = population;
	this.owner = 0;
	this.state = Planet.State.NORMAL;
}
Planet.prototype.setOwner = function (owner) {
	this.owner = owner;
}
Planet.prototype.inCoords = function(pos) {
	return (pos.x-this.x)*(pos.x-this.x) + (pos.y-this.y)*(pos.y-this.y) < this.radius * this.radius;
}
Planet.prototype.update = function(dt) {
	this.population += 1;
}
Planet.prototype.mouseDown = function() {
	this.state = Planet.State.CLICKED;
}
Planet.prototype.mouseHover = function() {
	if (this.state == Planet.State.NORMAL)
		this.state = Planet.State.HOVERED;
}
Planet.prototype.mouseOut = function() {
	if (this.state == Planet.State.HOVERED)
		this.state = Planet.State.NORMAL;
}
Planet.prototype.mouseUp = function() {
	this.state = Planet.State.NORMAL;
}
Planet.State = {
	NORMAL:0,
	HOVERED:1,
	CLICKED:2,
	AIMED:3
};
