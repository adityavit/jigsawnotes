import org.junit.*;
import java.util.*;
import play.test.*;
import models.*;

public class BasicTest extends UnitTest {

    @Before
    public void setup() {
        Fixtures.deleteAll();
    }
    
    @Test
    public void createUserTest(){
        User newUser = new User("adityavit@gmail.com","test","adityavit");
        newUser.persistNewUser();
        User checkUser = User.find("byEmail","adityavit@gmail.com").first();
        Desk userDesk = Desk.find("byDeskUser",checkUser).first();
        assertNotNull(checkUser);
        assertNotNull(checkUser.desks);
        assertEquals("My Desk", userDesk.deskName);
        assertEquals("My Desk", checkUser.desks.get(0).deskName);
        assertEquals("adityavit", checkUser.userName);
    }
    
    @Test
    public void validateUserByEmailorUserName(){
        new User("adityavit@gmail.com","test","adityavit").save();
        new User("check@gmail.com","test","check").save();
        
        assertNotNull(User.validateUser("adityavit@gmail.com", "test"));
        assertNotNull(User.validateUser("adityavit", "test"));
        assertNull(User.validateUser("adityavit1", "test"));
    }
    
    @Test
    public void createCustomDeskTest(){
        User newUser = new User("adityavit@gmail.com","test","adityavit");
        newUser.persistNewUser();
        newUser.addUserDesk("My office Desk",newUser,"This is a Desk for my office Notes");
        List<Desk> userDesks = Desk.find("byDeskUser",newUser).fetch();
        assertEquals(2,newUser.desks.size());
        assertEquals(2,userDesks.size());
        assertEquals("My office Desk",userDesks.get(1).deskName);
        assertEquals("This is a Desk for my office Notes",userDesks.get(1).deskDescription);
    }
    
    @Test
    public void createNoteTest(){
       User newUser = new User("adityavit@gmail.com","test","adityavit");
       newUser.persistNewUser();
       newUser.desks.get(0).addDeskNote("This is a new Node","Hi Testing Note Created Here");
       Note noteAdded = Note.find("byNoteDesk",newUser.desks.get(0)).first();
       assertNotNull(noteAdded);
       assertEquals(1,Note.count());
       assertEquals(1,newUser.desks.get(0).notes.size());
       assertEquals("This is a new Node",noteAdded.title);
       assertEquals("Hi Testing Note Created Here",noteAdded.noteBody);
       
    }
    
    @Test
    public void createNewUserDeskTest(){
        User newUser = new User("adityavit@gmail.com","test","adityavit");
        newUser.persistNewUser();
        assertEquals(1, newUser.desks.size());
    }
    
    @Test
    public void createNewNoteTest(){
        User newUser = new User("adityavit@gmail.com","test","adityavit");
        newUser.persistNewUser();
        assertEquals(0,newUser.desks.get(0).notes.size());
        NoteJson notejson = newUser.desks.get(0).addNewDeskNote();
        assertEquals("Number of Notes =1",1,newUser.desks.get(0).notes.size());
        assertEquals(notejson.id,newUser.desks.get(0).notes.get(0).id.toString());
    }
}
