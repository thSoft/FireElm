declare module FireElm {
    interface Data<Value> {
        url: string;
        value: Value;
    }
    function read<Value>(observedUrlsPort: PortFromElm<string[]>, readPort: PortToElm<Data<Value>>, transform: (rawValue: any) => Value): void;
    function write<Value>(writePort: PortFromElm<Data<Value>>): void;
    function push<Value>(pushPort: PortFromElm<Data<Value>>): void;
    function remove(urlPort: PortFromElm<string>): void;
}
