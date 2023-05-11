import { JSONEditor } from "vanilla-jsoneditor";
import { useEffect, useRef } from "react";
import "./VanillaJSONEditor.css";

export default function SvelteJSONEditor(props: any) {
    const refContainer = useRef(null);
    const refEditor: any = useRef(null);

    useEffect(() => {
        // create editor
        console.log("create editor", refContainer.current);
        refEditor.current = new JSONEditor({
            target: refContainer.current as any,
            props: {}
        });

        return () => {
            // destroy editor
            if (refEditor.current) {
                console.log("destroy editor");
                refEditor.current.destroy();
                refEditor.current = null;
            }
        };
    }, []);

    // update props
    useEffect(() => {
        if (refEditor.current) {
            console.log("update props", props);
            refEditor.current.updateProps(props);
        }
    }, [props]);

    return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}
