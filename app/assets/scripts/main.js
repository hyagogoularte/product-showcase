(function(window) {

	function init() {
		setup();
	}

	function setup() {
		var prevButton = document.getElementById('navigate-prev');
		var nextButton = document.getElementById('navigate-next');
		var listProducts = document.getElementById('list-recommended-products');
		var boxListProducts = document.getElementById('box-recommended-products');

		var minDistance = 0;
		var maxDistance = '-' + (((listProducts.children[0].clientWidth + 10)  * listProducts.children.length) - boxListProducts.clientWidth - 1);

		listProducts.style.left = listProducts.style.left === '' ? 0 : listProducts.style.left;
		prevButton.classList.add("disabled");

		prevButton.addEventListener('click', function() {
			var current = listProducts.style.left;
			nextButton.classList.remove("disabled");

			if(parseInt(current) === minDistance) {
				return;
			}

			listProducts.style.left = (parseInt(current) + 50) + 'px';

			addDisableClass(listProducts.style.left, minDistance, prevButton);
		});

		nextButton.addEventListener('click', function() {
			var current = listProducts.style.left;
			prevButton.classList.remove("disabled");

			if(parseInt(current) === parseInt(maxDistance)) {
				return;
			}

			listProducts.style.left = (parseInt(current) - 50) + 'px';

			addDisableClass(listProducts.style.left, maxDistance, nextButton);
		});

		function addDisableClass(ulLeft, distance, button) {
			if(parseInt(ulLeft) === parseInt(distance)) {
				button.classList.add("disabled");
			}
		}
	}	

	window.onload = function() {
		init();	
	};

})(window, document);