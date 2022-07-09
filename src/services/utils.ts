import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');


export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | number | boolean | null, props?: any) {
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = (value === null) ? null : encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export function convertDate(value: string) {
  const date = moment(value).calendar();
  const GMT = new Date(value).toString().split(' ').find(item => item.startsWith('GMT'));
  const timeZone  = GMT?.split('GMT')[1];
  const sign = timeZone?.split('')[0];
  const time = GMT?.split(`${sign}`)[1];
  const resultTime = time?.startsWith('0') && time?.endsWith('00') ? time.split('')[1] : time;
  return `${date} i-GMT${sign}${resultTime}`
}

export const getStatus = (status: string) => {
  switch (status) {
    case "done":
      return "Выполнен";
    case "pending":
      return "Готовится";
      case "cancelled": 
      return "Отменен"
    default:
      return "Создан"
  }
}
