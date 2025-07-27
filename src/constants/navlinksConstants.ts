import { NavLink } from "../types/navlink.types";
import { PAGE_TITLES } from "./pageTitles";
import { ROUTES } from "./routesConstants";

const { CREATE_PLACE_PAGE_TITLE, ALL_PLACES } = PAGE_TITLES;

const { PLACES, CREATE_PLACE } = ROUTES;

export const NAV_LINKS: NavLink[] = [
  { label: CREATE_PLACE_PAGE_TITLE, to: CREATE_PLACE },
  { label: ALL_PLACES, to: PLACES },
];
