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
  Tr
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import { getPredios, IPredio, selectPredioState } from "../../slices/predio";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";

const PredialPage = () => {
  const dispatch = useAppDispatch();
  const predios: IPredio[] = useAppSelector(selectPredioState);

  useEffect(() => {
    dispatch(getPredios());
  }, []);

  return (
    <Grid w="1138px">
      <GridItem colSpan={5}>
        <Heading size="md">Usuarios</Heading>
      </GridItem>
      <GridItem colSpan={1}></GridItem>
      <GridItem colSpan={3}>
        <Flex alignItems="center" mb="50px">
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input type='tel' placeholder='Buscar usuario' />
            </InputGroup>
        </Flex>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Editar</Th>
                <Th>Cuenta</Th>
                <Th>Lote</Th>
                <Th>Ubicación</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                predios.map((predio) => {
                  return (
                    <Tr key={predio._id}>
                      <Td>
                        <Link
                          as='button'
                          onClick={() => {}}
                        >
                          <Icon as={FaRegEye} />
                        </Link>
                      </Td>
                      <Td>{predio.cuenta}</Td>
                      <Td>{predio.lote}</Td>
                      <Td>{predio.ubicacion}</Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
      <GridItem colSpan={1}></GridItem>
    </Grid>
  )
}

export default PredialPage;
