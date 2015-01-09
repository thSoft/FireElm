module FireElm {

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
            url: snapshot.key(),
            value: snapshot.val()
          });
        });
      });
    });
  }

  export interface Snapshot {
    url: String;
    value: any;
  }

}