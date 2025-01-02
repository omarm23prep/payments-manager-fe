import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  VStack,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { format, addMonths, differenceInMonths } from "date-fns";

interface DebtMonth {
  date: Date;
  isChecked: boolean;
}

interface DebtMonthsProps {
  fechaAdeudo?: string,
  baseGravable?: number,
}

const DebtMonths: React.FC<DebtMonthsProps> = ({
  fechaAdeudo,
  baseGravable = 40000,
}: DebtMonthsProps) => {
  const [debtMonths, setDebtMonths] = useState<DebtMonth[]>(() => {
    const months: DebtMonth[] = [];
    const today = new Date();
    const startDate = new Date(fechaAdeudo || "10/09/2020");
    const dueMonths = differenceInMonths(today, startDate);
    for (let i = 0; i < dueMonths; i++) {
      months.push({
        date: addMonths(today, -i), // Go back one month for each iteration
        isChecked: false,
      });
    }
    return months.reverse(); // Ensure months are sorted oldest to newest
  });

  const [total, setTotal] = useState(0);

  const handleCheckboxChange = (index: number) => {
    const updatedMonths = [...debtMonths];
    updatedMonths[index].isChecked = !updatedMonths[index].isChecked;
    setDebtMonths(updatedMonths);
  };

  useEffect(() => {
    const monthsSelected = debtMonths.reduce((accumulator, month) => {
      return month.isChecked ? accumulator + 1 : accumulator;
    }, 0);
    const valMonthly = 0.005 * baseGravable / 12;
    const val = monthsSelected * valMonthly;
    setTotal(parseFloat(val.toFixed(2)));
  }, [debtMonths])

  return (
    <Box p={5} maxW="400px" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading size="md" mb={4}>
        Debt Months
      </Heading>
      <VStack spacing={3} align="stretch">
        {debtMonths.map((month, index) => (
          <Checkbox
            key={index}
            isChecked={month.isChecked}
            onChange={() => handleCheckboxChange(index)}
          >
            <Text>
              {format(month.date, "MMMM yyyy")} (
              {format(month.date, "dd-MM-yyyy")})
            </Text>
          </Checkbox>
        ))}
      </VStack>
      <HStack justifyContent="end">
        <Text as='em' fontSize="2xl">Total: $ {total}</Text>
      </HStack>
    </Box>
  );
};

export default DebtMonths;
