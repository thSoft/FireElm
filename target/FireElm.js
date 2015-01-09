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
                        url: snapshot.toString(),
                        value: snapshot.val()
                    });
                });
            });
        });
    }
    FireElm.read = read;
    function write(writePort) {
        writePort.subscribe(function (writeCommand) {
            new Firebase(writeCommand.url).set(writeCommand.value);
        });
    }
    FireElm.write = write;
    function push(pushPort) {
        pushPort.subscribe(function (pushCommand) {
            new Firebase(pushCommand.url).push(pushCommand.value);
        });
    }
    FireElm.push = push;
    function remove(urlPort) {
        urlPort.subscribe(function (url) {
            new Firebase(url).remove();
        });
    }
    FireElm.remove = remove;
})(FireElm || (FireElm = {}));
