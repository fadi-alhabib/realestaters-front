import { CircularProgress, SimpleGrid, VStack } from "@chakra-ui/react";
import PropertyCard from "../../components/PropertyCard";
import useUnapprovedEstates from "../../hooks/useUnapprovedEstates";
import AdminPropertyCard from "../../components/AdminPropertyCard";

const AdminProperties = () => {
  const { data, error, isLoading } = useUnapprovedEstates();

  return (
    <VStack mx={"10"} mb={5}>
      {isLoading && <CircularProgress />}

      {data && (
        <SimpleGrid
          alignSelf={"center"}
          width={"100%"}
          columns={[1, 2, 4]}
          spacing="40px"
        >
          {data.estates.map((estate) => (
            <AdminPropertyCard key={estate.id} estate={estate} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default AdminProperties;
