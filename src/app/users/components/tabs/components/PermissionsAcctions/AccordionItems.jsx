import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const AccordionItems = ({ item, setValue, setopen }) => {
    const handleSelect = (e) => {
        setopen(false)
        setValue("parent_id", e)
    }
  return (
    <ToggleGroup
      className="flex flex-col items-start"
      type="single"
      onValueChange={(e) => handleSelect(e)}
    >
      <div className="w-full">
        <ToggleGroupItem className="w-full text-white dark:bg-slate-400 bg-sky-600 justify-start" value={item}>
          {item.name}
        </ToggleGroupItem>
        <div className="ml-4 my-2 w-full">
          {item.children.map((order0) => (
            <div className="" key={Math.random()}>
              <ToggleGroupItem
                className="w-[94%] text-white dark:bg-slate-600 bg-sky-700 justify-start"
                value={order0}
              >
                {order0.name}
              </ToggleGroupItem>
              <div className="ml-4 my-2">
                {order0.children != undefined &&
                  order0.children.map((oreder1) => (
                    <div key={Math.random()}>
                      <ToggleGroupItem
                        className="w-[94%] justify-start text-white dark:bg-slate-800 bg-sky-00"
                        value={oreder1}
                      >
                        {oreder1.name}
                      </ToggleGroupItem>
                      <div className="ml-4 my-2 flex flex-col items-start">
                        {oreder1.children != undefined &&
                          oreder1.children.map((order2) => (
                            <ToggleGroupItem
                              className="w-[94%] text-white dark:bg-slate-900 bg-sky-900 justify-start my-1"
                              value={order2}
                              key={Math.random()}
                            >
                              {order2.name}
                            </ToggleGroupItem>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToggleGroup>
  );
};
