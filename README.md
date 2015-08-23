# Resonsive-table

##Demo
[Here is a demo](https://rawgit.com/vorant/resonsive-table/master/example/index.html)

## How it works
Resonsive-table will be showed at small screens (default 768px, but you may change it), but normal table will be hidden. When screen width is more then(768px) tables will switched; 

## How to use

Add scripts and styles to you page

```
<link rel="stylesheet" href="dist/styles.min.css"/>
<script type="text/javascript" src="dist/bundle.min.js"></script>
```
In you script use params like this
```javascript
    var params = { // this is default params
        class: 'table',
        amount: [
            [0,   480],   // 1
            [481, 568],   // 2
            [569, 768]    // 3
        ],
        maxWidth: 768 
    };
    responsiveTable.init(params);
```
or you may use default params
```
responsiveTable.init()
```
### Where:

* `class` - css class of you table 
* `amount` - determine amount of content column depends on screen width.
* `maxWidth` - max screen width when response table is showed.

## Copyright
Library distributed AS IS and you may do it with it what do you want.

## License
MIT
