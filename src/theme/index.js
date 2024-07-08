// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: "#703BF7",
  appGray: "#191919",
};

const fonts = {
  heading: "Poppins, sans-serif",
  body: "Poppins, sans-serif",
};

const styles = {
  global: {
    body: {
      bg: "#141414",
      color: "white",
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "md",
      fontWeight: "bold",
    },
    sizes: {
      lg: {
        h: "56px",
        fontSize: "lg",
        px: "32px",
      },
    },
    variants: {
      solid: {
        bg: "black",
        color: "white",
        _hover: {
          bg: "brand",
        },
      },
      outline: {
        borderColor: "brand.500",
        color: "brand",
        _hover: {
          bg: "brand",
        },
      },
    },
  },
};

const config = {
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config, colors, fonts, styles, components });

export default customTheme;
