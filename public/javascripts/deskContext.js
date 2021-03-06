DeskContext = function deskContext(initParams){
    /**
     * Object to store the userDesk.
     */
    this.m_userDesk = null;
    
    this.m_userDeskController = null;
    
    this.m_userName = "";
    this.m_selectedDeskNumber = 0;
    
    
    this.init = function(userDeskController){
        this.m_userDeskController = userDeskController;
        $(document).bind(this.m_userDeskController.getEventName("updateDesk"), {
            subObj: this
        }, this.start);
        $(document).bind(this.m_userDeskController.getEventName("switchUserDesk"), {
            subObj: this
        }, this.updatedSelectedDesk);
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
    this.getSelectedDeskId = function(){
        return this.m_userDesk[this.m_selectedDeskNumber]["deskId"];
    }
    this.getUserDesks = function(){
        return this.m_userDesk;
    }
    
    this.getSelectedDeskNumber = function(){
        return this.m_selectedDeskNumber;
    }
    
    this.updatedSelectedDesk = function(event, deskObj){
        event.data.subObj.m_selectedDeskNumber = deskObj["selectedDeskNo"];
    }
}
