import { Box, Button, Heading, Textarea } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Box backgroundColor={"white"}>
        <Box
          backgroundColor={"gray.100"}
          width={"100%"}
          maxWidth={"640px"}
          height={"100vh"}
          mx={"auto"}
          my={5}
          p={4}
        >
          <Heading as={"h2"}>メモ帳</Heading>
          <Textarea
            backgroundColor={"white"}
            rows={10}
            mt={5}
            placeholder="入力してください"
          />
          <Button backgroundColor={"coral"} mt={5}>
            ボタン
          </Button>
        </Box>
      </Box>
    </main>
  );
}
