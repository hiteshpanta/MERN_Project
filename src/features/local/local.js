



export const setUserToLocal = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}


export const getUserFromLocal = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null
}

export const setCartsToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
}

export const getCartFromLocal = () => {
  const carts = localStorage.getItem('carts');
  return carts ? JSON.parse(carts) : [];
}

export const removeUserFromLocal = () => {
  localStorage.clear();
}