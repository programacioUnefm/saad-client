import { InputSearch } from "./InputSearch";
import { LayoutData } from "../LayoutData";
export const SearchAndFilters = ({ route = "", placeholder = "" }) => {

  return (
    <div className="flex md:grid md:grid-cols-2 mb-4">
      <div className="w-full">
        <InputSearch route={route} placeholder={placeholder} />
      </div>
      <div className="flex justify-end">
        <LayoutData />
      </div>
    </div>
  );
};
