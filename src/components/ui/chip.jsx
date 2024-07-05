import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Chip = ({ text = "" }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-center md:max-w-24 xl:max-w-[200px] truncate">
            <span className="text-foreground/70 text-[10px] border-2 hover:bg-accent p-1 uppercase rounded-md">
              {text}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
