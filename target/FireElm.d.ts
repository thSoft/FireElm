declare module FireElm {
    function read(observedUrlsPort: PortFromElm<string[]>, readPort: PortToElm<Snapshot>): void;
    interface Snapshot {
        url: String;
        value: any;
    }
}
