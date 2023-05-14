import { JsLoaderService } from "./JsLoaderSservice";
import { StringUtils } from "./utils/StringUtils";

// TODO https://developers.google.com/drive/api/quickstart/js?hl=zh-tw
// TODO https://developers.google.com/identity/oauth2/web/guides/migration-to-gis?hl=zh-tw#gis-popup-ux

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

export enum AuthState {
    API_INI_RUN = "API_INI_RUN",
    API_SCRIPT_LOADED = "API_SCRIPT_LOADED",
    API_CLIENT_INIT_DONE = "API_CLIENT_INIT_DONE",
    TOKEN_CLIENT_INIT_DONE = "TOKEN_CLIENT_INIT_DONE",
    AUTH_LOGIN_DONE = "AUTH_LOGIN_DONE"


}

export class GApiService {
    public static instance: GApiService = new GApiService();
    public authState = AuthState.API_INI_RUN;
    public onStateChange: (state: AuthState) => void = (s) => { };
    private tokenClient: any = null;

    private constructor() {
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

        this.setState(AuthState.API_SCRIPT_LOADED);
        await this.initGApiClient();
        this.setState(AuthState.API_CLIENT_INIT_DONE);
        await this.initTokenClient();
        this.setState(AuthState.TOKEN_CLIENT_INIT_DONE);
        console.log("init GAPI DONE!");
    }

    private async initTokenClient() {
        await new Promise<void>((resolve, reject) => {
            try {
                this.tokenClient = globalThis.google.accounts.oauth2.initTokenClient({
                    client_id: process.env.REACT_APP_GAPI_OAUTH_CLIENT_ID,
                    scope: StringUtils.genScope(
                        [
                            'https://www.googleapis.com/auth/drive',
                            'https://www.googleapis.com/auth/drive.file',
                            'https://www.googleapis.com/auth/drive.readonly',
                            'https://www.googleapis.com/auth/drive.metadata.readonly',
                            'https://www.googleapis.com/auth/drive.appdata',
                            'https://www.googleapis.com/auth/drive.metadata',
                            'https://www.googleapis.com/auth/drive.photos.readonly'
                        ]
                    ),
                    // prompt: 'consent',
                    callback: '',  // defined at request time in await/promise scope.
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
        this.handleAuth();
    }

    private async createClient(): Promise<void> {
        return new Promise((rev, rej) => {
            // globalThis.gapi.load('client:auth2', async () => { rev(); });
            globalThis.gapi.load('client', { callback: rev, onerror: rej });
        });

    }

    private async initGApiClient(): Promise<void> {
        await this.createClient();
        await globalThis.gapi.client.init({
            apiKey: process.env.REACT_APP_GAPI_API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });

    }



    private updateSigninStatus(s: boolean) {
        // this.signined = s;
        // console.log('updateSigninStatus:' + this.signined);
    }



    public handleAuth(): void {
        this.tokenClient.callback = async (resp: any) => {
            if (resp.error !== undefined) throw (resp);
            this.setState(AuthState.AUTH_LOGIN_DONE);
        };
        const token = gapi.client.getToken();
        console.log(token);
        if (token === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            this.tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            this.tokenClient.requestAccessToken({ prompt: '' });
        }
    }

    private setState(state: AuthState): void {
        this.authState = state;
        this.onStateChange(this.authState);
        console.log(state);
    }

    public async fetchFiles(fileName: string): Promise<any> {
        const response = await globalThis.gapi.client.drive.files.list({
            pageSize: 100,
            q: `name = '${fileName}'`,
            fields: 'nextPageToken, files(id,name,mimeType,webContentLink,webViewLink,parents)'
        });
        return response.result.files;
    }



    public async getDirPath(file: any): Promise<string> {
        // parents
        let allDirst: string[] = [];
        for (; ;) {
            if (file.parents == null) break;
            const response = await globalThis.gapi.client.drive.files.get({
                fileId: file.parents[0],
                fields: 'id, name, parents'
            });
            const dirName: string = response.result.name;
            allDirst.push(dirName);
            file = response.result;
        }
        allDirst.reverse();
        return allDirst.join("/");;
    }

    public async getFileContent(fileId: string): Promise<string> {
        const resp = await gapi.client.drive.files.get({
            fileId,
            alt: 'media'
        });
        return resp.body;
    }


}


