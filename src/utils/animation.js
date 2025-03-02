// Standard fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Slide in from bottom animation
export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Slide in from left animation
export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// Slide in from right animation
export const slideLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

// Scale up animation
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Container for staggered children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Create a custom animation with specified parameters
export const createAnimation = (type, options = {}) => {
  switch (type) {
    case "fade":
      return {
        hidden: { opacity: 0, ...options.hidden },
        visible: { opacity: 1, ...options.visible },
      };
    case "slide":
      return {
        hidden: {
          opacity: 0,
          y: options.y || 20,
          x: options.x || 0,
          ...options.hidden,
        },
        visible: { opacity: 1, y: 0, x: 0, ...options.visible },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: options.scale || 0.8, ...options.hidden },
        visible: { opacity: 1, scale: 1, ...options.visible },
      };
    default:
      return fadeIn;
  }
};
