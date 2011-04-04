NoteContext = function(initParams){

    this.m_userDeskController = null;
    
    this.m_deskContext = null;
    
    this.m_currentNotesData = null;
    
    this.m_deskNotes = {};
    
    this.m_currentDesk = null;
    
    this.init = function(userDeskController){
        this.m_userDeskController = userDeskController;
        this.m_deskContext = userDeskController.deskContext;
        $(document).bind(this.m_userDeskController.getEventName("updateNotes"), {
            subObj: this
        }, this.start);
        $(document).bind(this.m_userDeskController.getEventName("switchUserDesk"), {
            subObj: this
        }, this.getNotesData);
        $(document).bind(this.m_userDeskController.getEventName("noteUIInstancesUpdated"), {
            subObj: this
        }, this.updateNoteInstances);
    }
    
    this.start = function(event){
        event.data.subObj.updateNotesData();
    }
    
    this.getNotesData = function(event,deskObj){
        event.data.subObj.updateNotesData();
    }
    
    this.updateNotesData = function(){
        this.m_currentDesk = this.m_deskContext.getSelectedDesk();
        var currentDeskId = this.m_currentDesk["deskId"];
        if (this.m_deskNotes[currentDeskId]) {
            this.m_currentNotesData = this.m_deskNotes[currentDeskId];
            jQuery.event.trigger(this.m_userDeskController.getEventName("notesUpdated"));
        }
        else {
            var notesurl = '/deskNotes.json/' + currentDeskId;
            $.ajax({
                url: notesurl,
                dataType: 'json',
                success: this.parseNotesData,
                context: this
            });
        }
    }
    
    this.parseNotesData = function(notesObj, textStatus, jqXHR){
        var notesObjDeskId = notesObj["deskId"];
        var notesData = notesObj["deskNotes"];
        if (!this.m_deskNotes[notesObjDeskId]) {
            this.m_deskNotes[notesObjDeskId] = notesData;
        } 
        var currentDeskId = this.m_currentDesk["deskId"];
        if (currentDeskId == notesObjDeskId) {
            this.m_currentNotesData = notesData;
        }
        jQuery.event.trigger(this.m_userDeskController.getEventName("notesUpdated"));
    }

    this.updateNoteInstances = function(event){
       var selectedDeskNo = event.data.subObj.m_deskContext.getSelectedDeskNumber();
       jQuery.event.trigger("updateNoteUIWidget"+selectedDeskNo);
    }
    this.selectedDeskNotesData = function(){
        return this.m_currentNotesData;
    }
    
}
