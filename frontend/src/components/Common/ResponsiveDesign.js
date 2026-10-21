import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

// Pick a single scale so width & height change equally
const scale = Math.min(
  width / guidelineBaseWidth,
  height / guidelineBaseHeight,
);

const horizontalScale = size => scale * size;
const verticalScale = size => scale * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale * size - size) * factor;

export {horizontalScale, verticalScale, moderateScale};