export default function cart() {
  const getSotrage = JSON.parse(localStorage.getItem('cart')) || 0;
  localStorage.setItem('cart', JSON.stringify(getSotrage + 1));
}

export function getCart() { return (JSON.parse(localStorage.getItem('cart')) || 0); }
