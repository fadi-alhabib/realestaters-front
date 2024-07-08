import { Box } from "@chakra-ui/react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link to={to}>
      <Box
        sx={isActive ? { bgColor: "brand" } : { bgColor: "black" }}
        p={5}
        borderRadius={"lg"}
        fontWeight={"bold"}
        fontSize={"lg"}
      >
        {children}
      </Box>
    </Link>
  );
};

export default CustomLink;
