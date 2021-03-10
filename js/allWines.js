document.getElementById('button1').addEventListener('click', loadWine);

function loadWine(e){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://www.vwewebtest.com/wines/array.php`, true);

  xhr.onload = function(){
    if(this.status === 200){
      const response = JSON.parse(this.responseText);
      let output = '';

      if(response){
        for(let wine of response.product_listing){
          output += `
            <div class="card card-body mt-3 text-center" style="width:25rem;">
              <img src="${wine.bottle_shot}" class="img-fluid mx-auto mb-3">
                <h4>${wine.appellation}, ${wine.vintage}</h4>
                <h5>${wine.varietal}</h5>
                <p>${wine.bottle_size}</p>
                <h3>$ ${wine.base_price}.00</h3>
                <p>abv: ${wine.abv}</p>
                <button class="btn btn-primary mx-auto">Add to Cart</button>
            </div>
          `;
        }
      } else {
        output += '<li>Something Went Wrong</li>';
      }
      document.querySelector('.list_wines').innerHTML = output;
    }
  }
  xhr.send();
  e.preventDefault();
}

