declare module FireElm {
    function read<Value>(observedUrlsPort: PortFromElm<string[]>, readPort: PortToElm<Value>, transform: (snapshot: FirebaseDataSnapshot) => Value): void;
    interface Data {
        url: string;
        value: any;
    }
    function write(writePort: PortFromElm<Data>): void;
    function push(pushPort: PortFromElm<Data>): void;
    function remove(urlPort: PortFromElm<string>): void;
}
