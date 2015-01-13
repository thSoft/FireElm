module FireElm {

  export function read<Value>(observedUrlsPort: PortFromElm<Array<string>>, readPort: PortToElm<Value>, transform: (snapshot: FirebaseDataSnapshot) => Value) {
    var currentlyObservedUrls: Array<string> = [];
    var callbackType = "value";
    observedUrlsPort.subscribe(observedUrls => {
      currentlyObservedUrls.forEach(currentlyObservedUrl => {
        new Firebase(currentlyObservedUrl).off(callbackType);
      });
      currentlyObservedUrls = observedUrls; 
      observedUrls.forEach(observedUrl => {
        new Firebase(observedUrl).on(callbackType, snapshot => {
          readPort.send(transform(snapshot));
        });
      });
    });
  }

  export interface Data {
    url: string;
    value: any;
  }

  export function write(writePort: PortFromElm<Data>) {
    writePort.subscribe(writeCommand => {
      if (writeCommand != null) {
        new Firebase(writeCommand.url).set(writeCommand.value);
      }
    });
  }

  export function push(pushPort: PortFromElm<Data>) {
    pushPort.subscribe(pushCommand => {
      if (pushCommand != null) {
        new Firebase(pushCommand.url).push(pushCommand.value);
      }
    });
  }

  export function remove(urlPort: PortFromElm<string>) {
    urlPort.subscribe(url => {
      if (url != null) {
        new Firebase(url).remove();
      }
    });
  }

}