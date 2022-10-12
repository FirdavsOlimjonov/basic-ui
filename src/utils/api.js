import {BASE_PATH} from "./RestContants";

export const SIGN_IN_PATH = BASE_PATH + 'api/auth/v1/auth/sign-in';
export const CATEGORIES_PATH = BASE_PATH + 'api/order/v1/category/list';
export const ADD_CATEGORY_PATH = BASE_PATH + 'api/order/v1/category/add';
export const EDIT_CATEGORY_PATH = BASE_PATH + 'api/order/v1/category/';
export const DELETE_CATEGORY_PATH = BASE_PATH + 'api/order/v1/category/';
export const GET_CURRENT_USER_PATH = BASE_PATH + 'api/auth/v1/user/me';
export const REFRESH_TOKEN_PATH = BASE_PATH + 'api/auth/v1/auth/refresh-token';

export const WEBSOCKET_ADD_USER_PATH = BASE_PATH + 'user/sign';
export const WEBSOCKET_GET_CHATS_PATH = BASE_PATH + 'chat/getChats';
