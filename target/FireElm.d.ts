/// <reference path="../typings/tsd.d.ts" />
declare module FireElm {
    function read(observedUrlsPort: PortFromElm<string[]>, dataPort: PortToElm<Snapshot>): void;
    interface Snapshot {
        url: String;
        value: any;
    }
}
