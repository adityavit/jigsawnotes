var NoteUIWidget = function(noteData, deskNo){
    this.m_noteDataObj = noteData;
    this.m_deskNo = deskNo;
    this.m_initialUILoaded = false;
    this.m_noteDomElement = null;
    this.init = function(){
        $(document).bind("updateNoteUIWidget" + this.m_deskNo, {
            subObj: this
        }, this.updateNoteWidget);
        $(document).bind("hideNoteUIWidget" + this.m_deskNo, {
            subObj: this
        }, this.hideNoteWidget);
    }
    /**
     * To make the update of a particular desk Note.noteId may passed 
     * @param {Object} event
     * @param {Object} triggerData
     */
    this.updateNoteWidget = function(event, triggerData){
        if (triggerData && triggerData["noteId"] && triggerData["noteId"] != event.data.subObj.m_noteDataObj["id"]) {
            return;
        }
        else {
            event.data.subObj.loadUI();
            event.data.subObj.refreshUI();
            event.data.subObj.show();
        }
    }

    this.loadUI = function(){
        if (!this.m_initialUILoaded) {
            this.m_noteDomElement = $('.noteItemTemplate').clone();
            this.m_noteDomElement.removeClass('noteItemTemplate');
            $('.notesContainer').append(this.m_noteDomElement);
            if (this.m_noteDataObj["title"]) 
                $(this.m_noteDomElement).children('.noteHeader').children('.noteTitle').text(this.m_noteDataObj["title"]);
            if (this.m_noteDataObj["body"]) 
                $(this.m_noteDomElement).children('.noteBody').text(this.m_noteDataObj["body"]);
            if (this.m_noteDataObj["timeStamp"]) 
                $(this.m_noteDomElement).children('.noteTimeStamp').text(this.m_noteDataObj["timeStamp"]);
            this.m_initialUILoaded = true;
        }
    }
    this.refreshUI = function(){
    }
    
    this.hideNoteWidget = function(event){
        event.data.subObj.hide();
    }

    this.hide = function(){
       $(this.m_noteDomElement).addClass("hideNoteClass");
    }
    this.show = function(){
       $(this.m_noteDomElement).removeClass("hideNoteClass");
    }
    this.init();
}
