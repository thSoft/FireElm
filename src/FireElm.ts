module FireElm {

  export interface Snapshot {
    url: string;
    value: any;
  }

  export function read(observedUrlsPort: PortFromElm<Array<string>>, readPort: PortToElm<Snapshot>) {
    var currentlyObservedUrls: Array<string> = [];
    var callbackType = "value";
    observedUrlsPort.subscribe(observedUrls => {
      currentlyObservedUrls.forEach(currentlyObservedUrl => {
        new Firebase(currentlyObservedUrl).off(callbackType);
      });
      currentlyObservedUrls = observedUrls; 
      observedUrls.forEach(observedUrl => {
        new Firebase(observedUrl).on(callbackType, snapshot => {
          readPort.send({
            url: snapshot.toString(),
            value: snapshot.val()
          });
        });
      });
    });
  }

  export function write(writePort: PortFromElm<Snapshot>) {
    writePort.subscribe(writeCommand => {
      new Firebase(writeCommand.url).set(writeCommand.value);
    });
  }

  export function push(pushPort: PortFromElm<Snapshot>) {
    pushPort.subscribe(pushCommand => {
      new Firebase(pushCommand.url).push(pushCommand.value);
    });
  }

  export function remove(urlPort: PortFromElm<string>) {
    urlPort.subscribe(url => {
      new Firebase(url).remove();
    });
  }

}