const orderMock = {
  createdAt: "2022-07-17T09:30:29.707Z",
  ingredients: [
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733c7",
  ],
  name: "Space флюоресцентный spicy бургер",
  number: 20458,
  status: "done",
  updatedAt: "2022-07-17T09:30:30.046Z",
  _id: "62d3d6b542d34a001c2790b1",
}

const wsMessagesMock = {
  success: true,
  orders: [
    {...orderMock},
    {...orderMock}
  ],
  total: 50,
  totalToday: 30,
};

export {
  wsMessagesMock
}