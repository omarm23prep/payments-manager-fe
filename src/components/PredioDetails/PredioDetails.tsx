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
import { IPredio } from "../../slices/contribuyentes";

type IPredioDetails = IPredio & { contribuyente: string };

const PredioDetails: React.FC<IPredioDetails> = ({
  id,
  contribuyente,
  cuentaCatastral,
  baseGravable,
  fechaCelebracion,
  fechaAdeudo,
  direccion,
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
            <Td>{contribuyente || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Domicilio</Td>
            <Td>{direccion.direccionCompleta || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Cuenta</Td>
            <Td>{cuentaCatastral || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Base Gravable</Td>
            <Td>{baseGravable || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Fecha de Adeudo</Td>
            <Td>{fechaAdeudo || "N/A"}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Fecha de Celebración</Td>
            <Td>{fechaCelebracion || "N/A"}</Td>
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
            {/* {colindancias?.map(col => <Td>{col || "N/A"}</Td>)} */}
            <Td>{"N/A"}</Td>
            <Td>{"N/A"}</Td>
            <Td>{"N/A"}</Td>
            <Td>{"N/A"}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default PredioDetails;
