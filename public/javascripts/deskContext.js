DeskLoader = function(){
	/**
	 * Object to store the userDesk. 
	 */
	this.m_userDesk = new Array();
	
	/**
	 * Object to store the Notes for the desk.
	 */
	this.m_deskNotes = new Array();
	
	this.m_currentDesk = null;
	
	this.m_currentNote = null;
	
	this.init = function(intialState){
		this.initialUpdate(intialState);
	}
	
	
	this.initialUpdate = function(intialState) {
		var initialStateDesk = initialState.desks;
		for(desk in intialStateDesks){
			this.m_userDesk[desk] = new Desk();
			this.m_userDesk[desk].init(intialStateDesks[desk],desk);
		}
	}
}