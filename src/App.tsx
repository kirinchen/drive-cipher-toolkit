import { BaseSyntheticEvent, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { AuthState, GApiService } from "./GApiService";
import "./styles.css";
import loading from './assets/loading.gif';
import { useState } from "react";

const onAuthClick = (e: BaseSyntheticEvent) => {
  console.log(e);
  GApiService.instance.onAuthClick();
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
  if (state === AuthState.CLIENT_OBJ_READY) return true;
  return false;
}

const isLogin = (state: AuthState): boolean => {
  return state === AuthState.CLIENT_INIT_DONE;
}

const App = () => {

  useEffect(() => {
    return () => {
      console.log("This only happens ONCE");
      GApiService.instance.init();
    }
  }, []);

  const [gapiState, setGapiState] = useState(GApiService.instance.authState);
  GApiService.instance.onStateChange = setGapiState

  return (
    <div className="App">
      {isLoading(gapiState) && (
        <section className="content" >
          <img src={loading} className="App-logo" alt="logo" />
        </section>
      )}
      {isLogin(gapiState) && (
        <section className="content" >
          <GApiLoginView></GApiLoginView>
        </section>
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
