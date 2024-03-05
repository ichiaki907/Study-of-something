import { Box, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box py={4} px={0} bgColor="green">
      <Heading size="md" className="text-gray-50 text-center">
        create-liff-app
      </Heading>
    </Box>
  );
};
