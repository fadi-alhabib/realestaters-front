import useData from "./useData";

const useServicesCategories = () =>
  useData("/extra/categories", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export default useServicesCategories;
