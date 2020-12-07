# CSS Backgrounds

The CSS background properties are used to define the background effects for elements:

- `background-color`
- `background-image`
- `background-repeat`
- `background-attachment`
- `background-position`

## Background Color

The `background-color` property specifies the background color of an element.

The background color of a page is set like this:

```css
body {
  background-color: lightblue;
}
```

With CSS, a color is most often specified by:

- A valid color name - like "red"
- A HEX value - like "#ff0000"
- An RGB value - like "rgb(255,0,0)"

## Background Image

The `background-image` property specifies an image to use as the background of an element.

By default, the image is repeated so it covers the entire element.

Set the background image for a page: 

```css
body {
  background-image: url("meow.gif");
}
```

This example shows a bad combination of text and background image. The text is hardly readable: 

```css
body {
  background-image: url("bgdesert.jpg");
}
```

**Note:** When using a background image, use an image that does not disturb the text.

The background image can also be set for specific elements, like the `<p>` element:

```css
p {
  background-image: url("paper.gif");
}
```