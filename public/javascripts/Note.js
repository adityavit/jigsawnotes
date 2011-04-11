Note = function(){
	
	this.m_deskObj = null;
	this.m_noteId = "";
	
	this.m_noteHeight = "";
	
	this.m_noteWidth = "";
	
	this.m_noteTop = "";
	this.m_noteLeft = "";
	
	this.m_noteTitle = "";
	
	this.m_noteBody = "";
	
	this.m_noteTimeStamp = null;
	
	this.init = function(noteParam,noteId,deskObj){
		if(initParams){
			this.m_initParams = initParams;
			this.m_deskId = initParams.deskId;
			this.m_noteId = initParams.noteId;
		}
	}
	
   	this.createNote = function(){
   		
   	}
   	
   	this.update(noteParam,noteId,deskObj){
   		this.m_noteId = noteId;
   		this.m_deskObj = deskObj;
   		this.m_noteTitle = noteParam["noteTitle"];
   		this.m_noteBody = noteParam["noteBody"];
   		this.m_noteTimeStamp = noteParam["noteTimeStamp"];
   	}
	
	
}