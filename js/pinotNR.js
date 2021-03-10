document.getElementById('pinotNR').addEventListener('click', filterPinotNR);

function filterPinotNR(e){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://www.vwewebtest.com/wines/array.php`, true);

  xhr.onload = function(){
    if(this.status === 200){
      const response = JSON.parse(this.responseText);
      let output = '';

      if(response){
        for(let i = 0; i < response.product_listing.length; i++){
          for(let wine of Object.keys(response)){
            if(response.product_listing[i].varietal === 'Pinot Noir Rose'){
              output += `
                <div class="card card-body mt-3 text-center" style="width:25rem;">
                  <img src="${response.product_listing[i].bottle_shot}" class="img-fluid mx-auto mb-3">
                  <h4>${response.product_listing[i].appellation}, ${response.product_listing[i].vintage}</h4>
                  <h5>${response.product_listing[i].varietal}</h5>
                  <p>${response.product_listing[i].bottle_size}</p>
                  <h3>$ ${response.product_listing[i].base_price}.00</h3>
                  <p>abv: ${response.product_listing[i].abv}</p>
                  <button class="btn btn-primary mx-auto">Add to Cart</button>
                </div>
              `;
            }
          }
        }
      } else {
        output += '<li>Something went wrong</li>';
      }
      document.querySelector('.list_wines').innerHTML = output;
    }
  }
  xhr.send();
  e.preventDefault();
}