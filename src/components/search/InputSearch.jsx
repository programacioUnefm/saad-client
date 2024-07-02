
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { filtersChange, resetDialog } from "@/features/ui/UiSlice";
import { search } from "@/features/Search";

export const InputSearch = ({ route = "", placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500 ms de retraso
  const { filters} = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      dispatch(filtersChange({ ...filters, search: debouncedSearchTerm }));
      dispatch(search(route));
    } else {
      dispatch(
        filtersChange({ ...filters, result: [], status: false, search: debouncedSearchTerm })
      );
      dispatch(resetDialog());
    }
  }, [debouncedSearchTerm]);

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder={`Buscar ${placeholder}...`}
    />
  );
};
