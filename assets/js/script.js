/**
 * File scripts.js.
 *
 * The code for your theme JavaScript source should reside in this file.
 */

( function( $ ) {
	'use strict';

	const settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://type.fit/api/quotes",
	  "method": "GET"
	}

	let saying = $.ajax(settings).done(function (response) {
	  const data = JSON.parse(response);
	  let random = data[Math.floor(Math.random() * data.length)];
	  return random;
	});

	const typedTextSpan = document.querySelector(".typed-text");
	const cursorSpan = document.querySelector(".cursor");

	const textArray = ["Find something interesting."];
	const typingDelay = 200;
	const erasingDelay = 100;
	const newTextDelay = 2000; // Delay between current and next text
	let textArrayIndex = 0;
	let charIndex = 0;

	function typeWriter(){

		if (charIndex < textArray[textArrayIndex].length) {
		    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		    charIndex++;
		    setTimeout(typeWriter, typingDelay);
		} 
		else {
		    cursorSpan.classList.remove("typing");
		  	setTimeout(erase, newTextDelay);
		}
	}

	function erase() {
	  if (charIndex > 0) {
	    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
	    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
	    charIndex--;
	    setTimeout(erase, erasingDelay);
	  } 
	  else {
	    cursorSpan.classList.remove("typing");
	    textArrayIndex++;
	    if(textArrayIndex>=textArray.length) textArrayIndex=0;
	    setTimeout(typeWriter, typingDelay + 1100);
	  }
	}

	// check if top is zero
	function check_top(){
		var top = $(window).scrollTop();
		if (top > 0) {
			$(".header").stop(true,false).addClass("show", {duration:300});
	    } else {
	    	$(".header").stop(true,false).removeClass("show", {duration:300});
	    }
	}

	// Check if DOM is ready.
	$(function() {
		console.log('Ready');

		check_top();
		$(window).scroll(function() { 
			check_top();
		})

		$(".typed-text").empty();

		setTimeout(typeWriter, newTextDelay + 250);
	});

} )( jQuery );
