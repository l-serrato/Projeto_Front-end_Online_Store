const controlLS = (id, data) => {
  const dataLS = JSON.parse(localStorage.getItem(`${id}`)) || [];

  if (dataLS.length > 0) {
    dataLS.push(data);
    localStorage.setItem(`${id}`, JSON.stringify(dataLS));
  } else {
    const listNew = [data];
    localStorage.setItem(`${id}`, JSON.stringify(listNew));
  }
};

export default controlLS;
