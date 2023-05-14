export class LoadingService {

    public static instance: LoadingService = new LoadingService();
    private loading: boolean = false;
    public onChange: (l: boolean) => void = (s) => { };
    private constructor() { }

    public isLoading(): boolean {
        return this.loading;
    }

    public show() {
        this.set(true);
    }

    public close() {
        this.set(false);
    }

    private set(l: boolean) {
        this.loading = l;
        this.onChange(this.loading);
    }



}