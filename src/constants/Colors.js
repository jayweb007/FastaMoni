import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 24,
  customHeight1: 32,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 10,

  // app dimensions
  width,
  height,
};

export const COLORS = {
  primary: '#7B45CC',
  primary2: '#320084',
  primary3: '#2C1C40',
  primary4: 'rgba(93, 0, 244, 0.26)',
  primary5: '#373040',
  lightGreen: 'rgba(114, 225, 172, 1)',
  // green3: "rgba(94, 222, 153, 0.4)",
  lemon: '#03EED8',
  lemon2: '#5EDE99',
  black: '#000',
  black2: 'rgba(20, 20, 20, 0.5)',
  darkBlues: '#171925', //text box background
  darkBlues2: 'rgba(255, 255, 255, 0.04)', //box tape
  darkPurple: '#100B16', //text box background 2
  purple: 'rgba(93, 0, 244, 0.26)', //text box background 2
  baseColor: '#83A4D7',
  baseColor1: '#1E324E',
  textPlaceholder: '#B0BCDA',
  textPlaceholder2: '#50555C',

  dark: '#252525',
  dark2: '#171925',

  white: '#FFFFFF',
  offwhite: '#F6F6F6',
  lightorange: '#FFF8F1',
  darkBlue: '#081630',
  darkBlue1: '#344054',
  darkBlue2: '#222d45',
  darkBlue3: 'rgba(23, 162, 184, 0.27)',
  darkBlue4: 'rgba(23, 162, 184, 1)',
  red: '#DF1111',
  red2: '#E3507A',
  red4: '#FFE9E9',
  red3: 'rgba(235, 87, 87, 0.10)',
  green: '#219653',
  green2: '#ECFCE5',
  green3: '#2BB596',
  gray: '#667085',
  gray1: '#ABABAB',
  gray2: '#292D32',
  gray3: '#F2F4FC',
  gray4: '#D3D3D3',
  gray5: '#4C4C66',
  gray6: '#E8E8E8',
  gray7: '#6C757D',
  gray8: '#FEFEFD',
  col: 'rgba(228, 240, 101, 0.2)',
  secondary: '#FE9E46',
  secondary2: '#FAFCE0',
  yellow: '#F3BA2F',
  skyblue: '#E9F1FA',
  pink: '#813CE0',
  bg: 'linear-gradient(135deg, rgba(253, 110, 106, 0.20) 0%, rgba(255, 198, 0, 0.20) 100%)',
};
