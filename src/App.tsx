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
        <Stack direction="horizontal" gap={2}>
          <Button as="a" variant="primary">
            Button as link
          </Button>
          <Button as="a" variant="success">
            Button as link
          </Button>
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
