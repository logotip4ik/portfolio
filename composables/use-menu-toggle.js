const isMenuShowing = shallowRef(false);

export function useMenuToggle() {
  return isMenuShowing;
}
