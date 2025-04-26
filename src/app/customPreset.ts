import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#0540BEFF',
      700: '#1d4ed8',
      800: '#4f46e5',
      900: '#4338ca',
      950: '#312e81',
    },
    colorScheme: {
      light: {
        primary: {
          color: 'linear-gradient(to right, #1447cf, #503ff1)',
          inverseColor: '#ffffff',
          hoverColor: 'linear-gradient(to right, #2563eb, #4f46e5)',
          activeColor: 'linear-gradient(to right, #1d4ed8, #4338ca)',
        },
        highlight: {
          background: '#312e81',
          focusBackground: '#4f46e5',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
      dark: {
        primary: {
          color: '#000000FF',
          inverseColor: '#312e81',
          hoverColor: '#93c5fd',
          activeColor: '#60a5fa',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
    },
    focusRing: {
      width: '2px',
      style: 'dashed',
      color: '{primary.color}',
      offset: '1px',
    },
  },
});
export default CustomPreset;
