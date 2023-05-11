import VanillaJSONEditor from "./VanillaJSONEditor";
import { useEffect, useState } from "react";
import "./styles.css";
import { JsLoaderService } from "./JsLoaderSservice";
import JsonEditorView from "./JsonEditorView";
import { Button,Stack } from 'react-bootstrap';

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
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState({
    json: {
      greeting: "Hello World",
      color: "#ff3e00",
      ok: true,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    text: undefined
  });
  return (
    <div className="App">
      <JsonEditorView></JsonEditorView>
      <Stack direction="horizontal" gap={2}>
        <Button as="a" variant="primary">
          Button as link
        </Button>
        <Button as="a" variant="success">
          Button as link
        </Button>
      </Stack>
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
