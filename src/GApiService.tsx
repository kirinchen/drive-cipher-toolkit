import { JsLoaderService } from "./JsLoaderSservice";

export enum AuthState {
    API_INI_RUN = "API_INI_RUN",
    API_SCRIPT_LOADED = "API_SCRIPT_LOADED",
    CLIENT_OBJ_READY = "CLIENT_OBJ_READY",
    CLIENT_INIT_DONE = "CLIENT_INIT_DONE"

}

export class GApiService {
    public static instance: GApiService = new GApiService();
    public authState = AuthState.API_INI_RUN;
    public onStateChange: (state: AuthState) => void = (s) => { };

    private constructor() {
        console.log(process.env.GAPI_API_KEY);
    }



    public async init(): Promise<void> {
        console.log("init GAPI!!");
        const ri = await JsLoaderService.loadScript({
            id: 'gapi',
            src: 'https://apis.google.com/js/api.js'
        }, se => {
            se.async = true;
            se.defer = true;
        });
        if (!ri.loaded) { throw new Error('not load gapi!'); }
        console.log(globalThis.gapi + " !!!!Loaded");
        this.authState = AuthState.API_SCRIPT_LOADED;
        await this.createClient();
        this.authState = AuthState.CLIENT_OBJ_READY;
        await this.initGApiClient();
        this.authState = AuthState.CLIENT_INIT_DONE;
        console.log("init GAPI DONE!");
    }

    private async createClient(): Promise<void> {
        return new Promise((rev, rej) => {
            globalThis.gapi.load('client:auth2', async () => { rev(); });
        });
    }

    private async initGApiClient(): Promise<void> {
        try {
            await globalThis.gapi.client.init({
                apiKey: process.env.REACT_APP_GAPI_API_KEY,
                clientId: process.env.REACT_APP_GAPI_OAUTH_CLIENT_ID,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                plugin_name: 'google-drive-secret-toolkit',
                scope: this.scopeStr(
                    [
                        'https://www.googleapis.com/auth/drive',
                        'https://www.googleapis.com/auth/drive.file',
                        'https://www.googleapis.com/auth/drive.readonly',
                        'https://www.googleapis.com/auth/drive.metadata.readonly',
                        'https://www.googleapis.com/auth/drive.appdata',
                        'https://www.googleapis.com/auth/drive.metadata',
                        'https://www.googleapis.com/auth/drive.photos.readonly'
                    ]
                )


            });

        } catch (ex) {
            alert(JSON.stringify(ex, null, 2));
        }
        const auth = globalThis.gapi.auth2.getAuthInstance();
        auth.isSignedIn.listen((s: boolean) => { this.updateSigninStatus(s); });
        this.updateSigninStatus(globalThis.gapi.auth2.getAuthInstance().isSignedIn.get());
    }

    private scopeStr(sc: string[]): string {
        let ans = '';
        for (const s of sc) {
            ans += s + ' ';
        }
        return ans;
    }

    private updateSigninStatus(s: boolean) {
        // this.signined = s;
        // console.log('updateSigninStatus:' + this.signined);
    }

    public onAuthClick(): void {
        globalThis.gapi.auth2.getAuthInstance().signIn();
    }

    private setState(state: AuthState): void {
        this.authState = state;
        this.onStateChange(this.authState);
    }


}
