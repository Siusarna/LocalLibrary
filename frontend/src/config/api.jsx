const API_URL = 'http://35.242.202.122:3000/api';

const apiInfo = {
  accounts: {
    signUp() {
      return '/sign-up';
    },
    signIn() {
      return '/sign-in';
    },
    profile() {
      return '/profile';
    },
    forgotPassword() {
      return '/forgotPassword';
    },
    logout() {
      return '/logout';
    },
    photo() {
      return '/photo';
    },
    telegram() {
      return '/telegram';
    },
    connectTelegram() {
      return '/connectTelegram';
    },
  },
  authors: {
    _(id) {
      return `/${id}`;
    },
    books(id) {
      return `/${id}/book`;
    },
  },
  books: {
    _(id) {
      return `/${id}`;
    },
  },
  news: {
    _(id) {
      return `/${id}`;
    },
  },
  orders: {
    create() {
      return '/create';
    },
    confirm() {
      return '/confirm';
    },
    confirmationCode() {
      return '/confirmationCode';
    },
    confirmCode() {
      return '/confirmCode';
    },
    finish() {
      return '/finish';
    },
  },
  rating: {
    _(id) {
      return `/${id}`;
    },
  },
  reviews: {
    _(id) {
      return `/${id}`;
    },
  },
  search: {
    _(query) {
      return `/${query}`;
    },
  },
  subscription: {},
};

const formURL = (route) => `${API_URL}/${route}`;

const genAPIObject = (api) => {
  const res = {};
  for (const prefix of Object.keys(api)) {
    res[prefix] = (...args) => {
      if (api[prefix]._ && args.length > 0) {
        return formURL(prefix + api[prefix]._(args));
      }
      return formURL(prefix);
    };
    for (const route of Object.keys(api[prefix])) {
      if (route !== '_') {
        res[prefix][route] = (...args) => formURL(prefix + api[prefix][route](args));
      }
    }
  }
  return res;
};

export default genAPIObject(apiInfo);
