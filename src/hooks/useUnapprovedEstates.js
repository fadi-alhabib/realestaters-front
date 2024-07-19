import useData from "./useData";

const useUnapprovedEstates = () =>
  useData(
    "/estate/show_unapproved",
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    []
  );

export default useUnapprovedEstates;
