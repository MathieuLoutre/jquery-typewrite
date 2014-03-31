# jquery-typewrite

> Type the content of an HTML element, character by character

## Why?

There's a few plugins out there allowing you to type some text character by character, however I haven't been able to find one which would allow my to type HTML elements along with the text. You can even nest the HTML elements inside and it will still work.

## How?

It replaces all the HTML tags inside the element with a placeholder character. When finding this character whilst typing the text, it will insert the element and call `.typewrite()` on it recursively and wait until the context of the element is typed out to continue typing the rest of the text.

## Usage

Install from bower/npm/download


options
	delay
	placeholder


``js

	$("#my-novel").typewrite()

``