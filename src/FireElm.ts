module FireElm {

  export function read<Value>(observedUrlsPort: PortFromElm<Array<string>>, readPort: PortToElm<Value>, transform: (snapshot: FirebaseDataSnapshot) => Value) {
    var currentlyObservedUrls: Array<string> = [];
    var callbackType = "value";
    observedUrlsPort.subscribe(observedUrls => {
      currentlyObservedUrls.forEach(currentlyObservedUrl => {
        if (!contains(observedUrls, currentlyObservedUrl)) {
          try {
            new Firebase(currentlyObservedUrl).off(callbackType);
          } catch (error) {
            console.log(error);
          }
        }
      });
      observedUrls.forEach(observedUrl => {
        if (!contains(currentlyObservedUrls, observedUrl)) {
          try {
            new Firebase(observedUrl).on(callbackType, snapshot => {
              readPort.send(transform(snapshot));
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
      currentlyObservedUrls = observedUrls; 
    });
  }

  function contains<T>(array: Array<T>, value: T) {
    return array.indexOf(value) != -1;
  }

  export function readData(observedUrlsPort: PortFromElm<Array<string>>, readPort: PortToElm<Data>) {
    read(observedUrlsPort, readPort, makeData);
  }
  
  function makeData(snapshot: FirebaseDataSnapshot): Data {
    return {
      url: snapshot.ref().toString(),
      value: snapshot.val()
    };
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