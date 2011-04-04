DeskUIWidget = function(initParams){

    this.m_userDeskController = null;
    
    this.m_deskContext = null;
    
    this.m_notesContext = null;
    
    this.m_initialUILoaded = false;
    
    this.m_deskDivContainerId = "deskContainer";
    
    this.m_deskConatinerTitle = "My Desks";
    
    this.m_selectedDeskElem = null;
    
    this.init = function(userDeskController){
        this.m_userDeskController = userDeskController;
        this.m_deskContext = userDeskController.deskContext;
        this.m_notesContext = userDeskController.notesContext;
        $(document).bind(this.m_userDeskController.getEventName("deskUpdated"), {
            subObj: this
        }, this.update);
    }
    
    
    this.update = function(event){
        event.data.subObj.loadUI();
        event.data.subObj.refreshUI();
    }
    
    this.loadUI = function(){
        if (!this.m_initialUILoaded) {
            $("#deskContainerTitle").text(this.m_deskConatinerTitle);
            this.m_initialUILoaded = true;
        }
    }
    
    this.refreshUI = function(){
        var userDesks = this.m_deskContext.getUserDesks();
        var selectedDeskNo = this.m_deskContext.getSelectedDeskNumber();
        var deskPanel = $("#deskPanel");
        for (var desk in userDesks) {
            var deskElem = $(deskPanel).children(".deskItem:first").clone();
            deskElem.removeClass("deskItemTemplate");
            if (desk == selectedDeskNo) {
                deskElem.addClass("selectedDesk");
                this.m_selectedDeskElem = deskElem;
            }
            deskElem.data("deskNumber", desk);
            deskElem.bind('click',{
                subObj: this
            }, this.switchDesk);
            if (userDesks[desk]["deskName"]) 
                deskElem.children(".deskName").text(userDesks[desk]["deskName"]);
            if (userDesks[desk]["deskDescription"]) 
                deskElem.children(".deskDesc").text(userDesks[desk]["deskDescription"]);
            deskPanel.append(deskElem);
        }
    }
    
    this.switchDesk = function(event){
        var clickedDeskNo = $(this).data("deskNumber");
        var selectedDeskNo = event.data.subObj.m_deskContext.getSelectedDeskNumber();
        if (selectedDeskNo != clickedDeskNo) {
            jQuery.event.trigger("hideNoteUIWidget"+selectedDeskNo);
            event.data.subObj.m_selectedDeskElem.removeClass("selectedDesk");
            $(this).addClass("selectedDesk");
            event.data.subObj.m_selectedDeskElem = $(this);
            jQuery.event.trigger(event.data.subObj.m_userDeskController.getEventName("switchUserDesk"),{"selectedDeskNo":clickedDeskNo});
        }
        else {
            return false;
        }
    }
    this.attachActions = function(){
    
    }
}
