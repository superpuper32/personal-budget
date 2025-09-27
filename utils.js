const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id);
  });
};

const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error("updateElement must be called with a valid id parameter");
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};

module.exports = {
  getIndexById: getIndexById,
  getElementById: getElementById,
  updateElement: updateElement,
};