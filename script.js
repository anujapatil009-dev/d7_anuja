const form =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const results =
    document.getElementById("results");


form.addEventListener("submit", async function(event) {

  
    event.preventDefault();


    const search =
        searchInput.value.trim();

    if (search === "") {

        error.textContent =
            "Please enter a product name.";

        results.innerHTML = "";

        return;
    }


    try {

        loading.textContent =
            "Loading...";

        error.textContent = "";

        results.innerHTML = "";

        const response =
            await fetch(
                "https://dummyjson.com/products/search?q="
                + encodeURIComponent(search)
            );

        const data =
            await response.json();


        loading.textContent = "";

        if (data.products.length === 0) {

            error.textContent =
                "No products found.";

            return;
        }

        results.innerHTML =
            data.products.map(product => {

                return `
                    <div>

                        <h2>
                            ${product.title}
                        </h2>

                        <p>
                            Price: $${product.price}
                        </p>

                        <p>
                            Category: ${product.category}
                        </p>

                    </div>

                    <hr>
                `;

            }).join("");


    } catch (err) {

        loading.textContent = "";

        error.textContent =
            "Failed to fetch data.";

        console.log(err);
    }

});