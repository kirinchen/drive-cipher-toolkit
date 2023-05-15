import { useState } from "react";
import { Button, Stack } from 'react-bootstrap';
import JsonEditorView from "./JsonEditorView";
import "./styles.css";
import { CurrentFileRepo } from "./CurrentFileRepo";

enum EditorType {
  TEXT = "TEXT",
  JSON = "JSON"
}


// declare const window: Window;
// let aTest : any;
const MainContentView = () => {

  const [editorType, setEditorType] = useState(EditorType.TEXT);
  const [fileContent, setFileContent] = useState(CurrentFileRepo.instance.file?.content);

  const style = {
    backgroundColor: 'red',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  return (
    <div className="container fill-height " >
      <div className="row" >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Button onClick={e => setEditorType(EditorType.TEXT)} className={`nav-link ${editorType === EditorType.TEXT ? "active" : ""}  `} aria-current="page" >Text</Button>
          </li>
          <li className="nav-item">
            <Button onClick={e => setEditorType(EditorType.JSON)} className={`nav-link ${editorType === EditorType.JSON ? "active" : ""}  `} >Json</Button>
          </li>
        </ul>
      </div>

      <div className="row " style={style } >
        <textarea className="col" value={fileContent} onChange={e => setFileContent(e.target.value)} ></textarea>
      </div>

    </div>
  );
}






export default MainContentView;
