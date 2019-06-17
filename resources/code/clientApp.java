/**
 *  Client creates a new IPS object in his app
 */
public static AraraIPS      ips = new AraraIPS(getApplicationContext());

/**
 *  Client app needs to scan wifi for us to locate the phone
 */
if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
    requestPermissions(new String[]{Manifest.permission.ACCESS_COARSE_LOCATION},12);
}else {
    ips.runScanner();
    ips.updateDevice();
}

/**
 *  WHen desired, client launches the Wayfinding activity
 *  In production ; the activity takes no arguments and the map_to_load and its
 *  alias are hard-coded
 */
ips.LocateMe(map_to_load.getUrl(), map_to_load.getAlias());
