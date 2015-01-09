///<reference path="../typings/tsd.d.ts"/>
module FireElm {

  function read(observedUrlsPort: PortFromElm<Array<string>>, dataPort: PortToElm<Snapshot>) {
    var currentlyObservedUrls: Array<string> = [];
    var callbackType = "value";
    observedUrlsPort.subscribe(observedUrls => {
      currentlyObservedUrls.forEach(currentlyObservedUrl => {
        new Firebase(currentlyObservedUrl).off(callbackType);
      });
      currentlyObservedUrls = observedUrls; 
      observedUrls.forEach(observedUrl => {
        new Firebase(observedUrl).on(callbackType, snapshot => {
          dataPort.send({
            url: snapshot.key(),
            value: snapshot.val()
          });
        });
      });
    });
  }

  interface Snapshot {
    url: String;
    value: any;
  }

}