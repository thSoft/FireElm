///<reference path="../../build/typings/tsd.d.ts"/>
module FireElm {

  function read(observedUrlsPort: PortFromElm<Array<string>>, dataPort: PortToElm<Value>) {
    var currentlyObservedUrls: Array<string> = [];
    var callbackType = "value";
    observedUrlsPort.subscribe(observedUrls => {
      currentlyObservedUrls.forEach(currentlyObservedUrl => {
        new Firebase(currentlyObservedUrl).off(callbackType);
      });
      currentlyObservedUrls = observedUrls; 
      observedUrls.forEach(observedUrl => {
        new Firebase(observedUrl).on(callbackType, data => {
          dataPort.send({
            url: observedUrl,
            data: data.val()
          });
        });
      });
    });
  }

  interface Value {
    url: string;
    data: Object;
  }

}