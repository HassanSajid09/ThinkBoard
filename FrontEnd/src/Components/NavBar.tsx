import { NavLink } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
  return (
    <>
      <header className="bg-base-300 border-b border-base-content/10 ">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-primary font-mono font-bold tracking-tight">
              ThinkBoard
            </h1>
            <div className="flex items-center gap-4">
              <NavLink to={"/create"} className="btn btn-primary">
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
