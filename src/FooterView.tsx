import { useState } from "react";
import { CurrentFileRepo, RepoState } from "./CurrentFileRepo";
import { AuthState, GApiService } from "./GApiService";
import { YesNoDailog } from "./service/YesNoDailog";

const FooterView = (props: any) => {
    const gapiState: AuthState = props.gapiState;
    const repoState: RepoState = props.repoState;
    const [cipherKey, setCipherKey] = useState(CurrentFileRepo.instance.file.getCipherKey());
    // repoState === RepoState.FILE_OPENED && 
    return (
        <div className="container" >
            <div className="row" >
                {((repoState === RepoState.FILE_OPENED || repoState === RepoState.FILE_TBD_DECRYPT) &&
                    <div className="col-md  input-group">
                        {repoState === RepoState.FILE_TBD_DECRYPT && (
                            <button className="btn btn-outline-secondary" onClick={e => CurrentFileRepo.instance.refreshFileState()} type="button">decrypt</button>
                        )}

                        <input type="password" className="form-control"
                            onChange={e => {
                                setCipherKey(e.target.value);
                                CurrentFileRepo.instance.file.setCipherKey(e.target.value);
                            }}
                            value={cipherKey}
                            placeholder="encrypt key" aria-label="Example text with two button addons"
                        />

                        {(repoState === RepoState.FILE_OPENED &&
                            <button onClick={e => {
                                YesNoDailog.instance.show("Noted", "Do you override file on google drive", y => {
                                    if (!y) return;
                                    CurrentFileRepo.instance.saveToDrive();
                                });

                            }} className="btn btn-outline-secondary" type="button">Save Drive</button>
                        )}
                    </div>
                )}

                <div className="col-md  input-group">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        {(gapiState === AuthState.AUTH_LOGIN_DONE &&
                            <button className="btn btn-outline-danger me-md-2" type="button">Sign Out</button>
                        )}
                        <button className="btn btn-primary" onClick={e => GApiService.instance.getFile("1qoQz_Dvu3cPyK1WhG3mTYR0aBL5HvNTY") } type="button">About This</button>
                    </div>
                </div>
            </div>


        </div>
    );

};

export default FooterView;