
import { useSelector } from 'react-redux';
import { colors } from '../Helper/colors';

export const useTheme = () => {
  const mode = useSelector((state) => state.theme.mode);

  return {
    mode,
    colors: colors[mode],
    isDark: mode === 'dark',
  };
};
