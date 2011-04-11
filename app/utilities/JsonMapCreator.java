package utilities;

import java.util.*;

public class JsonMapCreator {
    public static Map successJsonResponse(Object jsonMap){
        Map <String,Object> successResObj = new HashMap();
        successResObj.put("status","success");
        successResObj.put("response", jsonMap);
        return successResObj;
    }
    
    public static Map failureJsonResponse(Object jsonMap){
        Map <String,Object> failureResObj = new HashMap();
        failureResObj.put("status","failure");
        failureResObj.put("response", jsonMap);
        return failureResObj;
    }
}
