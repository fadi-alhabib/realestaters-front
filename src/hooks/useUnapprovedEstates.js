import useData from "./useData";

const useUnapprovedEstates = (filters, search) =>
  useData(
    "/estate/show_unapproved",
    {
      params: {
        ...filters,
        q: search,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    [filters, search]
  );

export default useUnapprovedEstates;
