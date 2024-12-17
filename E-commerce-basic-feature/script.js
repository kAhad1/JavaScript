


let products = [
    { id: 1, name: "Product 1", price: "Rs 200", description: "This is Product 1" },
    { id: 2, name: "Product 2", price: "Rs 330", description: "This is Product 2" },
    { id: 3, name: "Product 3", price: "Rs 4220", description: "This is Product 3" },
    { id: 4, name: "Product 4", price: "Rs 1000", description: "This is Product 4" },
  ];
  
 
  function renderProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; 
  
    products.map((product) => {
      
      const card = document.createElement("div");
      card.className = "product-card";
  
      const title = document.createElement("h3");
      title.textContent = product.name;
  
      const price = document.createElement("p");
      price.textContent = product.price;
  
      const description = document.createElement("p");
      description.textContent = product.description;
  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
  
      
     
      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(description);
      card.appendChild(deleteBtn);
      
   
      deleteBtn.addEventListener("click", () => {
        
        products = products.filter((item) => item.id !== product.id);
       
        renderProducts();
      });
      
      container.appendChild(card);
    });
  }
  

  renderProducts();
  