import { useState } from "react";
import { CurrentFileRepo, RepoState } from "./CurrentFileRepo";

const FileChooseView = () => {

    const [queryFileName, setQueryFileName] = useState("");
    const [repoState, setRepoState] = useState(CurrentFileRepo.instance.state);
    CurrentFileRepo.instance.onStateChangeForChoose = setRepoState

    return (
        <div className="container" >
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                    value={queryFileName}
                    onChange={(event) => setQueryFileName(event.target.value)}
                    placeholder="Query fileName" aria-label="Recipient's username"
                    aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" onClick={e => CurrentFileRepo.instance.loadCandidates(queryFileName)} type="button" id="button-addon2">Search</button>
            </div>
            {repoState === RepoState.Load_CANDIDATES && (
                <div className="input-group mb-3">
                    <select className="form-select" id="inputGroupSelect02">
                        {
                            CurrentFileRepo.instance.fileCandidates.map(item =>
                                <option key={item.id} value={item.id}>{item.dirPath}/{item.name}</option>
                            )
                        }
                    </select>
                    <button className="btn btn-outline-secondary" onClick={e => CurrentFileRepo.instance.loadCandidates(queryFileName)} type="button" id="button-addon2">Open</button>
                </div>
            )}

        </div>

    );

};

export default FileChooseView;