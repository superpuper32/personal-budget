const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id);
  });
};

module.exports = {
  getElementById: getElementById,
};