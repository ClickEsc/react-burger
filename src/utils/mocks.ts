const userMock = {
  name: "test",
  email: "test1234@test1234.ru",
  password: "test1234"
}

const ingredientMock = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  name: "Флюоресцентная булка R2-D3",
  price: 988,
  proteins: 44,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c7",
}

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

const uuidMock = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

const tabTypeMock = "sauce";

const wsMessagesMock = {
  success: true,
  orders: [
    { ...orderMock },
    { ...orderMock }
  ],
  total: 50,
  totalToday: 30,
};

export {
  userMock,
  ingredientMock,
  uuidMock,
  tabTypeMock,
  orderMock,
  wsMessagesMock
}