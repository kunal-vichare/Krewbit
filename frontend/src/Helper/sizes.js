import { Platform, StatusBar } from "react-native";
import { horizontalScale } from "../Components/Common/ResponsiveDesign";

export const imageSize = {
  imgHeight: 200,
  imgMediumHeight: 250,
  imgWidth: 300,
};

export const spacing = {
  Xs: horizontalScale(2),
  S: horizontalScale(4),
  Sm: horizontalScale(6),
  M: horizontalScale(10),
  L: horizontalScale(16),
  XL: horizontalScale(20),
  XXL: horizontalScale(30),
  XXXL: horizontalScale(70),
  XXXXL: horizontalScale(120),
};

export const pageSizeValue = {
  default: 0,
  initialValue: 1,
  verysmall: 5,
  small: 10,
  medium: 20,
  large: 50,
  extraLarge: 100,
};

export const restApiCode = {
  success: 200,
  created: 201,
  accepted: 202,
  noContent: 204,

  movedPermanently: 301,
  found: 302,
  notModified: 304,

  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409,
  gone: 410,
  unprocessableEntity: 422,
  tooManyRequests: 429,

  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
};

export const percentageCode = {
  small: "10%",
  medium: "20%",
  quarterLess: "24%",
  quarter: "25%",
  quarterPlus: "26%",
  quarterMid: "29.8%",
  nearThird: "30%",
  thirdLess: "32%",
  third: "33.1%",
  thirdPlus: "34%",
  midThird: "36%",
  biggerThird: "38%",
  large: "40%",
  largePlus: "42.5%",
  halfLess: "45%",
  half: "50%",
  halfPlus: "52%",
  bigHalf: "55%",
  halfMid: "56%",
  moreHalf: "58%",
  threeFifths: "60%",
  twoThirds: "66%",
  twoThirdsPlus: "68%",
  threeQuartersLess: "70%",
  threeQuarters: "75%",
  threeQuartersPlus: "76%",
  huge: "80%",
  xhuge: "87%",
  almostFull: "90%",
  closerToFull: "91.5%",
  nearlyFull: "96%",
  full: "100%",
};

export const opacityValue = {
  exrtaLow: 0.2,
  low: 0.5,
  medium: 0.8,
  high: 1,
};

export const iconSizes = {
  XS: horizontalScale(10),
  XXS: horizontalScale(12),
  S: horizontalScale(14),
  M: horizontalScale(20),
  L: horizontalScale(30),
  XL: horizontalScale(40),
  XXL: horizontalScale(48),
  Loader: horizontalScale(60),
};

export const flexValue = {
  none: 0,
  xxs: 0.1,
  xs: 0.2,
  sm: 0.3,
  smd: 0.4,
  md: 0.5,
  mlg: 0.6,
  lg: 0.7,
  xl: 0.8,
  xxl: 0.9,
  nearFull: 0.95,
  full: 1,
};

export const borderValue = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 3,
  extraThick: 4,
};

export const search = {
  size: 3,
};

export const duration = {
  intervalXs: 60,
  intervalSm: 120,
  debounce: 800,
  intervalExtraSmall: 200,
  intervalMediumSmall: 300,
  intervalMediumShort: 350,
  intervalExtraMedium: 500,
  intervalSmall: 600,
  intervalMedium: 1000,
  intervalLarge: 1500,
  intervalExtraLarge: 2000,
  splashNavigationInterval: 3000,
  balanceArrowDuration: 5000,
};

export const scroll = {
  throttleValue: 16,
  windowSize: 51,
  maxToRenderPerBatch: 100,
  threashold: 0.6,
  midThreshold: 0.5
};

export const zIndex = {
  zIndexBase: 0,
  zIndexContent: 1,
  zIndexHeader: 2,
  zIndexDropDown: 10,
  zIndexModal: 20,
  zIndexMax: 30,
};

export const bankLogoSize = {
  bankLogoWidth: 60,
  bankLogoHeight: 15,
};

export const filterPosition = {
  filterBase: 0,
  filterCounter: -7,
};

export const progressBar = {
  progressBarCreated: 0.3,
  progressBarAwaitingFunds: 0.7,
  progressBarDistributionInitiated: 0.7,
  progressBarDistributionComplete: 1,
  progressBarAbandoned: 0.5,
  progressBarApproved: 0.7,
  progressBarRejected: 0.7,
  progressBarFailed: 1,
};

export const TimelineBarConfiguration = {
  extrasmallwidth: 0.25,
  smallwidth: 0.5,
  mediumwidth: 0.75,
  largewidth: 1,
};

export const buttonSpacing = {
  S: horizontalScale(6),
  M: horizontalScale(10),
  L: horizontalScale(16),
  XL: horizontalScale(20),
};

export const ArrowSize = {
  Small: 18,
  Medium: 24,
  Large: 30,
};

export const BACK_BUTTON_WIDTH = horizontalScale(74);
export const bottomNavBarHeight = Platform.OS === "ios" ? 70 : 64;