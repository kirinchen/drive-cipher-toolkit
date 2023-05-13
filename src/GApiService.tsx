import { JsLoaderService } from "./JsLoaderSservice";

TODO https://developers.google.com/drive/api/quickstart/js?hl=zh-tw
TODO https://developers.google.com/identity/oauth2/web/guides/migration-to-gis?hl=zh-tw#gis-popup-ux

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

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
        await JsLoaderService.loadScript({
            id: 'gapiScript',
            src: 'https://apis.google.com/js/api.js'
        }, se => {
            se.async = true;
            se.defer = true;
        });
        await JsLoaderService.loadScript({
            id: 'gsiScript',
            src: 'https://accounts.google.com/gsi/client'
        }, se => {
            se.async = true;
            se.defer = true;
        });

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
            // globalThis.gapi.load('client:auth2', async () => { rev(); });
            globalThis.gapi.load('client', { callback: rev, onerror: rej });
        });

    }

    private async initGApiClient(): Promise<void> {
        await globalThis.gapi.client.init({
            apiKey: process.env.REACT_APP_GAPI_API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        })
        // .then(function () {  // Load the Calendar API discovery document.
        //     // globalThis.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
        // });

        // const auth = globalThis.gapi.auth2.getAuthInstance();
        // auth.isSignedIn.listen((s: boolean) => { this.updateSigninStatus(s); });
        // this.updateSigninStatus(globalThis.gapi.auth2.getAuthInstance().isSignedIn.get());
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
