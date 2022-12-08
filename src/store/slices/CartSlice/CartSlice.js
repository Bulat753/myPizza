import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
export const postOrder = createAsyncThunk(
  'cart/postOrder',
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://63641a7f8a3337d9a2f16578.mockapi.io/orders', {
        orders: {
          date: moment(),
          total: obj.total,
          pizzas: obj.pizzas,
          userName: obj.userName,
          userPhone: obj.userPhone,
          amountPerson: obj.amountPerson,
          userAddress: obj.userAddress,
        },
      });
      if (response.status !== 200) {
        throw new Error('Server Error!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    productsModalWindow: [],
    orderDetails: [
      {
        id: 1,
        text: 'Имя',
        placeholder: 'Напр.: Иван',
        type: 'string',
        value: '',
        dirty: false,
        error: 'Поле "Имя" не может быть пустым',
      },
      {
        id: 2,
        text: 'Количество персон',
        placeholder: 'Напр.: 2',
        type: 'number',
        value: '',
        dirty: false,
        error: 'Поле "Количество персон" не может быть пустым',
      },
      {
        id: 3,
        text: 'Улица',
        placeholder: 'Напр.: Ленина',
        type: 'string',
        value: '',
        dirty: false,
        error: 'Поле "Улица" не может быть пустым',
      },
      {
        id: 4,
        text: 'Дом',
        placeholder: 'Напр.: 50а',
        type: 'string',
        value: '',
        dirty: false,
        error: 'Поле "Дом" не может быть пустым',
      },
      {
        id: 5,
        text: 'Квартира',
        placeholder: 'Напр.: 102',
        type: 'number',
        value: '',
        dirty: false,
        error: 'Поле "Квартира" не может быть пустым',
      },
      {
        id: 6,
        text: 'Номер телефона',
        placeholder: 'Напр.: 8-555-55-55',
        type: 'string',
        value: '',
        dirty: false,
        error: 'Поле "Номер телефона" не может быть пустым',
      },
    ],
    userName: '',
    userPhone: '',
    userAddress: [{ street: '', houseNum: '', flatNum: '' }],
    amountPerson: '',
    showCartModalWindow: false,
    showCartWidget: false,
    productsSize: 'small',
    additionOption: [],
    withoutOption: [],
    amountProducts: 1,
    showModalWindow: false,
    status: null,
    error: null,
  },
  reducers: {
    setShowModalWindow(state, action) {
      state.showModalWindow = action.payload;
    },
    setAdditionOption(state, action) {
      state.additionOption = action.payload;
    },
    setWithoutOption(state, action) {
      state.withoutOption = action.payload;
    },
    setAmountProducts(state, action) {
      state.amountProducts = action.payload;
    },
    setProductsSize(state, action) {
      state.productsSize = action.payload;
    },
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    setProductsModalWindow(state, action) {
      state.productsModalWindow = action.payload;
    },
    setShowCartModalWindow(state, action) {
      state.showCartModalWindow = action.payload;
    },
    removeProductCart(state, action) {
      state.cart.pop(
        state.cart.filter(
          (el) =>
            el.title !== action.payload.title &&
            el.size !== action.payload.size &&
            el.additionsOptions.sort().join() !== action.payload.additionOption.sort().join() &&
            el.additionsOptions.length !== action.payload.additionOption.length &&
            el.withoutOptions.length !== action.payload.withoutOption.length &&
            el.withoutOptions.sort().join() !== action.payload.withoutOption.sort().join(),
        ),
      );
    },
    increaseCount(state, action) {
      const priceProductModalWindow = state.productsModalWindow
        .map((el) =>
          el.prices
            .map((i) => i.size === action.payload.size && i.price)
            .filter((i) => typeof i === 'number'),
        )
        .join();
      if (action.payload.amount - 1 === 0) {
        state.cart.pop(
          state.cart.filter(
            (el) =>
              el.title !== action.payload.title &&
              el.size !== action.payload.size &&
              el.additionsOptions.sort().join() !== action.payload.additionOption.sort().join() &&
              el.additionsOptions.length !== action.payload.additionOption.length &&
              el.withoutOptions.length !== action.payload.withoutOption.length &&
              el.withoutOptions.sort().join() !== action.payload.withoutOption.sort().join(),
          ),
        );
      } else {
        state.cart = state.cart.map((el) =>
          el.title === action.payload.title &&
          el.size === action.payload.size &&
          el.additionsOptions.every((i) => action.payload.additionOption.includes(i)) &&
          el.additionsOptions?.length === action.payload.additionOption.length &&
          el.withoutOptions?.length === action.payload.withoutOption.length &&
          el.withoutOptions.every((i) => action.payload.withoutOption.includes(i))
            ? {
                ...el,
                amount: el.amount - 1,
                price: priceProductModalWindow * (el.amount - 1),
              }
            : el,
        );
      }
    },
    decreaseCount(state, action) {
      const priceProductModalWindow = state.productsModalWindow
        .map((el) =>
          el.prices
            .map((i) => i.size === action.payload.size && i.price)
            .filter((i) => typeof i === 'number'),
        )
        .join();
      state.cart = state.cart.map((el) =>
        el.title === action.payload.title &&
        el.size === action.payload.size &&
        el.additionsOptions.every((i) => action.payload.additionOption.includes(i)) &&
        el.additionsOptions?.length === action.payload.additionOption.length &&
        el.withoutOptions?.length === action.payload.withoutOption.length &&
        el.withoutOptions.every((i) => action.payload.withoutOption.includes(i))
          ? {
              ...el,
              amount: el.amount + 1,
              price: priceProductModalWindow * (el.amount + 1),
            }
          : el,
      );
    },
    //Блюр инпутов
    handlerBlur(state, action) {
      if (action.payload.event) {
        state.orderDetails = state.orderDetails.map((el) =>
          action.payload.text === el.text ? { ...el, dirty: false, error: '' } : el,
        );
      }
      if (action.payload.event === '') {
        state.orderDetails = state.orderDetails.map((el) =>
          action.payload.text === el.text
            ? { ...el, dirty: true, error: `Поле '${el.text}' не может быть пустым` }
            : el,
        );
      }
      if (
        action.payload.text === 'Имя' &&
        action.payload.event.split('').some((el) => Number(el))
      ) {
        state.orderDetails = state.orderDetails.map((el) =>
          el.text === 'Имя'
            ? {
                ...el,
                dirty: true,
                error: 'Данное поле не может содержать цифры',
              }
            : el,
        );
      }
      if (
        action.payload.text === 'Номер телефона' &&
        action.payload.value.length !== 17 &&
        action.payload.value.length !== 0
      ) {
        state.orderDetails = state.orderDetails.map((el) =>
          el.text === 'Номер телефона'
            ? {
                ...el,
                dirty: true,
                error: '"Номер телефона" должен иметь не менее 11 цифр',
              }
            : el,
        );
      }
    },
    // Прописываем значения в инпутах
    valueChange(state, action) {
      if (action.payload.event) {
        state.orderDetails = state.orderDetails.map((el) =>
          action.payload.text === el.text
            ? { ...el, dirty: false, value: action.payload.event }
            : el,
        );
      } else {
        state.orderDetails = state.orderDetails.map((el) =>
          action.payload.text === el.text ? { ...el, dirty: true, value: '' } : el,
        );
      }
      switch (action.payload.text) {
        case 'Имя':
          state.userName = action.payload.event;
          break;
        case 'Номер телефона':
          state.userPhone = action.payload.event;
          break;
        case 'Количество персон':
          state.amountPerson = action.payload.event;
          break;
        case 'Улица':
          state.userAddress = state.userAddress.map((el) =>
            el ? { ...el, street: action.payload.event } : el,
          );
          break;
        case 'Дом':
          state.userAddress = state.userAddress.map((el) =>
            el ? { ...el, houseNum: action.payload.event } : el,
          );
          break;
        default:
          state.userAddress = state.userAddress.map((el) =>
            el ? { ...el, flatNum: action.payload.event } : el,
          );
      }
    },
    // Изменение кнопки с disabled на active
    toggleBtn(state, action) {
      if (state.orderDetails.every((el) => el.value === '')) {
        return true;
      }
      if (state.orderDetails.some((el) => el.dirty === true || el.value === '')) {
        return true;
      }
    },
    setShowCartWidget(state, action) {
      state.showCartWidget = action.payload;
    },
    addToCart(state, action) {
      if (
        state.cart.find(
          (el) =>
            el.title === action.payload.title &&
            el.size === action.payload.productsSize &&
            el.additionsOptions.every((i) => action.payload.additionOption.includes(i)) &&
            el.additionsOptions?.length === action.payload.additionOption.length &&
            el.withoutOptions?.length === action.payload.withoutOption.length &&
            el.withoutOptions.every((i) => action.payload.withoutOption.includes(i)),
        )
      ) {
        state.cart = state.cart.map(
          (el) =>
            action.payload.productsSize && {
              ...el,
              price:
                el.size === action.payload.productsSize &&
                el.title === action.payload.title &&
                el.additionsOptions.every((i) => action.payload.additionOption.includes(i)) &&
                el.withoutOptions.every((i) => action.payload.withoutOption.includes(i))
                  ? Number(el.price) + Number(action.payload.price)
                  : Number(el.price),
              amount:
                el.size === action.payload.productsSize &&
                el.title === action.payload.title &&
                el.additionsOptions.every((i) => action.payload.additionOption.includes(i)) &&
                el.additionsOptions?.length === action.payload.additionOption.length &&
                el.withoutOptions.every((i) => action.payload.withoutOption.includes(i)) &&
                el.withoutOptions?.length === action.payload.withoutOption.length
                  ? el.amount + action.payload.amountProducts
                  : el.amount,
            },
        );
        state.additionOption = [];
        state.withoutOption = [];
        state.amountProducts = 1;
      } else {
        state.cart.push(
          ...state.productsModalWindow.map(
            (el) =>
              action.payload.productsSize && {
                title: el.title,
                size: el.prices
                  .filter((i) => i.size === action.payload.productsSize)
                  .map((k) => k.size)
                  .join(),
                price:
                  el.prices
                    .filter((i) => i.size === action.payload.productsSize)
                    .map((k) => k.price)
                    .join() * action.payload.amountProducts,
                amount: action.payload.amountProducts,
                additionsOptions: action.payload.additionOption,
                withoutOptions: action.payload.withoutOption,
              },
          ),
        );
        state.additionOption = [];
        state.withoutOption = [];
        state.amountProducts = 1;
      }
      state.showModalWindow = false;
    },
    addAddition(state, action) {
      state.productsModalWindow = state.productsModalWindow.map(
        (el) =>
          el && {
            ...el,
            prices: el.prices.map(
              (n) => n.price && { ...n, price: n.price + action.payload.price },
            ),
            additionsOptions: el.additionsOptions.map((i) =>
              i.name === action.payload.name ? { ...i, completed: true } : i,
            ),
          },
      );
      state.additionOption.push(action.payload.name);
    },
    removeAddition(state, action) {
      state.productsModalWindow = state.productsModalWindow.map(
        (el) =>
          el && {
            ...el,
            prices: el.prices.map(
              (n) => n.price && { ...n, price: n.price - action.payload.price },
            ),
            additionsOptions: el.additionsOptions.map((i) =>
              i.name === action.payload.name ? { ...i, completed: false } : i,
            ),
          },
      );
      state.additionOption = state.additionOption.filter((i) => i !== action.payload.name);
    },
    addWithoutOptions(state, action) {
      state.productsModalWindow = state.productsModalWindow.map(
        (el) =>
          el && {
            ...el,
            withoutOptions: el.withoutOptions.map((i) =>
              i.name === action.payload.name ? { ...i, completed: action.payload.event } : i,
            ),
            prices: el.prices.map(
              (n) => n.price && { ...n, price: n.price + action.payload.price },
            ),
          },
      );
      state.withoutOption = state.withoutOption.filter((i) => i !== action.payload.name);
    },
    removeWithoutOptions(state, action) {
      state.productsModalWindow = state.productsModalWindow.map(
        (el) =>
          el && {
            ...el,
            withoutOptions: el.withoutOptions.map((i) =>
              i.name === action.payload.name ? { ...i, completed: action.payload.event } : i,
            ),
            prices: el.prices.map(
              (n) => n.price && { ...n, price: n.price - action.payload.price },
            ),
          },
      );

      state.withoutOption.push(action.payload.name);
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const {
  setShowModalWindow,
  setAdditionOption,
  setWithoutOption,
  setAmountProducts,
  setProductsSize,
  setOrderDetails,
  setCart,
  removeProductCart,
  increaseCount,
  decreaseCount,
  setProductsModalWindow,
  handlerBlur,
  valueChange,
  toggleBtn,
  setShowCartModalWindow,
  setShowCartWidget,
  addToCart,
  addAddition,
  removeAddition,
  addWithoutOptions,
  removeWithoutOptions,
} = CartSlice.actions;
export default CartSlice.reducer;
