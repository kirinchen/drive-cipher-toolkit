import { useState } from "react";
import { Stack } from 'react-bootstrap';
import JsonEditorView from "./JsonEditorView";
import "./styles.css";




// declare const window: Window;
// let aTest : any;
const MainContentView = () => {

  const [showEditor, setShowEditor] = useState(true);

  return (
    <section className="content">

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

    </section>
  );
}






export default MainContentView;
