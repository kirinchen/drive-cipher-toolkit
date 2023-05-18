import { useState } from "react";
import { CurrentFileRepo } from "./CurrentFileRepo";
import VanillaJSONEditor from "./VanillaJSONEditor";
import "./styles.css";

const JsonEditorView = (props: any) => {

  const fileContent: string = props.fileContent;

  const [content, setContent] = useState({
    // json: {
    //   greeting: "Hello World",
    //   color: "#ff3e00",
    //   ok: true,
    //   values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    // },
    // text: CurrentFileRepo.instance.file.getEditingContent()
    text: fileContent
  });
  return (
    <div className="my-editor col">
      <VanillaJSONEditor
        content={content}
        readOnly={false}
        onChange={(e: any) => {
          setContent(e);
          const josnText = e.text ? e.text : JSON.stringify(e.json,null, 4);
          CurrentFileRepo.instance.file.setEditingContent(josnText);
        }}
      />
    </div>

  );
}






export default JsonEditorView;
