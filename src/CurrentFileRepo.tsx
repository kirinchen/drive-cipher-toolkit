import { GApiService } from "./GApiService";
import { LoadingService } from "./service/LoadingService";

export class OpenFile {
    public info: FileInfo | null = null;
    private cipherKey: string = "";
    private parseText: string = "";

    public set(i: FileInfo): void {
        this.info = i;
        this.parseText = this.info.content;
    }

    public clear(): void {
        this.info = null;
    }

    public getContent(): string {
        return this.parseText;
    }

}

class FileInfo {
    public id: string = "";
    public dirPath: string = "";
    public name: string = "";
    public content: string = "";
}

export enum RepoState {
    IDLE = "IDLE",
    Load_CANDIDATES = "CANDIDATES",
    FILE_OPENED = "FILE_OPENED"
}

export class CurrentFileRepo {
    public static instance = new CurrentFileRepo();

    public file: OpenFile = new OpenFile();
    public fileCandidates: FileInfo[] = [];
    public state: RepoState = RepoState.IDLE;

    public onStateChangeForApp: (state: RepoState) => void = (s) => { };
    public onStateChangeForChoose: (state: RepoState) => void = (s) => { };
    private constructor() { }

    public async loadCandidates(fileName: string) {
        LoadingService.instance.show();
        this.fileCandidates = [];
        const files: any[] = await GApiService.instance.fetchFiles(fileName);
        for (const f of files) {
            this.fileCandidates.push(await this.fetchFileInfo(f));
        }
        this.setState(RepoState.Load_CANDIDATES);
        LoadingService.instance.close();
    }

    public async setOpenFile(fid: string) {
        LoadingService.instance.show();
        const fileInfo = this.fileCandidates.filter(e => e.id === fid)[0];
        const content = await GApiService.instance.getFileContent(fileInfo.id);
        fileInfo.content = content;
        this.file.set(fileInfo);
        this.setState(RepoState.FILE_OPENED);
        LoadingService.instance.close();
    }

    public reset() {
        this.file.clear();
        this.fileCandidates = [];
        this.setState(RepoState.IDLE);
    }

    private async fetchFileInfo(f: any): Promise<FileInfo> {
        const ans = new FileInfo();
        const dirPath = await GApiService.instance.getDirPath(f);
        ans.id = f.id;
        ans.dirPath = dirPath;
        ans.name = f.name;
        return ans;
    }


    private setState(s: RepoState) {
        this.state = s;
        this.onStateChangeForApp(this.state);
        this.onStateChangeForChoose(this.state);
    }
}