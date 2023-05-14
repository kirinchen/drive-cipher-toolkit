import { GApiService } from "./GApiService";
import { useState } from "react";
import { LoadingService } from "./service/LoadingService";
class FileInfo {
    public id: string = "";
    public dirPath: string = "";
    public name: string = "";
}

export enum RepoState {
    IDLE = "IDLE",
    Load_CANDIDATES = "CANDIDATES"
}

export class CurrentFileRepo {
    public static instance = new CurrentFileRepo();

    public file: FileInfo | null = null;
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