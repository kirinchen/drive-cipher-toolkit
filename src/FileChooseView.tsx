import { useState } from "react";
import { CurrentFileRepo, RepoState } from "./CurrentFileRepo";
import { GApiService } from "./GApiService";

const FileChooseView = () => {

    const [queryFileName, setQueryFileName] = useState("");
    const [repoState, setRepoState] = useState(CurrentFileRepo.instance.state);
    const [selectFile, setSelectFile] = useState("");
    CurrentFileRepo.instance.onStateChangeForChoose = setRepoState

    return (
        <div className="container" >
            {repoState === RepoState.IDLE && (
                <div className="input-group mb-3">
                    <input type="text" className="form-control"
                        value={queryFileName}
                        onChange={(event) => setQueryFileName(event.target.value)}
                        placeholder="Query fileName" aria-label="Recipient's username"
                        aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" onClick={e => CurrentFileRepo.instance.loadCandidates(queryFileName)} type="button" id="button-addon2">Search</button>
                </div>
            )}

            {(repoState === RepoState.Load_CANDIDATES || repoState === RepoState.FILE_OPENED ) && (
                <div className="input-group mb-3">
                    <select className="form-select" id="inputGroupSelect02"
                        value={selectFile}
                        onChange={e => {
                            console.log(e.target.value);
                            setSelectFile(e.target.value)
                        }}  >
                        <option key="" value="">Choose...</option>
                        {
                            CurrentFileRepo.instance.fileCandidates.map(item =>
                                <option key={item.id} value={item.id}>{item.dirPath}/{item.name}</option>
                            )
                        }
                    </select>
                    {selectFile && (
                        <button className="btn btn-outline-secondary" onClick={async e => CurrentFileRepo.instance.setOpenFile(selectFile)} type="button" id="button-addon2">Open</button>
                    )}
                    <button className="btn btn-outline-secondary" onClick={e => CurrentFileRepo.instance.reset()} type="button" id="button-addon2">Reset</button>
                </div>
            )}

        </div>

    );

};

export default FileChooseView;