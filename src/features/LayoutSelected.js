export const layoutHandle = (layout) => {
  return async (dispatch) => {
    try {
      console.log(layout)
    } catch (error) {
      console.log(error)
    }
  };
};
