(function(window, document) {

	function init() {
		
		setup();
	}

	function buildProductSeen(item) {
		var html = productTemplate;
		html = html.replace('{{detailUrl}}', item.detailUrl);
		html = html.replace('{{imageName}}', item.imageName);
		html = html.replace('{{name}}', item.name);
		html = html.replace('{{oldPrice}}', item.oldPrice);
		html = html.replace('{{price}}', item.price);
		html = html.replace('{{paymentConditions}}', item.productInfo.paymentConditions);



		document.getElementById('product-seen').innerHTML = html;
	}


	function setup() {
		var prevButton = document.getElementById('navigate-prev');
		var nextButton = document.getElementById('navigate-next');
		var listProducts = document.getElementById('list-recommended-products');
		var boxListProducts = document.getElementById('box-recommended-products');

		var minDistance = 0;

		// listProducts.children.length (PODE PEGAR DO JSON)
		var maxDistance = (((listProducts.children[0].clientWidth + 10)  * listProducts.children.length) - boxListProducts.clientWidth - 1) * -1;

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
		var url = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';

		loadExternalUrl(url, function() {
			init();	
		});		
	};

})(window, document);
