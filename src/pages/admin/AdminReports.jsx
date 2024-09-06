import {
  Box,
  Heading,
  Select,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apiService from "../../services/api-service";

const ReportsScreen = () => {
  const [reportType, setReportType] = useState("estates");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, [reportType]);

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiService.get(`/reports/${reportType}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setReports(response.data);
    } catch (err) {
      setError("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Heading as="h2" color="red.500">
          {error}
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading as="h1" mb={5}>
        Reports
      </Heading>
      <Select mb={5} value={reportType} onChange={handleReportTypeChange}>
        <option value="estates">Estates</option>
        <option value="users">Users</option>
        <option value="works">Works</option>
        <option value="custom">Custom Date Range</option>
      </Select>
      <Table variant="simple">
        <TableCaption>
          Report Data for{" "}
          {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            {reportType === "users" && <Th>Name</Th>}
            {reportType === "users" && <Th>Email</Th>}
            {reportType === "estates" && <Th>Title</Th>}
            {reportType === "works" && <Th>Title</Th>}
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports.map((report) => (
            <Tr key={report.id}>
              <Td>{report.id}</Td>
              {reportType === "users" && <Td>{report.name}</Td>}
              {reportType === "users" && <Td>{report.email}</Td>}
              {reportType === "estates" && <Td>{report.title}</Td>}
              {reportType === "works" && <Td>{report.title}</Td>}
              <Td>{new Date(report.created_at).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReportsScreen;
