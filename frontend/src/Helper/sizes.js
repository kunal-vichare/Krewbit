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

  none: 0,
  zero: 0,
  three: horizontalScale(3),
  five: horizontalScale(5),
  small: horizontalScale(8),
  medium: horizontalScale(12),
  mediumLarge: horizontalScale(14),
  large: horizontalScale(18),
  xLarge: horizontalScale(24),
  xxLarge: horizontalScale(28),
  xxxLarge: horizontalScale(32),

  s0: 0,
  s2: horizontalScale(2),
  s3: horizontalScale(3),
  s4: horizontalScale(4),
  s5: horizontalScale(5),
  s6: horizontalScale(6),
  s8: horizontalScale(8),
  s10: horizontalScale(10),
  s12: horizontalScale(12),
  s14: horizontalScale(14),
  s16: horizontalScale(16),
  s18: horizontalScale(18),
  s20: horizontalScale(20),
  s24: horizontalScale(24),
  s28: horizontalScale(28),
  s30: horizontalScale(30),
  s32: horizontalScale(32),

  0: 0,
  2: horizontalScale(2),
  3: horizontalScale(3),
  4: horizontalScale(4),
  5: horizontalScale(5),
  6: horizontalScale(6),
  8: horizontalScale(8),
  10: horizontalScale(10),
  12: horizontalScale(12),
  14: horizontalScale(14),
  16: horizontalScale(16),
  18: horizontalScale(18),
  20: horizontalScale(20),
  24: horizontalScale(24),
  28: horizontalScale(28),
  30: horizontalScale(30),
  32: horizontalScale(32),
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
  aroundThird: "31%",
  p31: "31%",
  thirdLess: "32%",
  third: "33.1%",
  thirdPlus: "34%",
  midThird: "36%",
  biggerThird: "38%",
  large: "40%",
  largePlus: "42.5%",
  halfLess: "45%",
  nearHalf: "48%",
  p48: "48%",
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
  none: 0,
  faint: 0.15,
  exrtaLow: 0.2,
  extraLow: 0.2,
  quarter: 0.25,
  semiLow: 0.3,
  low: 0.5,
  touchLight: 0.7,
  medium: 0.8,
  touch: 0.85,
  touchHeavy: 0.9,
  high: 1,

  0: 0,
  0.15: 0.15,
  0.2: 0.2,
  0.25: 0.25,
  0.3: 0.3,
  0.5: 0.5,
  0.7: 0.7,
  0.8: 0.8,
  0.85: 0.85,
  0.9: 0.9,
  1: 1,
};

export const fontSizes = {
  tiny: 9,
  extraSmall: 10,
  small: 11,
  bodySmall: 12,
  body: 13,
  bodyMedium: 14,
  bodyLarge: 15,
  medium: 16,
  section: 18,
  titleSmall: 20,
  titleMedium: 22,
  title: 24,
  titleLarge: 26,
  huge: 32,

  fs9: 9,
  fs10: 10,
  fs11: 11,
  fs12: 12,
  fs13: 13,
  fs14: 14,
  fs15: 15,
  fs16: 16,
  fs18: 18,
  fs20: 20,
  fs22: 22,
  fs24: 24,
  fs26: 26,
  fs32: 32,

  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  32: 32,
};
export const fontSize = fontSizes;

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
  roundSmall: 42,
  roundMedium: 55,
  circle: 80,
  full: 9999,

  br4: 4,
  br6: 6,
  br8: 8,
  br10: 10,
  br12: 12,
  br16: 16,
  br42: 42,
  br55: 55,
  br80: 80,

  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  42: 42,
  55: 55,
  80: 80,
};

export const lineHeights = {
  tight: 15,
  small: 16,
  medium: 18,
  normal: 20,

  lh15: 15,
  lh16: 16,
  lh18: 18,
  lh20: 20,

  15: 15,
  16: 16,
  18: 18,
  20: 20,
};
export const lineHeight = lineHeights;

export const letterSpacing = {
  tight: 0.3,
  normal: 0.5,
  wide: 1,

  ls03: 0.3,
  ls05: 0.5,
  ls1: 1,

  0.3: 0.3,
  0.5: 0.5,
  1: 1,
};

export const elevation = {
  none: 0,
  low: 3,
  medium: 4,
  high: 5,
  highest: 8,

  0: 0,
  3: 3,
  4: 4,
  5: 5,
  8: 8,
};

export const shadow = {
  offsetSmall: { width: 0, height: 2 },
  offsetMedium: { width: 0, height: 4 },
  offsetLarge: { width: 0, height: 6 },
  radiusSmall: 4,
  radiusMedium: 6,
  radiusLarge: 8,
  radiusExtraLarge: 10,
  opacityNone: 0,
  opacitySmall: 0.15,
  opacityMedium: 0.2,
  opacityLarge: 0.25,
  opacityExtraLarge: 0.3,
};

export const componentSizes = {
  headerHeight: 60,
  defaultChartHeight: 180,
  defaultProgressHeight: 8,
  ringOuterSize: 110,
  ringInnerSize: 84,
  barTrackWidth: 14,
  textAreaHeight: 80,
  feedbackInputHeight: 60,
  halfCardHeight: 115,
  clockCircleSize: 160,
  dotSize: 8,
  actionBtnSize: 32,
  separatorHairline: 0.5,
  separatorSubtle: 0.8,
  separatorRegular: 1,
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
  hairline: 0.5,
  subtle: 0.8,
  thin: 1,
  outline: 1.5,
  medium: 2,
  thick: 3,
  extraThick: 4,
  heavy: 8,

  bw05: 0.5,
  bw08: 0.8,
  bw1: 1,
  bw15: 1.5,
  bw2: 2,
  bw3: 3,
  bw4: 4,
  bw8: 8,

  0: 0,
  0.5: 0.5,
  0.8: 0.8,
  1: 1,
  1.5: 1.5,
  2: 2,
  3: 3,
  4: 4,
  8: 8,
};
export const borderWidth = borderValue;

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