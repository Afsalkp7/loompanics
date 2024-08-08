"use client";

import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { otpBoxStyle } from "./AuthForm";

export default function OtpBox({
  isRegister,
  setIsRegister,
  isForgot,
  setIsForgot,
  isOtpSended,
  setIsOtpSended,
}) {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack w={"full"} maxW={"sm"} spacing={6}>
        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField sx={otpBoxStyle} />
                <PinInputField sx={otpBoxStyle} />
                <PinInputField sx={otpBoxStyle} />
                <PinInputField sx={otpBoxStyle} />
                <PinInputField sx={otpBoxStyle} />
                <PinInputField sx={otpBoxStyle} />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"black"}
            color={"white"}
            _hover={{
              bg: "gray.900",
            }}
          >
            Verify
          </Button>
        </Stack>
        <Stack spacing={10} pt={2}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Text color={"black"}>
              Not yet received ?<Link textDecoration={"underline"}>Resend</Link>
            </Text>
            <Text color={"black"}>
              <Link onClick={() => setIsForgot(!isForgot)}>Back</Link>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}
