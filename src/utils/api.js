import {AUTH_SERVICE_V1, BASE_PATH, OAUTH2_REDIRECT_URI} from "./RestContants";

export const SIGN_IN_PATH = BASE_PATH + AUTH_SERVICE_V1 + 'auth/sign-in';
export const CATEGORIES_PATH = BASE_PATH + 'api/order/v1/category/list';
export const ADD_CATEGORY_PATH = BASE_PATH + 'api/order/v1/category/add';
export const EDIT_CATEGORY_PATH = BASE_PATH + 'api/order/v1/category/';
export const DELETE_CATEGORY_PATH = BASE_PATH + 'api/order/v1/category/';
export const GET_CURRENT_USER_PATH = BASE_PATH + AUTH_SERVICE_V1 + 'user/me';
export const REFRESH_TOKEN_PATH = BASE_PATH + AUTH_SERVICE_V1 + 'auth/refresh-token';

export const WEBSOCKET_ADD_USER_PATH = BASE_PATH + 'api/user/sign';
export const WEBSOCKET_SEARCH_USER_PATH = BASE_PATH + 'api/user/search';
export const WEBSOCKET_GET_CHATS_PATH = BASE_PATH + 'api/chat/chats';
export const WEBSOCKET_GET_MESSAGES_PATH = BASE_PATH + 'api/message/list';

export const GOOGLE_AUTH_URL = BASE_PATH + 'oauth2/authorize/google?redirect_uri_sign=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = BASE_PATH + 'oauth2/authorize/facebook?redirect_uri_sign=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = BASE_PATH + 'oauth2/authorize/github?redirect_uri_sign=' + OAUTH2_REDIRECT_URI;

