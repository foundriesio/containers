This is an example of a synchronous aktualizr-lite callback container.

Aktualizr-lite supports making callbacks during various stages throughout
it's lifecycle.  These callbacks are managed via a container which
uses a self-installed handler script.

In this example, the callbacks wait for the response from the handler before
proceeding to the next stage.
