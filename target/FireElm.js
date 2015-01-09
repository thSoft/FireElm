var FireElm;
(function (FireElm) {
    function read(observedUrlsPort, readPort) {
        var currentlyObservedUrls = [];
        var callbackType = "value";
        observedUrlsPort.subscribe(function (observedUrls) {
            currentlyObservedUrls.forEach(function (currentlyObservedUrl) {
                new Firebase(currentlyObservedUrl).off(callbackType);
            });
            currentlyObservedUrls = observedUrls;
            observedUrls.forEach(function (observedUrl) {
                new Firebase(observedUrl).on(callbackType, function (snapshot) {
                    readPort.send({
                        url: snapshot.key(),
                        value: snapshot.val()
                    });
                });
            });
        });
    }
    FireElm.read = read;
})(FireElm || (FireElm = {}));
