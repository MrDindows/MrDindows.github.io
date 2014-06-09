StateMachine = function(){
	console.log(this);
	this.currentState = GameState.GAME;
	this.previousState = GameState.GAME;
};

StateMachine.prototype.setState = function(gameState){
	if (this.currentState != gameState){
		this.previousState = this.currentState;
		this.currentState = gameState;
	}
	console.log(this);
};

StateMachine.prototype.returnToPreviousState = function(){
	if (this.previousState){
		var t = this.currentState;
		this.currentState = this.previousState;
		this.previousState = t;
	}
};

GameState = {
	GAME:0,
	PAUSE:1,
	WON:2,
	LOSE:4
};