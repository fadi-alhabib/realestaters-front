import useData from "./useData";

const useServices = () =>
  useData(
    "/extras",
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    []
  );

export default useServices;
