import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { CurrentFileRepo, RepoState } from "./CurrentFileRepo";
import FileChooseView from "./FileChooseView";
import MainContentView from "./MainContentView";
import { AuthState, GApiService } from "./GApiService";
import loading from './assets/loading.gif';
import { LoadingService } from "./service/LoadingService";
import "./styles.css";
import FooterView from "./FooterView";

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

const App = () => {

  useEffect(() => {
    return () => {
      console.log("This only happens ONCE");
      GApiService.instance.init();
    }
  }, []);

  const [gapiState, setGapiState] = useState(GApiService.instance.authState);
  const [repoState, setRepoState] = useState(CurrentFileRepo.instance.state);
  const [showLoading, setShowLoading] = useState(LoadingService.instance.isLoading());
  LoadingService.instance.onChange = setShowLoading;
  GApiService.instance.onStateChange = setGapiState
  CurrentFileRepo.instance.onStateChangeForApp = setRepoState
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
          <footer className="footer" > <FooterView  gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>

      )}
      {(!showLoading && isChooseFile(gapiState, repoState)) && (
        <>
          <section className="content-center" >
            <FileChooseView></FileChooseView>
          </section>
          <footer className="footer" > <FooterView  gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>
      )}
      {(!showLoading && isFileOpened(gapiState, repoState)) && (
        <>
          <header className="header" > <FileChooseView></FileChooseView> </header>
          <section className="content" >
            <MainContentView></MainContentView>
          </section>
          <footer className="footer" > <FooterView  gapiState={gapiState} repoState={repoState}  ></FooterView> </footer>
        </>
      )}
      {/* {!isLoading(gapiState) && (
        <>
          <header className="header" > <GApiLoginView></GApiLoginView> </header>
          <section className="content" >
            我是内容区
            <img src={loading} className="App-logo" alt="logo" />
          </section>
          <footer className="footer" > 我是底部 </footer>
        </>
      )} */}


    </div>
  );
}


export default App;
