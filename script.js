
//-----------------------***********************---------------------------
// Define constants for element selectors
const productsContainer = document.getElementById("product-contanier");
const listViewButton = document.getElementById("list-view-button");
const gridViewButton = document.getElementById("grid-view-button");
const inputSearchText = document.getElementById("input-search-text");


function renderProducts(view) {
    // Clear existing content in productsContainer
    productsContainer.innerHTML = " ";

    allProducts.forEach((eachProduct) => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container', view === 'grid' ? 'grid-view' : 'list-view');

        // Create and append product image
        const productImage = document.createElement('img');
        productImage.src = eachProduct.productImage;
        productImage.alt = eachProduct.productTitle;
        productContainer.appendChild(productImage);

        // Create and append product badge
        const productBadge = document.createElement('span');
        productBadge.classList.add('product-badge');
        productBadge.textContent = eachProduct.productBadge;
        productContainer.appendChild(productBadge);

        // Create and append product name
        const productName = document.createElement('h2');
        productName.textContent = eachProduct.productTitle;
        productContainer.appendChild(productName);

        // Create and append product variants
        const productVariants = document.createElement('ul');
        productVariants.classList.add('product-variants');

        eachProduct.productVariants.forEach((variant) => {
            var variantItem = document.createElement('li');
            variantItem.textContent = variant;
            variantItem.classList.add('variant');
            productVariants.appendChild(variantItem);
        });

        productContainer.appendChild(productVariants);
        

        // Append the product container to the productsContainer
        productsContainer.appendChild(productContainer);
    });
}

// Event listener for the input search text
inputSearchText.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();
    const variants = document.querySelectorAll('.variant');

    variants.forEach((variant) => {
        const variantText = variant.textContent.toLowerCase();
        const shouldShow = variantText.includes(searchText);

        // Toggle the 'hidden' class to hide or show the variant
        variant.classList.toggle('hidden', !shouldShow);
    });
});
inputSearchText.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();
    const variants = document.querySelectorAll('.variant');

    variants.forEach((variant) => {
        const variantText = variant.textContent.toLowerCase();
        const shouldShow = variantText.includes(searchText);

        // Toggle the 'hidden' class to hide or show the variant
        variant.classList.toggle('hidden', !shouldShow);

        // Highlight the matched text
        if (shouldShow) {
            const highlightedText = variantText.replace(new RegExp(searchText, 'gi'), (match) => {
                return `<span class="highlight">${match}</span>`;
            });
            variant.innerHTML = highlightedText;
        } else {
            // Reset the variant's innerHTML to original state
            variant.innerHTML = variantText;
        }
    });
});



// Event listener for list view button
listViewButton.addEventListener('click', () => {
    renderProducts('list');
});

// Event listener for grid view button
gridViewButton.addEventListener('click', () => {
    renderProducts('grid');
});

// Declare allProducts as an empty array to avoid undefined errors
let allProducts = [];

// Function to fetch and initialize the products
async function initializeProducts() {
    apiURL="https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
    try {
        const response = await fetch(apiURL);
        const productsObject = await response.json();
        allProducts = productsObject.data.map((eachProduct) => {
            return {
                productTitle: eachProduct.product_title,
                productBadge: eachProduct.product_badge,
                productImage: eachProduct.product_image,
                productVariants: eachProduct.product_variants.map((variant) => variant.v1),
            };
        });
        renderProducts('list'); // Initialize with list view
    } catch (error) {
        console.error(error);
    }
}

// Call the function to initialize products
initializeProducts();
