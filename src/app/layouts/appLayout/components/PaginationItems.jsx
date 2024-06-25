import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { paginationAdminUserPrivileges } from "@/features/Pagination";
import { useDispatch, useSelector } from "react-redux";
export const PaginationItems = ({ numResult = 0, array }) => {
  const dispatch = useDispatch();
  const {tabState} = useSelector(state => state.usersList)
  let arrayLinks = [];
  if (array.length == undefined) {
    arrayLinks = [...array.links];
    arrayLinks[0] = { ...arrayLinks[0], label: "Anterior" };
    const last = array.links.length - 1;
    arrayLinks[last] = { ...arrayLinks[last], label: "Siguiente" };
    // const itemActivo = arrayLinks.find(item => item.active === true);
    // arrayLinks = obtenerListaPaginada(arrayLinks, itemActivo);
  }
  const paginationHandle = (page) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const apiGet = page.url;
    const url = apiGet.replace(baseUrl, "");
    !page.active && dispatch(paginationAdminUserPrivileges(url, tabState));
  };

  // function obtenerListaPaginada(listaCompleta, elementoActivo) {
  //   const indiceActivo = listaCompleta.indexOf(elementoActivo);
  
  //   if (indiceActivo === -1) {
  //     return [];
  //   }
  
  //   const indiceAnterior = Math.max(indiceActivo - 1, 0);
  //   const indiceSiguiente1 = Math.min(indiceActivo + 1, listaCompleta.length - 1);
  //   const indiceSiguiente2 = Math.min(indiceActivo + 2, listaCompleta.length - 1);
  
  //   const primerElemento = listaCompleta[0];
  //   const ultimoElemento = listaCompleta[listaCompleta.length - 1];
  //   return [
  //     primerElemento.url != null && primerElemento,
  //     listaCompleta[indiceAnterior],
  //     listaCompleta[indiceActivo],
  //     listaCompleta[indiceSiguiente1],
  //     listaCompleta[indiceSiguiente2],
  //     ultimoElemento.url != null && ultimoElemento
  //   ];
  // }

  return (
    <>
      {array.length == undefined && array.last_page > 1 ? (
        <div className="p-2 flex flex-col items-center md:flex-row md:justify-between justify-center px-4 md:pt-4 md:-mb-4">
          <span className="flex whitespace-nowrap text-foreground/80">{numResult}</span>
          <Pagination className="md:mr-8">
            <PaginationContent>
              {arrayLinks.map((page) => (
                <PaginationItem key={page.label}>
                  {page.url != null && (
                    <PaginationLink
                      onClick={() => {
                        paginationHandle(page);
                      }}
                      className="cursor-pointer"
                      isActive={page.active}
                    >
                      {page.label}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
