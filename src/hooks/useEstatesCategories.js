import useData from "./useData";

const useEstateCategories = () =>
  useData("/estate/categories", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export default useEstateCategories;
