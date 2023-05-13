import { JsLoaderService } from "./JsLoaderSservice";

export class GApiService {
    public static instance: GApiService = new GApiService();
    public signined = false;

    private constructor() {
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
        await this.loadApi();
        console.log("init GAPI DONE!");
    }

    private async loadApi(): Promise<void> {
        return new Promise((rev, rej) => {
            gapi.load('client:auth2', async () => { rev(); });
        });
    }

    private async initGApiClient(): Promise<void> {
        try {
            await gapi.client.init({
                apiKey: process.env.apiKey,
                clientId: process.env.clientId,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
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

        gapi.auth2.getAuthInstance().isSignedIn.listen((s: boolean) => { this.updateSigninStatus(s); });
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }

    private scopeStr(sc: string[]): string {
        let ans = '';
        for (const s of sc) {
            ans += s + ' ';
        }
        return ans;
    }

    private updateSigninStatus(s: boolean) {
        this.signined = s;
        console.log('updateSigninStatus:' + this.signined);
    }

    public onAuthClick(event: any): void {
        gapi.auth2.getAuthInstance().signIn();
    }


}
