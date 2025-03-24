export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Ürünler alınamadı");
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Hata:", error);
    return [];
  }
};

export const filterProductsByCategory = (products, category) => {
  if (category === "all") return products; 
  return products.filter((product) => product.category === category);
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Ürün bulunamadı!");
    }

    const product = await response.json();

    return product;
  } catch (error) {
    console.error("Hata:", error);
    return null;
  }
};
