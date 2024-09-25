import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import apiService from "../../services/api-service";

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const token = localStorage.getItem("token");
  const [newManager, setNewManager] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [currentManager, setCurrentManager] = useState(null); // Store current manager to edit

  // Fetch managers on component load
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await apiService.get("/managers", {
        headers: { Authorization: token },
      });
      setManagers(response.data.managers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching managers:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/managers/${id}`, {
        headers: { Authorization: token },
      });
      fetchManagers(); // Refresh list
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  const handleAddManager = async () => {
    try {
      await apiService.post("/add-manager", newManager, {
        headers: { Authorization: token },
      });
      fetchManagers();
      onAddClose();
    } catch (error) {
      console.error("Error adding manager:", error);
    }
  };

  const handleEditManager = async () => {
    try {
      await apiService.put(`/managers/${currentManager.id}`, currentManager, {
        headers: { Authorization: token },
      });
      fetchManagers();
      onEditClose();
    } catch (error) {
      console.error("Error updating manager:", error);
    }
  };

  const handleUpdateManager = (manager) => {
    setCurrentManager(manager);
    onEditOpen(); // Open modal to edit
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={onAddOpen} mb={4}>
        Add Manager
      </Button>

      {/* Add Manager Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"brand"}>Add Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={"appGray"}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                value={newManager.fullname}
                onChange={(e) =>
                  setNewManager({ ...newManager, fullname: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={newManager.email}
                onChange={(e) =>
                  setNewManager({ ...newManager, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={newManager.password}
                onChange={(e) =>
                  setNewManager({ ...newManager, password: e.target.value })
                }
              />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleAddManager}>
              Add Manager
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Manager Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"brand"}>Edit Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={"appGray"}>
            {currentManager && (
              <>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Full Name"
                    value={currentManager.fullname}
                    onChange={(e) =>
                      setCurrentManager({
                        ...currentManager,
                        fullname: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    value={currentManager.email}
                    onChange={(e) =>
                      setCurrentManager({
                        ...currentManager,
                        email: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <Button mt={4} colorScheme="blue" onClick={handleEditManager}>
                  Update Manager
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Table for listing managers */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={3}>Loading...</Td>
            </Tr>
          ) : (
            managers.map((manager) => (
              <Tr key={manager.id}>
                <Td>{manager.fullname}</Td>
                <Td>{manager.email}</Td>
                <Td>
                  <IconButton
                    icon={<FaEdit />}
                    colorScheme="yellow"
                    onClick={() => handleUpdateManager(manager)}
                    aria-label="Edit Manager"
                    mr={2}
                  />
                  <IconButton
                    icon={<FaTrashAlt />}
                    colorScheme="red"
                    onClick={() => handleDelete(manager.id)}
                    aria-label="Delete Manager"
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default ManagerList;
