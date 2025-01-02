import React from "react";
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { IPredioDetails } from "../../slices/predio";

const PredioDetails: React.FC<IPredioDetails> = ({
  propietario,
  domicilio,
  cuenta,
  manzana,
  municipio,
  colindancias,
}: IPredioDetails) => {
  return (
    <Box p={5} maxW="600px" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading size="md" mb={4}>
        Detalles del Predio
      </Heading>
      <Table variant="striped" colorScheme="gray">
        <Tbody>
          <Tr>
            <Td fontWeight="bold">Propietario</Td>
            <Td>{propietario || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Domicilio</Td>
            <Td>{domicilio || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Cuenta</Td>
            <Td>{cuenta || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Manzana</Td>
            <Td>{manzana || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Municipio</Td>
            <Td>{municipio || "N/A"}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Divider my={4} />

      <Heading size="sm" mb={2}>
        Colindancias
      </Heading>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Norte</Th>
            <Th>Sur</Th>
            <Th>Oeste</Th>
            <Th>Este</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {colindancias?.map(col => <Td>{col || "N/A"}</Td>)}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default PredioDetails;
