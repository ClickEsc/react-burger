import PropTypes from 'prop-types';

export const ERROR_RES_STATUS = 'При обработке запроса произошла ошибка. Статус ответа сервера:'
export const ERROR_FETCH_GET_INGREDIENTS = 'Ошибка при запросе списка ингредиентов';
export const ERROR_FETCH_GET_ORDER_NUMBER = 'Ошибка при запросе номера заказа';

export const IS_LOADING_TEXT = 'Загрузка...';
export const HAS_ERROR_TEXT = 'Произошла ошибка';

export const INVALID_ACTION_TYPE = 'Функция вызывается с неверным свойством type в action';

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});