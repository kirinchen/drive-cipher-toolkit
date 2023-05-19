import { BaseSyntheticEvent, useState } from "react";
import { Button } from 'react-bootstrap';
import { CurrentFileRepo, RepoState } from "./CurrentFileRepo";
import FileChooseView from "./FileChooseView";
import FooterView from "./FooterView";
import { AuthState, GApiService } from "./GApiService";
import MainContentView from "./MainContentView";
import loading from './assets/loading.gif';
import { LoadingService } from "./service/LoadingService";
import YesNoDialogModal from "./service/YesNoDailog";
import "./styles.css";

const onAuthClick = (e: BaseSyntheticEvent) => {
  console.log(e);
  GApiService.instance.handleAuth();
};


const GApiLoginView = () => {

  return (
    <Button onClick={onAuthClick} >
      GApi Login
    </Button>
  )
}

const isLoading = (state: AuthState): boolean => {
  if (state === AuthState.API_INI_RUN) return true;
  if (state === AuthState.API_SCRIPT_LOADED) return true;
  if (state === AuthState.API_CLIENT_INIT_DONE) return true;
  return false;
}

const isLogin = (state: AuthState): boolean => {
  return state === AuthState.TOKEN_CLIENT_INIT_DONE;
}

const isChooseFile = (state: AuthState, repoState: RepoState): boolean => {
  if (state !== AuthState.AUTH_LOGIN_DONE) return false;
  return repoState === RepoState.IDLE || repoState === RepoState.Load_CANDIDATES;
};

const isFileOpened = (state: AuthState, repoState: RepoState): boolean => {
  if (state !== AuthState.AUTH_LOGIN_DONE) return false;
  return repoState === RepoState.FILE_OPENED;
};

const isFileDecrypting = (state: AuthState, repoState: RepoState): boolean => {
  if (state !== AuthState.AUTH_LOGIN_DONE) return false;
  return repoState === RepoState.FILE_TBD_DECRYPT;
};

const App = () => {
  const [gapiState, setGapiState] = useState(GApiService.instance.authState);
  const [repoState, setRepoState] = useState(CurrentFileRepo.instance.state);
  const [showLoading, setShowLoading] = useState(LoadingService.instance.isLoading());
  LoadingService.instance.onChange = setShowLoading;
  GApiService.instance.onStateChange = setGapiState;
  CurrentFileRepo.instance.onStateChangeForApp = setRepoState;
  GApiService.instance.init();
  return (
    <div className="App">
      {(showLoading || isLoading(gapiState)) && (
        <section className="content-center" >
          <img src={loading} className="App-logo" alt="logo" />
        </section>
      )}
      {(!showLoading && isLogin(gapiState)) && (
        <>
          <section className="content-center" >
            <GApiLoginView></GApiLoginView>
          </section>
          <footer className="footer" > <FooterView gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>

      )}
      {(!showLoading && isChooseFile(gapiState, repoState)) && (
        <>
          <section className="content-center" >
            <FileChooseView></FileChooseView>
          </section>
          <footer className="footer" > <FooterView gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>
      )}
      {(!showLoading && isFileDecrypting(gapiState, repoState)) && (
        <>
          <section className="content-center" >
            <FileChooseView></FileChooseView>
          </section>
          <footer className="footer" > <FooterView gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>
      )}
      {(!showLoading && isFileOpened(gapiState, repoState)) && (
        <>
          <header className="header" > <FileChooseView></FileChooseView> </header>
          <section className="content" >
            <MainContentView></MainContentView>
          </section>
          <footer className="footer" > <FooterView gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>
      )}

      <YesNoDialogModal></YesNoDialogModal>

    </div>
  );
}


export default App;
