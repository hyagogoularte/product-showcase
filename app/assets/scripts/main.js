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

		div.innerHTML = template;
		div.getElementsByClassName('result-product-detail-url')[0].href = 'http://' + item.detailUrl;

		var tempImage = defaultImage;
		if(isValidImage(item.imageName)) {
			tempImage = item.imageName;
		}

		div.getElementsByClassName('result-product-image-name')[0].src = tempImage;
		div.getElementsByClassName('result-product-description')[0].innerHTML = item.name;
		div.getElementsByClassName('result-product-old-price')[0].innerHTML = item.oldPrice;
		div.getElementsByClassName('result-product-price')[0].innerHTML = item.price;
		div.getElementsByClassName('result-product-payment-conditions')[0].innerHTML = item.productInfo.paymentConditions;
		box.appendChild(div);
	}

	function buildProductsList(items) {
		var box = document.getElementById('list-recommended-products');

		items.forEach(function(item) {
			var template = document.getElementById("product-template").innerHTML,
				li = document.createElement('li');

			li.innerHTML = template;

			var tempImage = defaultImage;
			if(isValidImage(item.imageName)) {
				tempImage = item.imageName;
			}

			if(item.oldPrice === null){
				li.getElementsByClassName('product-old-price')[0].style.display = 'none'
			}

			li.getElementsByClassName('result-product-detail-url')[0].href = 'http://' + item.detailUrl;
			li.getElementsByClassName('result-product-image-name')[0].src = tempImage;
			li.getElementsByClassName('result-product-description')[0].innerHTML = item.name;
			li.getElementsByClassName('result-product-old-price')[0].innerHTML = item.oldPrice;
			li.getElementsByClassName('result-product-price')[0].innerHTML = item.price;
			li.getElementsByClassName('result-product-payment-conditions')[0].innerHTML = item.productInfo.paymentConditions;
			box.appendChild(li);
		});
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
