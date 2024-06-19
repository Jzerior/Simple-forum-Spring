import { routes } from "../../routes";
import { MenuNavLink } from "../../ui/MenuNavLink";
import { UserMenu } from "../UserMenu";

export const Menu = () => {
    return (
        <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-column justify-center items-center mx-auto max-w-screen-xl">
            <div className="w-full">
                <a href="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Forum</span>
                </a>
            </div>
            <div className="flex ">
                <MenuNavLink
                        to={routes.HOME.path}
                        className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >Home</MenuNavLink>
            </div>
            <div className="w-full flex flex-row justify-end items-center">
                <UserMenu/>
            </div>
        </div>
    </nav>
</header>
  );
};
