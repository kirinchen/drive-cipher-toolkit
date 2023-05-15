import { RepoState } from "./CurrentFileRepo";
import { AuthState } from "./GApiService";

const FooterView = (props: any) => {
    const gapiState: AuthState = props.gapiState;
    const repoState: RepoState = props.repoState;
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

                        <button className="btn btn-primary" type="button">About This</button>
                    </div>
                </div>
            </div>


        </div>
    );

};

export default FooterView;