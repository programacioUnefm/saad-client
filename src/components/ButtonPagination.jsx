import React from "react";
import { Button } from "./ui/button";


export const ButtonPagination = ({filters = false, data, placeholder, action}) => {
  const itemsPerView = data.total - data.current_page * data.per_page;
  
  return (
    <div className="flex justify-center mt-4">
      {!filters.status && itemsPerView > 0 && (
        <Button variant="outline" onClick={action} >
          Quedan {itemsPerView} {placeholder}
        </Button>
      )}
    </div>
  );
};
