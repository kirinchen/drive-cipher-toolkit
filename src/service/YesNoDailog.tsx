import { Modal } from "bootstrap";
import { useState } from "react";

// TODO https://www.positronx.io/react-js-bootstrap-modal-popup-component-tutorial/
export class YesNoDailog {
    public static instance = new YesNoDailog();
    private modal: any = null;
    private showing: boolean = false;
    public title:string = "";
    public content:string = "";
    public onChange: (showing: boolean) => void = (s) => { };
    private onYesNoClickEvent: (yes: boolean) => void = (s) => { };

    private constructor() {
    }


    private injectModal() {
        if (this.modal) return;
        const dom = document.getElementById('YesNoModal') as HTMLElement;
        this.modal = new Modal(dom, {
            keyboard: false
        });
        console.log(`init ${dom} ${this.modal}`);

    }

    public isShowing(): boolean {
        return this.showing;
    }

    public show(title: string, content: string,onYesNoClick: (yes: boolean) => void = (s) => { }) {
        this.content = content;
        this.title = title;
        this.onYesNoClickEvent = onYesNoClick;
        this.injectModal();
        this.modal.show()
        this.setShowing(true);
    }

    public onYesNoClick(b:boolean){
        this.onYesNoClickEvent(b);
        this.setShowing(false);
        this.modal.hide();
    }

    private setShowing(s: boolean) {
        this.showing = s;
        this.onChange(this.showing);
    }
}

const YesNoDialogModal = () => {
    const [showing, setShowing] = useState(YesNoDailog.instance.isShowing());
    YesNoDailog.instance.onChange = setShowing;

    return (
        <div className="modal fade" id="YesNoModal" aria-labelledby="exampleModalLabel" aria-hidden={showing}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{YesNoDailog.instance.title}</h5>
                    </div>
                    <div className="modal-body">
                       {YesNoDailog.instance.content}
                    </div>
                    <div className="modal-footer">
                        <button onClick={e=> YesNoDailog.instance.onYesNoClick(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button onClick={e=> YesNoDailog.instance.onYesNoClick(true)} type="button" className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YesNoDialogModal;