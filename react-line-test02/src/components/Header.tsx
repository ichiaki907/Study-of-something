import { Box, Center, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box py={4} px={[0, 10]} bgColor="green" boxShadow="xl">
      <Heading
        size="md"
        className="text-gray-50"
        textAlign={["center", "left"]}
      >
        create-liff-app
      </Heading>
    </Box>
  );
};
