(function(window, document) {
	var defaultImage = 'assets/images/produto-sem-imagem.gif';

	function init(data) {
		buildProductSeen(data.reference.item);
		buildProductsList(data.recommendation)
		setup(data.widget);
	}

	function buildProductSeen(item) {
		var box = document.getElementById('product-seen'),
			template = document.getElementById("product-template").innerHTML,
			div = document.createElement('div');

		box.appendChild(returnCompletedTemplate(div, template, item));
	}

	function buildProductsList(items) {
		var box = document.getElementById('list-recommended-products');

		items.forEach(function(item) {
			var template = document.getElementById("product-template").innerHTML,
				li = document.createElement('li');

			box.appendChild(returnCompletedTemplate(li, template, item));
		});
	}

	function returnCompletedTemplate(el, template, item) {
		el.innerHTML = template;
		var tempImage = 'http:' + item.imageName;
		if(!isValidImage(tempImage)) {
			tempImage = defaultImage;
		}

		if(item.oldPrice === null){
			el.getElementsByClassName('product-old-price')[0].style.display = 'none'
		}

		el.getElementsByClassName('result-product-detail-url')[0].href = 'http:' + item.detailUrl;
		el.getElementsByClassName('result-product-image-name')[0].src = 'http:' + item.imageName;
		el.getElementsByClassName('result-product-description')[0].innerHTML = item.name;
		el.getElementsByClassName('result-product-old-price')[0].innerHTML = item.oldPrice;
		el.getElementsByClassName('result-product-price')[0].innerHTML = item.price;
		el.getElementsByClassName('result-product-payment-conditions')[0].innerHTML = item.productInfo.paymentConditions;

		return el;
	}

	function setup(widget) {
		var prevButton = document.getElementById('navigate-prev');
		var nextButton = document.getElementById('navigate-next');
		var listProducts = document.getElementById('list-recommended-products');
		var boxListProducts = document.getElementById('box-recommended-products');

		var minDistance = 0;
		// 10 = padding-left + padding-right
		var maxDistance = (((listProducts.children[0].clientWidth + 10)  * widget.size) - boxListProducts.clientWidth) * -1;

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
			console.log(current)
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

		getJSONP(url, function(data) {
			init(data.data);	
		});		
	};

})(window, document);
