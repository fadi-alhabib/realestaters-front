import useData from "./useData";

const useEstates = (filters, search, isSeller) =>
  useData(
    isSeller ? "seller/estates/" : "/estates",
    {
      params: {
        ...filters,
        q: search,
      },
      headers: isSeller
        ? {
            Authorization: localStorage.getItem("token"),
          }
        : {},
    },
    [filters, search]
  );

export default useEstates;
