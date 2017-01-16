# load-js
Promise based script loader for the browser using script tags.

This is a UMD module, so feel free to include it in your nodejs bundling pipeline or directly in the browser via script tags.

> Promise implementation needs to be polyfilled if environment does not already provide it.

# usage

## install

```
$ npm install load-js
```

## api

loadJS is a method that loads scripts concurrently using script tags. loadJS takes in a single or an array of items where the items can be just a url string, or a config object with options for configuring:

- `type`: defaults to `text/javascript`
- `async`: defaults to `false`
- `charset`: defaults to `utf-8`
- `id`: no default value
- `url`: required if no `text` is provided
- `text`: required if no `url` is provided
- `cache`: flag to determine if item with ID or URL is to be cached. defaults to `true`

> text and url are mutually exclusive and you must specify one. If you call loadJS with a string as a parameter that string will be treated as a url. If you specify both, then url will be used.

These options are described in detail [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script).

## examples

Let's just give a simple example where `load-js` is loaded via a script tag in you HTML

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- Include load-js -->
    <script type="text/javascript" src="https://unpkg.com/load-js@1.2.0"></script>

    <script type="text/javascript">
      /* load your stuff */
      loadJS(["https://code.jquery.com/jquery-2.2.1.js", "https://unpkg.com/react@15.3.1/dist/react.min.js"])
        .then(function() {
          console.log("jQuery and react are loaded");
        });
    </script>
  </head>

  <body>
  </body>
</html>
```

Another example configuring the script execution to be asynchonous

``` javascript
loadJS([{
  async: true,
  url: "https://code.jquery.com/jquery-2.2.1.js"
}, {
  async: true,
  url: "https://unpkg.com/react@15.3.1/dist/react.min.js"
}])
.then(() => {
  console.log("all done!");
});
```
