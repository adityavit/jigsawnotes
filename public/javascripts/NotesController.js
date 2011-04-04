
NotesController = function(initParams){
    this.m_userDeskController = null;
    
    this.m_deskContext = null;
    
    this.m_noteContext = null;

    this.m_notesUIInstances = {}; 

    
    this.init = function(userDeskController){
        this.m_userDeskController = userDeskController;
        this.m_noteContext = userDeskController.noteContext;
        this.m_deskContext = userDeskController.deskContext;
        $(document).bind(this.m_userDeskController.getEventName("notesUpdated"), {
            subObj: this
        }, this.updateNoteController);
    }
    this.updateNoteController = function(event){
        event.data.subObj.createNoteUIWidgetInstances();
    }

    this.createNoteUIWidgetInstances = function(){
        var selectedDeskNotesObj = this.m_noteContext.selectedDeskNotesData();
        var selectedDeskNo = this.m_deskContext.getSelectedDeskNumber();
        if (!this.m_notesUIInstances[selectedDeskNo]) {
            var noteUIInstanceArr = [];
            for (note in selectedDeskNotesObj) {
                var noteInstance = new NoteUIWidget(selectedDeskNotesObj[note], selectedDeskNo);
                noteUIInstanceArr.push(noteInstance);
            }
            this.m_notesUIInstances[selectedDeskNo] = noteUIInstanceArr;
        }
        jQuery.event.trigger(this.m_userDeskController.getEventName("noteUIInstancesUpdated"));
    }
}
