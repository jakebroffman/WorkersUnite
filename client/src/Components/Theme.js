import { createTheme } from '@material-ui/core/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#FF4000',
    },
    secondary: {
      main: '#803EFF',
    },
    text: {
      primary: '#13011D',
      secondary: '#EEE8E7',
    },
    background: {
      default: '#FFFFFF',
      paper: '#EEE8E7',
    },
    grey: {
      50: '#BCBCBC',
      200: '#939393',
      400: '#727272',
      600: '#474747',
    },
  },
});

export default Theme;
