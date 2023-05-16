import { useState } from "react";
import { Button } from 'react-bootstrap';
import { CurrentFileRepo } from "./CurrentFileRepo";
import "./styles.css";
import JsonEditorView from "./JsonEditorView";

enum EditorType {
  TEXT = "TEXT",
  JSON = "JSON"
}


// declare const window: Window;
// let aTest : any;
const MainContentView = () => {

  const [editorType, setEditorType] = useState(EditorType.TEXT);
  const [fileContent, setFileContent] = useState(CurrentFileRepo.instance.file.getPlainContent());


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

      {editorType === EditorType.TEXT && (
        <div className="row editor-height"  >
          <textarea className="col" value={fileContent} onChange={e => setFileContent(e.target.value)} ></textarea>
        </div>
      )}

      {editorType === EditorType.JSON && (
        <div className="row editor-height"  >
          <JsonEditorView></JsonEditorView>
        </div>
      )}



    </div>
  );
}






export default MainContentView;
