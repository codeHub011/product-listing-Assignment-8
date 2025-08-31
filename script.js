 const products = [
      { name: "Smartphone", category: "electronics", price: 120, rating: 4.5, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXAmYRqQHO99wkXOhfM01ILpEsz1PRufprDoIapIAKajG1uGN_IqNiFkW-hkvvOZWmBNfmwm9BhNEol4M5YePVGaBpczVVHjecbhJkUWE" },
      { name: "Laptop", category: "electronics", price: 950, rating: 4.8, image: "https://m.media-amazon.com/images/I/61SHFVKs+AL.jpg" },
      { name: "T-Shirt", category: "clothing", price: 25, rating: 4.1, image: "https://media.canva.com/v2/mockup-template-rasterize/color0:ffffff/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAGOQzSd_9o%2F1%2F0%2F933w-tBK74h5FyUI.png/mockuptemplateid:FqXFzEXX7/size:L?csig=AAAAAAAAAAAAAAAAAAAAALNg4heFXK8QnGmHMgkIN2rwj0Ph34N1-Ud_WSPqAhth&exp=1756712576&osig=AAAAAAAAAAAAAAAAAAAAAEQ3KV4VKvSMHTvuyzN26EvFaldH_MHZKXkMP3beeXuk&seoslug=black-and-white-gym-motivational-t-shirt-design&signer=marketplace-rpc" },
      { name: "Jeans", category: "clothing", price: 60, rating: 4.3, image: "https://jimmyluxury.in/cdn/shop/files/IMG_7020.jpg?v=1749016690" },
      { name: "Headphones", category: "electronics", price: 80, rating: 3.9, image: "https://m.media-amazon.com/images/I/41lArSiD5hL._UF1000,1000_QL80_.jpg" },
      { name: "Watch", category: "accessories", price: 150, rating: 4.6, image: "https://justintime.in/cdn/shop/files/JIT_APRIL_Mens_watches_landing_page_banner_Mobile_700x.png?v=7973844980762103267" },
      { name: "Shoes", category: "clothing", price: 70, rating: 4.2, image: "https://assets.ajio.com/medias/sys_master/root/20240806/ceBM/66b218d31d763220fa62009a/-473Wx593H-700191363-brown-MODEL.jpg" },
      { name: "Sunglasses", category: "accessories", price: 45, rating: 3.8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDEl_v5j59aaUosn7R2ASwnRIapR9ddHxLdg&s" },

      { name: "Smartphone", category: "electronics", price: 120, rating: 4.5, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXAmYRqQHO99wkXOhfM01ILpEsz1PRufprDoIapIAKajG1uGN_IqNiFkW-hkvvOZWmBNfmwm9BhNEol4M5YePVGaBpczVVHjecbhJkUWE" },
      { name: "Laptop", category: "electronics", price: 950, rating: 4.8, image: "https://m.media-amazon.com/images/I/61SHFVKs+AL.jpg" },
      { name: "T-Shirt", category: "clothing", price: 25, rating: 4.1, image: "https://media.canva.com/v2/mockup-template-rasterize/color0:ffffff/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAGOQzSd_9o%2F1%2F0%2F933w-tBK74h5FyUI.png/mockuptemplateid:FqXFzEXX7/size:L?csig=AAAAAAAAAAAAAAAAAAAAALNg4heFXK8QnGmHMgkIN2rwj0Ph34N1-Ud_WSPqAhth&exp=1756712576&osig=AAAAAAAAAAAAAAAAAAAAAEQ3KV4VKvSMHTvuyzN26EvFaldH_MHZKXkMP3beeXuk&seoslug=black-and-white-gym-motivational-t-shirt-design&signer=marketplace-rpc" },
      { name: "Jeans", category: "clothing", price: 60, rating: 4.3, image: "https://jimmyluxury.in/cdn/shop/files/IMG_7020.jpg?v=1749016690" },
    ];

    const grid = document.getElementById("productGrid");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");

    // Fallback SVG if image fails
    function svgFallback(name) {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
          <rect width='100%' height='100%' fill='#e6f0ff'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                font-family='Verdana' font-size='20' fill='#333'>${name}</text>
        </svg>`;
      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }

    // Render Products
    function renderProducts(list) {
      grid.innerHTML = "";
      if (list.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No products found</p>";
        return;
      }

      list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = p.image;
        img.onerror = function () {
          this.onerror = null;
          this.src = svgFallback(p.name);
        };

        const title = document.createElement("h3");
        title.textContent = p.name;

        const price = document.createElement("p");
        price.textContent = "$" + p.price;

        const rating = document.createElement("p");
        rating.textContent = "⭐ " + p.rating;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(rating);

        grid.appendChild(card);
      });
    }

    // Filter & Search
    function applyFilters() {
      let filtered = products;

      const searchText = searchInput.value.toLowerCase();
      if (searchText) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));
      }

      if (categoryFilter.value) {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
      }

      if (priceFilter.value) {
        const [min, max] = priceFilter.value.split("-").map(Number);
        filtered = filtered.filter(p => p.price >= min && (!max || p.price <= max));
      }

      if (ratingFilter.value) {
        filtered = filtered.filter(p => p.rating >= Number(ratingFilter.value));
      }

      renderProducts(filtered);
    }

    // Event Listeners
    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);
    priceFilter.addEventListener("change", applyFilters);
    ratingFilter.addEventListener("change", applyFilters);

    // Initial render
    renderProducts(products);