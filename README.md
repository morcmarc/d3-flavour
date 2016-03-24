# D3 Flavour

A small (less than 1KB) D3 add-on for generating interactive "flavour wheels".

## Example

![Beer Taste Chart](https://raw.github.com/morcmarc/d3-flavour/master/beer_tasting.png)

```html
<div id="beer-taste" style="width: 200px; height: 200px;"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min.js"></script>
<script src="d3-flavour.js"></script>
<script type="text/javascript">
    d3_flavour.chart('beer-taste', [1,2,5,2,4,3,0,2]);
</script>
```

## API

### d3_flavour.chart(idSelector, data, [options])

Render `data` as a flavour wheel into `idSelector`. Properties of the chart can
be configured via the `options` object. See [#options](#options).

### d3_flavour.transformData(dataObject)

Transform object data into array. It is only a convenience method.

Example:

```js
let dataObject = {
    "sour"  : 1,
    "sweet" : 2,
    "bitter": 3,
    "salty" : 4,
    "umami" : 0,
};
let dataArray = d3_flavour.transformData(data); // [1,2,3,4,0]
```

## Options

**Default options:**

```js
{
    depth    : 5,
    flavours : ['Malty', 'Sour', 'Floral', 'Fruit', 'Sweet', 'Smooth', 'Bitter', 'Hoppy'],
    thickness: 0.1,
    bgColor  : '#fff',
    fgColor1 : '#ccc',
    fgColor2 : '#666',
    fgColor3 : 'orange',
    color    : '#888',
    callback : undefined
};
```

#### `depth :integer`

Defines how many vertical arcs should be rendered for each flavour.

#### `flavours :array[:string]`

Array of flavours. When calling `chart` d3-flavour will render a segment for each
flavour. Each segment contains `depth` number of arcs.

#### `thickness :float`

Thickness of an arc.

#### `bgColor :string`

Background color.

#### `fgColor1 :string`

Deselected color.

#### `fgColor2 :string`

Selected color.

#### `fgColor3 :string`

Hover-over color.

#### `color :string`

Label color.

#### `callback :function([:int])`

Callback function that should be called when the data changes.

## Legal

This software is licensed under the MIT License.

D3.js released under BSD license. Copyright 2015 Michael Bostock.
