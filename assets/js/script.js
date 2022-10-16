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

	let saying = $.ajax(settings)

	const typedTextSpan = document.querySelector(".typed-text");
	const cursorSpan = document.querySelector(".cursor");
	const authorSpan = document.querySelector(".said");

	let textArray = "Find something interesting.";
	let author = "";
	const typingDelay = 200;
	const erasingDelay = 100;
	const newTextDelay = 2000; // Delay between current and next text
	let textArrayIndex = 0;
	let charIndex = 0;

	function typeWriter(){

		if (charIndex < textArray.length) {
		    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		    typedTextSpan.textContent += textArray.charAt(charIndex);
		    charIndex++;
		    setTimeout(typeWriter, typingDelay);
		} 
		else {
			authorSpan.textContent = author
		    cursorSpan.classList.remove("typing");
		  	setTimeout(erase, newTextDelay);
		}
	}

	function erase() {
	  if (charIndex > 0) {
	  	authorSpan.textContent = ''
	    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
	    typedTextSpan.textContent = textArray.substring(0, charIndex-1);
	    charIndex--;
	    setTimeout(erase, erasingDelay);
	  } 
	  else {
	    cursorSpan.classList.remove("typing");

	    saying.then((message) => {
			const data = JSON.parse(message);
			let random = data[Math.floor(Math.random() * data.length)];
			textArray = random.text;
			author = '- '+random.author
			console.log(random);
		}).catch((message) => {
			console.log('catch '+message);
		}) 

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

	let p = new Promise((resolve,reject) => {
		let a = 1+1
		if(a == 2){
			resolve('success')
		}else{
			reject('failed')
		}
	})


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
