/**
 * The UserDeskController Is the starting point of the application js framework.Used For Initializing all the Context
 * witgets.
 */
userDeskController = function(){

    this.deskContext = null;
    this.noteContext = null;
    this.m_events = {};
    this.m_deskUpdated = false;
    this.m_noteUpdated = false;
    
    this.init = function(){
        this.defineEvents();
        this.bindEvents();
        this.deskContext = new DeskContext();
        this.noteContext = new NoteContext();
        this.deskUIWidget = new DeskUIWidget();
        this.deskContext.init(this);
        this.noteContext.init(this);
        this.deskUIWidget.init(this);
        this.start();
    }
    
    this.start = function(){
        jQuery.event.trigger(this.getEventName("updateDesk"));
    }
    
    /**
     * Defines all the Events which would be triggered by this class.
     */
    this.defineEvents = function(){
        this.m_events["updateDesk"] = "UpdateDeskEvent"; // Event to update the Desk.Listener deskContext.
        this.m_events["deskUpdated"] = "DeskUpdatedEvent"; // Event when the Desk of the User is Updated.
        this.m_events["updateNotes"] = "UpdateCurrentDeskNotesEvent" //Event to update Notes for a currennt Desk.
        this.m_events["notesUpdated"] = "CurrentDeskNotesUpdatedEvent" //Event when the Note of current Desk is updated.
    }
    
    /**
     * Returns the Event Name for the Event Passed by looking into m_events object.
     * @param {Object} event
     */
    this.getEventName = function(event){
        if (this.m_events[event]) {
            return this.m_events[event];
        }
        else {
            return null;
        }
    }
    
    this.onDeskUpdate = function(event){
        event.data.subObj.m_deskUpdated = true;
        jQuery.event.trigger(event.data.subObj.getEventName("updateNotes"))
    }
    
    this.bindEvents = function(){
        $(document).bind(this.getEventName("deskUpdated"), {
            subObj: this
        }, this.onDeskUpdate);
    }
}

var userDesk = new userDeskController();
