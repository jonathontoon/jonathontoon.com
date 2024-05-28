/*
	Adapted from a codepen by Rich Howell
	https://codepen.io/roborich/pen/wRMKaK
*/

(() => {
	"use strict";

	/*
		Variables
	*/

	const _faceRules = [
		[1, 0, 2],
		[1, 2, 0],
		[3, 2, 1],
		[5, 2, 3],
		[0, 2, 5],
		[1, 3, 4]
	];


	const _faceNames = [
		"Top",
		"Front",
		"Right",
		"Back",
		"Left",
		"Bottom"
	];

	const _faceSize = 768;

	let _canvasElement = undefined;
	let _canvasBuffer = undefined;
	let _cubeElement = undefined;

	/*
		Functions
	*/

	const _generateFace = ([ruleR, ruleG, ruleB]) => {
		// Create unsigned array to represent image data for each cube side.
		const imageSrc = new Uint8ClampedArray(_faceSize * _faceSize * 4);

		// Iterate over image array.
		for (let i = 0; i < imageSrc.length; i += 4) {
			// Create offset for each channel.
			const [r, g, b, a] = [i, i + 1, i + 2, i + 3];

			// Determine which face is being rendered
			const pixelI = i / 4;

			// Determine column of face
			const col = pixelI  % _faceSize;

			// Determine row of face
			const row = Math.floor(pixelI / _faceSize);
			const ruleMap = [0, col, row, 0xFF, 0xFF - row, 0xFF - col];

			// Determine values for each point.
			imageSrc[r] = ruleMap[ruleR];
			imageSrc[g] = ruleMap[ruleG];
			imageSrc[b] = ruleMap[ruleB];
      			
			// Static alpha channel.
			imageSrc[a] = 130;
		}

		// Convert array in to image data and render it to the canvas.
		const imageData = new ImageData(imageSrc, _faceSize, _faceSize);
		_canvasBuffer.putImageData(imageData, 0, 0);

		// Extract image data from canvas and render it to image element.
		const image = new Image(_faceSize, _faceSize);
		image.src = _canvasElement.toDataURL("image/png");

		return image;
	};

	const _handleDOMContentLoaded = () => {
		// Initialize variables.
		_canvasElement = document.createElement("canvas");
		_canvasElement.setAttribute("width", "256");
		_canvasElement.setAttribute("height", "256");

		_canvasBuffer = _canvasElement.getContext("2d");
		_cubeElement = document.getElementById("cube");

    	// Add attributes to each image element.
		_faceRules.map(_generateFace).forEach(function (img, i) {
			img.classList.add(`face-${i}`);
			img.setAttribute("alt", `Cube Face ${_faceNames[i]}`);
			_cubeElement.appendChild(img);
		});	
	};

	/*
		Event Listeners
	*/

	document.addEventListener("DOMContentLoaded", _handleDOMContentLoaded, false);
})();
