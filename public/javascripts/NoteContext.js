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
        $(document).bind(this.m_userDeskController.getEventName("addNewNote"), {
            subObj: this
        }, this.addNewNoteEventHandler);
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
    
    this.parseNotesData = function(notesObject, textStatus, jqXHR){
        var notesObj = notesObject["response"];
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

    this.updateNoteInstances = function(event,trigerData){
       var selectedDeskNo = trigerData["deskNo"];
       jQuery.event.trigger("updateNoteUIWidget"+selectedDeskNo,trigerData);
    }
    this.selectedDeskNotesData = function(){
        return this.m_currentNotesData;
    }
    
    this.addNewNoteEventHandler = function(event){
        event.data.subObj.addNewNote();
    }
    this.addNewNote = function(){
        var selectedDeskId = this.m_currentDesk["deskId"];
        var addNoteUrl = '/note/new/' + selectedDeskId;
        $.ajax({
            url: addNoteUrl,
            dataType: 'json',
            success: this.addNewNoteData,
            context: this
        });
    }

    this.addNewNoteData = function(notesObject, textStatus, jqXHR){
        if (notesObject["status"] == "success") {
            noteObj = notesObject["response"];
            var selectedDeskId = this.m_currentDesk["deskId"];
            var notesObjDeskId = noteObj["deskId"];
            if (selectedDeskId == notesObjDeskId) {
                this.m_currentNotesData.push(noteObj["deskNote"]);
            }
            else 
                if (this.m_deskNotes[notesObjDeskId]) {
                    this.m_deskNotes[notesObjDeskId].push(noteObj["deskNote"]);
                }
                else {
                    this.m_deskNotes[notesObjDeskId] = [];
                    this.m_deskNotes[notesObjDeskId].push(noteObj["deskNote"]);
                }
           
         jQuery.event.trigger(this.m_userDeskController.getEventName("addNewNoteInstance"),{"noteObj":noteObj["deskNote"]});
        }
        else {
            alert("New note cannot be added currently");
        }
    }
}
