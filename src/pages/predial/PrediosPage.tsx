import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import { getDetailsByCuenta, getPredios, IPredio, IPredioDetails, selectPredioState } from "../../slices/predio";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import PredioDetails from "../../components/PredioDetails/PredioDetails";

const PredialPage = () => {
  const dispatch = useAppDispatch();
  const { predios, loading, error } = useAppSelector(selectPredioState);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedPredio, setSelectedPredio] = useState<IPredioDetails | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getPredios());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleViewDetails = async (predio: IPredio) => {
    const response = await getDetailsByCuenta(predio.cuenta || 0);
    const predialDetails: IPredioDetails = response.data;
    setSelectedPredio(predialDetails);
    onOpen();
  };

  // Filtrar predios
  const filteredPredios = predios.filter((predio) => {
    if (searchValue === "") return true;
    const searchLower = searchValue.toLowerCase();
    return (
      predio.cuenta?.toString().startsWith(searchValue) ||
      predio.lote?.toLowerCase().includes(searchLower) ||
      predio.ubicacion?.toLowerCase().includes(searchLower)
    );
  });

  // Calcular los índices de la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPredios.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const totalPages = Math.ceil(filteredPredios.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid maxW="78vw" overflow="hidden">
      <GridItem colSpan={5}>
        <Heading size="md">Predios</Heading>
      </GridItem>
      <GridItem colSpan={1}></GridItem>
      <GridItem colSpan={3} w="91%">
        <Flex alignItems="center" mb="50px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Buscar por cuenta, lote o ubicación"
              onChange={handleInputChange}
            />
          </InputGroup>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Detalles</Th>
                <Th>Cuenta</Th>
                <Th>Lote</Th>
                <Th>Ubicación</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((predio) => (
                <Tr key={`${predio.cuenta}`}>
                  <Td>
                    <Link as="button" onClick={() => handleViewDetails(predio)}>
                      <Icon as={FaRegEye} />
                    </Link>
                  </Td>
                  <Td>{predio.cuenta}</Td>
                  <Td>{predio.lote}</Td>
                  <Td>{predio.ubicacion}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="space-between" alignItems="center" mt="4">
          <HStack>
            <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>
              Anterior
            </Button>
            <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
              Siguiente
            </Button>
          </HStack>
          <Flex>
            Página {currentPage} de {totalPages}
          </Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={1}></GridItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del Predio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PredioDetails {...selectedPredio} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default PredialPage;
