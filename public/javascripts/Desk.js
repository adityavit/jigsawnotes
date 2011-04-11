Desk = function(){
	
	this.m_deskId = null;
	
	this.m_noOfNotes = null;
	
	this.m_deskName = "";
	
	this.m_deskDescription = "";
	
	this.m_deskDivIdBase = 
	
	this.m_deskNoteObj = new Array();
	
	this.init = function(deskState,deskId){
		this.update(deskState, deskId);
	}
	
	this.createDeskNote = function(){
		
	}
	
	this.update = function(deskState,deskId){
		this.m_deskId = deskId;
		this.m_deskName = deskState["deskName"];
		this.m_deskDescription = deskState["deskDescription"];
		var deskNotes = deskState.deskNotes;
		for(note in deskNotes){
			this.m_deskNoteObj[note] = new Note();
			this.m_deskNoteObj[note].init(deskNotes[note],note,this);
		}
	}
	
	this.attachActions = function(){
		
	}
}