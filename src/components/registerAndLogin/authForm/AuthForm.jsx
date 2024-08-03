import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
  useColorModeValue,
  border,
  Checkbox,
  Divider,
  Image,
} from "@chakra-ui/react";
import googleIcon from "../../../assets/Logo-google-icon.png";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { flexStyle, inputFocus } from "./AuthForm";

export default function AuthForm({isForgot, setIsForgot, isRegister, setIsRegister, isOtpSended, setIsOtpSended, needToChange, setNeedToChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Flex sx={flexStyle}>
      <Stack maxW={"lg"} width={"100%"}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
          <Stack spacing={{ base: 0, md: 1 }}>
            {isRegister ? (
              <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" width={"100%"} sx={inputFocus} />
              </FormControl>
            ) : (
              ""
            )}

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" width={"100%"} sx={inputFocus} />
            </FormControl>
            {isRegister ? (
              <FormControl id="phone" isRequired>
                <FormLabel>Phone number</FormLabel>
                <Input type="Number" width={"100%"} sx={inputFocus} />
              </FormControl>
            ) : (
              ""
            )}

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  width={"100%"}
                  sx={inputFocus}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {isRegister ? (
              <FormControl id="password" isRequired>
                <FormLabel>Confirm password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    width={"100%"}
                    sx={inputFocus}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            ) : (
              ""
            )}

            <Stack spacing={10} pt={2}>
              {!isRegister ? <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"black"}>
                  <Link onClick={()=>setIsForgot(!isForgot)} textDecoration={"underline"}>Forgot password?</Link>
                </Text>
              </Stack>:''}
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"black"}
                color={"white"}
                _hover={{
                  bg: "gray.900",
                }}
              >
                {isRegister ? "Sign up" : "Login"}
              </Button>
            </Stack>
            {!isRegister?
             <Stack spacing={1} align="center">
             <Flex align="center">
               <Divider borderColor="gray.300" />
               <Text mx={4} mt={2} fontWeight="bold">
                 Or
               </Text>
               <Divider borderColor="gray.300" />
             </Flex>
             <Button
               leftIcon={
                 <Image src={googleIcon} alt="Google Logo" boxSize="20px" />
               }
               colorScheme="google"
               color="black"
               width="100%"
               maxW="300px"
               justifyContent="center"
             >
               Sign in with Google
             </Button>
           </Stack>:''}
           
            <Stack pt={6}>
              <Text align={"center"}>
                {isRegister ? "Have an account ? " : "New member ? "}
                <Link
                  color={"Black"}
                  textDecoration={"underline"}
                  fontWeight={"bold"}
                  onClick={() => setIsRegister(!isRegister) }
                >
                  {isRegister ? "Login Here" : "Create Account"}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
