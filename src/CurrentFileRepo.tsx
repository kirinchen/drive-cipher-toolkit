import { GApiService } from "./GApiService";
import { LoadingService } from "./service/LoadingService";
import { CipherUtils } from "./utils/CipherUtils";


const ENCRYP_TEXT_CHECK_ID = "<__@$$SecretKit##@__>";

export class OpenFile {
    public info: FileInfo | null = null;
    private cipherKey: string = "";
    private editingText: string = "";
    public onEditChange: (text: string) => void = (s) => { };

    public set(i: FileInfo): void {
        this.info = i;
    }

    private decryptContent(): string {
        if (!this.info) throw new Error("open file null");
        const text = this.info.content;
        const eText = text.replaceAll(ENCRYP_TEXT_CHECK_ID, '');
        const jsonText = CipherUtils.instance.decrypt(eText, this.cipherKey);
        const obj = JSON.parse(jsonText);
        return obj["body"];
    }

    public isDecryptOK(): boolean {
        try {
            if (this.getEditingContent()) return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    public getCipherKey(): string {
        return this.cipherKey;
    }

    public setCipherKey(p: string): void {
        this.cipherKey = p;
    }

    public clear(): void {
        this.info = null;
        this.editingText = "";
        this.cipherKey = "";
    }

    public getEditingContent(): string {
        if (!this.editingText) {
            this.editingText = this.parseContent();
        }
        return this.editingText;
    }

    public setEditingContent(t: string) {
        if (!this.editingText) throw new Error("editingText not init!!");
        this.editingText = t;
        this.onEditChange(this.editingText);
    }

    private parseContent(): string {
        if (this.isEncryptFile()) return this.decryptContent();
        if (!this.info) throw new Error("open file null");
        return this.info?.content;
    }


    public getEncryptContent(): string {
        if (!this.cipherKey) return this.getEditingContent();
        const nowAt = new Date();
        const packObj = {
            body: this.getEditingContent(),
            encryptAt: nowAt.toISOString(),
            appVersion: process.env.REACT_APP_VERSION
        };
        const jsonText = JSON.stringify(packObj);
        const encryptText = CipherUtils.instance.encrypt(jsonText, this.cipherKey);
        return `${ENCRYP_TEXT_CHECK_ID}${encryptText}${ENCRYP_TEXT_CHECK_ID}`;
    }

    public isEncryptFile(): boolean {
        if (!this.info) return false;
        const contentText = this.info.content;
        const prefixCheck = contentText.startsWith(ENCRYP_TEXT_CHECK_ID);
        const suffixCheck = contentText.endsWith(ENCRYP_TEXT_CHECK_ID);
        return prefixCheck && suffixCheck;
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
    FILE_OPENED = "FILE_OPENED",
    FILE_TBD_DECRYPT = "FILE_TBD_DECRYPT"
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

    private async loadCandidateByFileId(fileId: string) {
        this.fileCandidates = [];
        const f = await GApiService.instance.getFile(fileId);
        this.fileCandidates.push(await this.fetchFileInfo(f));
        this.setState(RepoState.Load_CANDIDATES);
    }

    public async setOpenFile(fid: string) {
        LoadingService.instance.show();
        if (this.fileCandidates.length <= 0) {
            await this.loadCandidateByFileId(fid);
        }
        const fileInfo = this.fileCandidates.filter(e => e.id === fid)[0];
        const content = await GApiService.instance.getFileContent(fileInfo.id);
        fileInfo.content = content;
        this.file.set(fileInfo);
        this.refreshFileState();
        LoadingService.instance.close();
    }

    public refreshFileState() {
        if (this.file.isDecryptOK()) {
            this.setState(RepoState.FILE_OPENED);
        } else {
            this.setState(RepoState.FILE_TBD_DECRYPT);
        }
    }

    public async saveToDrive() {
        LoadingService.instance.show();
        const toSaveText: string = this.file.getEncryptContent();
        if (!this.file.info) throw Error("open file null");
        await GApiService.instance.udateFile(this.file.info.id, toSaveText);
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