import { useEffect, useState } from "react";
import { Button, Stack } from 'react-bootstrap';
import { JsLoaderService } from "./JsLoaderSservice";
import JsonEditorView from "./JsonEditorView";
import "./styles.css";

// declare const window: Window;
// let aTest : any;
const App = () => {

  useEffect(() => {
    return () => {
      console.log("This only happens ONCE");
      loadGapi();
    }
  }, []);



  const [showEditor, setShowEditor] = useState(true);





  return (
    <div className="App">

      <p>
        <label>
          <input
            type="checkbox"
            checked={showEditor}
            onChange={() => {
              setShowEditor(!showEditor)
            }}
          />{" "}
          JSON / Text
        </label>
      </p>

      {showEditor && (
        <JsonEditorView></JsonEditorView>
      )}
      {!showEditor && (
        <Stack className="container" direction="horizontal" gap={2}>
          <div className="row">

            <div className="input-group mb-3 col-12">
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" />
              <span className="input-group-text">@</span>
              <input type="text" className="form-control" placeholder="Server" aria-label="Server" />
            </div>

            <div className="input-group col-12" >
              <span className="input-group-text">With textarea</span>
              <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
          </div>

        </Stack>
      )}

    </div>
  );
}



async function loadGapi() {
  console.log("loadGapi");
  const ri = await JsLoaderService.loadScript({
    id: 'gapi',
    src: 'https://apis.google.com/js/api.js'
  }, se => {
    se.async = true;
    se.defer = true;
  });
  if (!ri.loaded) { throw new Error('not load gapi!'); }
  console.log(globalThis.gapi + " !!!!Loaded");
}


export default App;
