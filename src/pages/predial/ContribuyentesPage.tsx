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
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import PredioDetails from "../../components/PredioDetails/PredioDetails";
import { getContribuyentes, IContribuyente, selectContribuyentesState } from "../../slices/contribuyentes";
import DebtMonths from "../../components/debtmonths/DebtMonths";

const PredialPage = () => {
  const dispatch = useAppDispatch();
  const { contribuyentes, loading, error } = useAppSelector(selectContribuyentesState);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedContribuyente, setSelectedContribuyente] = useState<IContribuyente | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const paymentDisclousure = useDisclosure();

  useEffect(() => {
    dispatch(getContribuyentes());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleViewDetails = async (contribuyente: IContribuyente) => {
    setSelectedContribuyente(contribuyente);
    onOpen();
  };

  // Filtrar predios
  const filteredContribuyentes = contribuyentes.filter((contribuyente: IContribuyente) => {
    if (searchValue === "") return true;
    const searchLower = searchValue.toLowerCase();
    return (
      contribuyente.contribuyente.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      contribuyente.predio.cuentaCatastral?.toLowerCase().includes(searchLower) ||
      contribuyente.predio.direccion.direccionCompleta.toLowerCase().includes(searchLower)
    );
  });

  // Calcular los índices de la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContribuyentes.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const totalPages = Math.ceil(filteredContribuyentes.length / itemsPerPage);

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

  const handlePayButton = () => {
    onClose();
    paymentDisclousure.onOpen();
  }

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
                {/* <Th>Datos Generales</Th> */}
                <Th>Contribuyente</Th>
                <Th>Estatus</Th>
                {/* <Th>Dirección</Th> */}
                <Th>Detalles</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((contribuyente: IContribuyente) => (
                <Tr key={`${contribuyente.id}`}>
                  {/* <Td>{contribuyente.predio.fechaAdeudo}</Td> */}
                  <Td>{contribuyente.contribuyente}</Td>
                  <Td>{contribuyente.estatus}</Td>
                  <Td
                    maxW="200px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {contribuyente.predio.direccion.direccionCompleta}
                  </Td>
                  <Td>
                    <Link as="button" onClick={() => handleViewDetails(contribuyente)}>
                      <Icon as={FaRegEye} />
                    </Link>
                  </Td>
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
            <PredioDetails
              id={parseInt(selectedContribuyente?.id || '', 10)}
              contribuyente={selectedContribuyente?.contribuyente || ""}
              cuentaCatastral={selectedContribuyente?.predio.cuentaCatastral || ""}
              baseGravable={selectedContribuyente?.predio.baseGravable || 0}
              fechaCelebracion={selectedContribuyente?.predio.fechaCelebracion || ""}
              fechaAdeudo={selectedContribuyente?.predio.fechaAdeudo || ""}
              direccion={selectedContribuyente?.predio.direccion || {id: 0, direccionCompleta: ""}}
            />
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button colorScheme="blue" onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="green" onClick={handlePayButton}>
              Pagar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={paymentDisclousure.isOpen} onClose={paymentDisclousure.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del Predio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DebtMonths
              fechaAdeudo={selectedContribuyente?.predio.fechaAdeudo}
              baseGravable={selectedContribuyente?.predio.baseGravable}
            />
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button colorScheme="blue" onClick={paymentDisclousure.onClose}>
              Cerrar
            </Button>
            <Button colorScheme="green" onClick={handlePayButton}>
              Cobrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default PredialPage;
