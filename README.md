# Fastslide [![Code Climate](https://codeclimate.com/github/zero-oitocentos/fastslide/badges/gpa.svg)](https://codeclimate.com/github/zero-oitocentos/fastslide)

> Customizable, easy and quick application.

This plugin requires [jQuery](http://jquery.com/)

### Install
Instalation using bower.
```bash
bower install fastslide.js --save
```
or download the .zip [here](https://github.com/jeffersondanielss/fastslide/archive/master.zip).

### Options
##### autoPlay
Type: `Boolean` Default `true`

Sets the automatic rotation of slides

##### dots
Type: `Boolean` Default `false`

allows accurate selection of the desired slide

##### keyboard
Type: `Boolean` Default `true`

enables navigation through keyboard arrows

##### time
Type: `number` Default `5000`

Sets the time interval for changing slides

##### delay
Type: `number` Default `1000`

Sets the delay of the transition from slides

### Basic markup
```bash
<div class="fs-container">
  <div class="fastslide">
    <img class="image" src="your-image.jpg">
    <img class="image" src="your-image.jpg">
    <img class="image" src="your-image.png">
    <img class="image" src="your-image.jpg">
  </div>
</div>
...
<script src="../src/fastslide.min.js"></script>
  <script>
    $(function(){
      $('.fastslide').fastSlide();
    });
  </script>
```

### Basic style
```bash
html, body, .image {
  margin: 0px;
  padding: 0px;
}
.fs-container {
  width: 100%;
  overflow: hidden;
}
.fastslide {
  position: relative;
}
.image {
  float: left;
}
```
## License

MIT