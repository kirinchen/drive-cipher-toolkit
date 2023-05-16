import { RepoState } from "./CurrentFileRepo";
import { AuthState, GApiService } from "./GApiService";
import { CipherUtils } from "./utils/CipherUtils";

const FooterView = (props: any) => {
    const gapiState: AuthState = props.gapiState;
    const repoState: RepoState = props.repoState;
    const pass = "zzz888a"
    const cText = CipherUtils.instance.encrypt("中文{}", pass);
    const origText = CipherUtils.instance.decrypt(cText, pass);
    // repoState === RepoState.FILE_OPENED && 
    return (
        <div className="container" >
            <div className="row" >
                {(repoState === RepoState.FILE_OPENED &&
                    <div className="col-md  input-group">
                        <button className="btn btn-outline-secondary" type="button">encrypt</button>
                        <button className="btn btn-outline-secondary" type="button">decrypt</button>
                        <input type="text" className="form-control" placeholder="encrypt key" aria-label="Example text with two button addons" />
                        <button className="btn btn-outline-secondary" type="button">Save Drive</button>
                    </div>
                )}

                <div className="col-md  input-group">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        {(gapiState === AuthState.AUTH_LOGIN_DONE &&
                            <button className="btn btn-outline-danger me-md-2" type="button">Sign Out</button>
                        )}
                        <button className="btn btn-primary" onClick={ async e=> GApiService.instance.udateFile('1e4kOchDM6WRmo49YaOz2Rw6lWeZCBfdg','jjj') } type="button">About This</button>
                        {cText}  {origText}
                    </div>
                </div>
            </div>


        </div>
    );

};

export default FooterView;