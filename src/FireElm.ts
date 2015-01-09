module FireElm {

  export interface Data<Value> {
    url: string;
    value: Value;
  }

  export function read<Value>(observedUrlsPort: PortFromElm<Array<string>>, readPort: PortToElm<Data<Value>>, transform: (rawValue: any) => Value) {
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
            value: transform(snapshot.val())
          });
        });
      });
    });
  }

  export function write<Value>(writePort: PortFromElm<Data<Value>>) {
    writePort.subscribe(writeCommand => {
      new Firebase(writeCommand.url).set(writeCommand.value);
    });
  }

  export function push<Value>(pushPort: PortFromElm<Data<Value>>) {
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