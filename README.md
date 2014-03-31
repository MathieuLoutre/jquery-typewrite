# jquery-typewrite

> Type the content of an HTML element, character by character

## Why?

There's a few plugins out there allowing you to type some text character by character, however I haven't been able to find one which would allow my to type HTML elements along with the text. You can even nest the HTML elements inside and it will still work.

## How?

It replaces all the HTML tags inside the element with a placeholder character. When finding this character whilst typing the text, it will insert the element and call `.typewrite()` on it recursively and wait until the context of the element is typed out to continue typing the rest of the text.

## Usage

Install using bower: `bower install jquery-typewrite`  
Or using npm: `npm install jquery-typewrite`  
Or just by downloading the [tarball](https://github.com/MathieuLoutre/jquery-typewrite/archive/master.zip)

The `.typewrite()` function allows a callback which will be called once all the text has been typed.


```js

	$("#my-novel").typewrite();

	$("#my-short-story").typewrite(function() { console.log('done'); });	

```

There is also a `.stopTypewrite()` which will render all the content immediately and call the callback if one has been set.


```js

	$("#my-novel").stopTypewrite();

```


### Options

#### options.delay
Type: `Integer`  
Default: `60`

The amount of time, in milliseconds, between each character.

#### options.placeholder
Type: `String`  
Default: `¶`

The character used for replacing HTML tags. If you wish to use the default character `¶` in your text, you can choose your own by setting this option.  
If you set this option don't forget to set it too if you call `.stopTypewrite()`.


```js

	$("#my-novel").typewrite({ delay: 180 }, function () {
		console.log("All the text has been typed");
	});

```


## Changelog

- 0.1.0 - First release