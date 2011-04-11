package models;

public class DeskJson {

     public String deskName;
     public String deskId;
     public String deskDescription;
     
     public DeskJson(Desk userDesk){
         this.deskName = userDesk.deskName;
         this.deskId = userDesk.id.toString();
         this.deskDescription = userDesk.deskDescription;
     }
}
