

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { filtersChange, resetDialog } from "@/features/ui/UiSlice";
import { search } from "@/features/Search";

export const SearchWithReturn = ({ placeholder, action, reset }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500 ms de retraso
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
        action(searchTerm)
    } else {
      reset("");
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
