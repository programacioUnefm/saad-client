import { Link, NavLink } from "react-router-dom";

export const Submenu = ({ title = "", path = "" }) => {
  const link = "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground/60 transition-all hover:text-primary";
    const activeMenu = "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all";

  const activeClass = (isActive) => {
    if (isActive) {
      return activeMenu;
    } else {
      return link;
    }
  };
  return (
    <>
      <div>
        <NavLink to={path} className={({ isActive }) => activeClass(isActive)}>{title}</NavLink>
      </div>
    </>
  );
};
