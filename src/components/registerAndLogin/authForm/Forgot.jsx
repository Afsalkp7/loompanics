import React from "react";
import { flexStyle, inputFocus } from "./AuthForm";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

function Forgot({
  isRegister,
  setIsRegister,
  isForgot,
  setIsForgot,
  isOtpSended,
  setIsOtpSended,
}) {
  return (
    <>
      <Flex sx={flexStyle}>
        <Stack maxW={"lg"} width={"100%"}>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
            <Stack spacing={{ base: 0, md: 1 }}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" width={"100%"} sx={inputFocus} />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link
                    color={"black"}
                    textDecoration={"underline"}
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setIsForgot(!isForgot);
                    }}
                  >
                    Back to Login
                  </Link>
                  <Text></Text>
                </Stack>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"black"}
                  color={"white"}
                  _hover={{
                    bg: "gray.900",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Forgot;
