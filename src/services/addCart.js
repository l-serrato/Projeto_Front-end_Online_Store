const addCart = (eachResult) => {
  // console.log(eachResult);
  const getStorage = JSON.parse(localStorage.getItem('IDS')) || [];
  const verific = getStorage.length > 0
    ? getStorage.find((elemento) => elemento.id === eachResult.id) : false;
  // console.log(verific);
  if (verific) {
    let { contTeste } = verific;
    contTeste = contTeste ? contTeste + 1 : 2;
    verific.contTeste = contTeste;
    // console.log(verific);
    const filtro = getStorage.filter((elemento) => elemento.id !== eachResult.id);
    // console.log(filtro);
    filtro.push(verific);
    localStorage.setItem('IDS', JSON.stringify(filtro));
  } else {
    getStorage.push(eachResult);
    localStorage.setItem('IDS', JSON.stringify(getStorage));
  }
};

export default addCart;
