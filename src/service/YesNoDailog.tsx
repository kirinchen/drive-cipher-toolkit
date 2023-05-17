import { Modal } from "bootstrap";

// TODO https://www.positronx.io/react-js-bootstrap-modal-popup-component-tutorial/
export class YesNoDailog {
    public static instance = new YesNoDailog();
    private modal: any = null;

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

    public show() {
        this.injectModal();
        this.modal.show()
    }
}

const YesNoDialogModal = () => {
    return (
        <div className="modal fade" id="YesNoModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YesNoDialogModal;