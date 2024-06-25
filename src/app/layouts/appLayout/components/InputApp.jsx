import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const InputApp = () => {
  return (
    <form className="hidden md:block lg:w-[20rem]">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          style={{ height: "40px", width: "100%" }}
          type="search"
          placeholder="Buscar algo..."
          className="appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        />
      </div>
    </form>
  );
};
