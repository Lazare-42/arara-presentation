
/**
 * Created by jose on 12-01-18.
 */
public final class AraraIPS extends AppCompatActivity  {

    [...]

    private final static String APP_CODE = "demo arara";
    private final static String UrltoLoad = "http://192.168.1.182:25681/";
    private final static String MapToLoad = "rplyctnr";

    [...]

    public void LocateMe(String ... Url) {
    
        /**
         * If the library is not in debug mode ; LocateMe can not be launched with a url given by
         * the client's application
         */
        if (!BuildConfig.DEBUG && Url.length != 0) {
            return ;
        }
    
        intent = new Intent(this.context, LocateMe.class);
        if (BuildConfig.DEBUG && Url.length > 0) {
            intent.putExtra("ADDRESS", Url[0]);
        }
        else {
            intent.putExtra("ADDRESS", UrltoLoad);
        }
        intent.putExtra("MAC", getOwnMac());
        intent.putExtra("MAP", MapToLoad);
    
        /**
         * Put the app key here [ will allow to differentiate access to the server ]
         */
        intent.putExtra("APPKEY", APP_CODE);
    
        /**
         * THis flag is required ; in some phones [noticed on LG with API 22 not on Huawei with API
         * 28] without it the Activity crashes and logs the message :
         * Calling startActivity() from outside of an Activity  context requires the FLAG_ACTIVITY_NEW_TASK flag
         *
         * FLAG ACTIVITY CLEAR TASK not required but added
         */
        intent.addFlags(FLAG_ACTIVITY_NEW_TASK);
        //intent.addFlags(FLAG_ACTIVITY_NEW_TASK | FLAG_ACTIVITY_CLEAR_TASK);
    
    
        context.startActivity(intent);
    }

    [...]
}
