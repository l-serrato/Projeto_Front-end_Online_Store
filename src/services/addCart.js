import cart from './cart';

const addCart = (eachResult) => {
  const getStorage = JSON.parse(localStorage.getItem('IDS')) || [];
  const verific = getStorage.length > 0
    ? getStorage.find((elemento) => elemento.id === eachResult.id) : false;
  if (verific) {
    let { contTeste } = verific;
    contTeste = contTeste ? contTeste + 1 : 2;
    verific.contTeste = contTeste;
    const filtro = getStorage.filter((elemento) => elemento.id !== eachResult.id);
    filtro.push(verific);
    localStorage.setItem('IDS', JSON.stringify(filtro));
  } else {
    getStorage.push(eachResult);
    localStorage.setItem('IDS', JSON.stringify(getStorage));
  }
  cart();
};

export default addCart;
