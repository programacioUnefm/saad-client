import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export const PermissionTree = ({ subPermission }) => {
  return (
    <>
      {subPermission.children != undefined && (
        <>
          <Accordion type="single" collapsible className="mt-2">
            {subPermission.children.map((subPermOrdr2) =>
              subPermOrdr2.children != undefined ? (
                <AccordionItem
                  value={subPermOrdr2.code}
                  className="my-2"
                  key={subPermOrdr2.code}
                >
                  <AccordionTrigger>{subPermOrdr2.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-2 mt-4">
                      <ul>
                        <li className="flex h-12 items-center hover:bg-accent/50 p-4 rounded-md my-2 transition-all">
                          <div className="flex items-center space-x-2">
                            <Checkbox />
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Todo {subPermOrdr2.name}
                            </label>
                          </div>
                        </li>
                        {subPermOrdr2.children.map((subPermOrdr3) =>
                          subPermOrdr3.children != undefined ? (
                            <Accordion
                              type="single"
                              collapsible
                              key={subPermOrdr3.code}
                            >
                              <AccordionItem value="item-1">
                                <AccordionTrigger>
                                  {subPermOrdr3.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="ml-2 mt-4">
                                    <ul>
                                      <li className="flex h-12 items-center hover:bg-accent/50 p-4 rounded-md my-2 transition-all">
                                        <div className="flex items-center space-x-2">
                                          <Checkbox />
                                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Todo {subPermOrdr3.name}
                                          </label>
                                        </div>
                                      </li>
                                      {subPermOrdr3.children.map(
                                        (subPermOrdr4) => (
                                          <li
                                            className="flex h-12 items-center hover:bg-accent/50 p-4 rounded-md my-2 transition-all"
                                            key={subPermOrdr4.code}
                                          >
                                            <div className="flex items-center space-x-2">
                                              <Checkbox
                                                checked={subPermOrdr4.status}
                                                id={subPermOrdr4.code}
                                              />
                                              <label
                                                htmlFor={subPermOrdr4.code}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                              >
                                                {subPermOrdr4.name}
                                              </label>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ) : (
                            <li
                              className="flex h-12 items-center hover:bg-accent/50 p-4 rounded-md my-2 transition-all"
                              key={subPermOrdr3.code}
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={subPermOrdr3.status}
                                  id={subPermOrdr3.code}
                                />
                                <label
                                  htmlFor={subPermOrdr3.code}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {subPermOrdr3.name}
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div
                  className="flex h-12 items-center hover:bg-accent p-4 rounded-md my-2"
                  key={subPermOrdr2.code}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={subPermOrdr2.status}
                      id={subPermOrdr2.code}
                    />
                    <label
                      htmlFor={subPermOrdr2.code}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subPermOrdr2.name}
                    </label>
                  </div>
                </div>
              )
            )}
          </Accordion>
        </>
      )}
    </>
  );
};
