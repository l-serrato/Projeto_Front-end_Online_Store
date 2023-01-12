export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${productId}`).catch((erro) => erro);
  const result = fetchProductDetails.json();
  return result;
}
