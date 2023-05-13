
interface Script {
    id: string;
    src: string;
    script?: HTMLScriptElement;
}

export interface ScriptLoadInfo {
    script: any;
    loaded: boolean;
    status: string;
}


export class JsLoaderService {

    private static scripts = new Array<Script>();

    public static async loadScript(sc: Script, scEx: (e: HTMLScriptElement) => void): Promise<ScriptLoadInfo> {
        return new Promise((resolve, reject) => {
            // resolve if already loaded

            // load script
            const esc: HTMLScriptElement = document.getElementById(sc.id) as HTMLScriptElement;
            const script = esc == null ? document.createElement('script') : esc;
            script.type = 'text/javascript';
            script.id = sc.id;
            script.src = sc.src;
            sc.script = script;
            scEx(script);
            script.onload = () => {
                this.scripts.push(sc);
                resolve({ script, loaded: true, status: 'Loaded' });
            };
            script.onerror = (error: any) => reject({ script: null, loaded: false, status: 'Loaded' });
            document.getElementsByTagName('body')[0].appendChild(script);

        });
    }
}