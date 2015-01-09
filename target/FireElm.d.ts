declare module FireElm {
    interface Snapshot {
        url: string;
        value: any;
    }
    function read(observedUrlsPort: PortFromElm<string[]>, readPort: PortToElm<Snapshot>): void;
    function write(writePort: PortFromElm<Snapshot>): void;
    function push(pushPort: PortFromElm<Snapshot>): void;
    function remove(urlPort: PortFromElm<string>): void;
}
