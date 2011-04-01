DeskContext = function(initParams){
    /**
     * Object to store the userDesk.
     */
    this.m_userDesk = null;
    
    this.m_userDeskController = null;
    
	this.m_userName = "";
    this.m_selectedDeskNumber = 0;
    
    this.m_currentNote = null;
    
    this.init = function(userDeskController){
        this.m_userDeskController = userDeskController;
        $(document).bind(this.m_userDeskController.getEventName("updateDesk"), {
            subObj: this
        }, this.start);
    }
    
    this.start = function(event){
        event.data.subObj.getDesksData();
    }
    
    this.getDesksData = function(){
        var deskurl = '/userDesks.json';
        $.ajax({
            url: deskurl,
            dataType: 'json',
            success: this.parseDeskData,
            context: this
        });
    }
    
    this.parseDeskData = function(deskObj, textStatus, jqXHR){
        this.m_userName = deskObj["userName"];
        this.m_userDesk = deskObj["userDesks"];
        var deskDataUpdated = false;
        if (this.m_userDesk && this.m_userDesk[0]) {
            this.m_selectedDeskNumber = 0;
            deskDataUpdated = true;
        }
        if (deskDataUpdated) {
            jQuery.event.trigger(this.m_userDeskController.getEventName("deskUpdated"));
        }
        
    }
    
    this.getSelectedDesk = function(){
        return this.m_userDesk[this.m_selectedDeskNumber];
    }
    
    this.getUserDesks = function(){
        return this.m_userDesk;
    }
    
    this.getSelectedDeskNumber = function(){
		return this.m_selectedDeskNumber;
	}
    /*this.initialUpdate = function(intialState) {
     var initialStateDesk = initialState.desks;
     for(desk in intialStateDesks){
     this.m_userDesk[desk] = new Desk();
     this.m_userDesk[desk].init(intialStateDesks[desk],desk);
     }
     }*/
}
