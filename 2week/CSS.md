# CSS

## DOM
Representation of the website as a tree. The DOM is a tree of nodes. Each node is an object representing a part of the document. The DOM is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects. That way, programming languages can connect to the page.

React has a virtual DOM allows manipulation of the DOM. 

## CSS ( Cascading Style Sheets)

```css
h1 {    /* tags, rules */
    color: red;
    font-size: 5em; /* font size in centimeters */
}

p {
    color: blue;
}

```

## Connect CSS to HTML
We use the ``link`` tag
```html
<link rel="stylesheet" href="style.css">
```

## In-line
```html
<h1 style="color:blue;">This is a Blue Heading</h1>
```

## Internal
If there is a link to an external CSS file, the internal CSS will be ignored.
```html
<style>
h1 {
    color: red;
    font-size: 5em;
}
</style>

<link rel="stylesheet" href="style.css"> /* this will be ignored */
```

## External 

```html
<link rel="stylesheet" href="style.css">
```

## Colors

- RGB


## Setting Size
Two types of length units:
- relative (em ,rem) `important`
- absolute (cm, pc) 


1 rem = 10 pixels

2 rem = 20 pixels

```css
html {
    font-size: 10px;
}

body {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    width: 50rem; /* width of body encapsulated */
    height: 100rem; /* height of body encapsulated */

}

#p2 {
    font-size: 1em;    /* once of the body font-size */
    border-style: solid;
    border-color: red;
}

#p3 {
    font-size: 2em;    /* twice of the body font-size */
    border-style: solid;
    border-color: red;
}

strong {
    font-size: 2em; /* twice of p3 (2em) = 4 em, twice of body 2*4em= 8rem or 80px */
}

```

## Inheritance properties
Only some properties are inherited. The properties that are inherited are:
- color
- font-family
- font-size
- font-style
- etc

```css
article {
    color: red;
    border: medium solid red;
}

h2 {
    color: blue;
}

article h2 {    /* descendent selector */
    color: inherit; /* inherit the color from the parent */
}
```

## Kind of Selectors
- Type Selectors:
    - Based on the name of an HTML tag (e.g., p, table, etc.)
    - p{ color: red; }

- Pseudo-classes
  - Attached to slecetors and specify a special state of the element to be selected
  - `a:link`: unvisited link
  - `a:visited`: visited link
  - `a:hover`: mouse over
  - `a:active`: selected link
  - Order is important

```css
body {
    font-family: arial, helvetica, sans-serif;
    background-color: #f1f1f1;
    color: teal;
    font-size: 50%; /* 50% of the body font-size */
}
```

- Class selector
  - Style do several elements
  ```css
  .styleOne{
    color: red;
    font-style: italic;
    text-align: center;
  }

