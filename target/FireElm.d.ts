declare module FireElm {
    interface Data {
        url: string;
        value: any;
    }
    function read(observedUrlsPort: PortFromElm<string[]>, readPort: PortToElm<Data>): void;
    function write(writePort: PortFromElm<Data>): void;
    function push(pushPort: PortFromElm<Data>): void;
    function remove(urlPort: PortFromElm<string>): void;
}
