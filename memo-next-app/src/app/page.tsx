"use client";

import { Box, Button, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [memo, setMemo] = useState("");

  //textareaの入力でvalueが変わる
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

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
            value={value}
            onChange={handleChange}
          />
          <Button
            backgroundColor={"blue"}
            color={"white"}
            mt={5}
            mr={5}
            onClick={() => setMemo(value)}
          >
            更新
          </Button>
          <Button
            backgroundColor={"red"}
            color={"white"}
            mt={5}
            onClick={() => {
              setMemo("");
              setValue("");
            }}
          >
            クリア
          </Button>
          <Box mt={5}>
            <p>{memo}</p>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
