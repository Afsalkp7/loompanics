import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react'
import { flexStyle, inputFocus } from './AuthForm';

function ChangePassword({isForgot, setIsForgot, isRegister, setIsRegister, isOtpSended, setIsOtpSended, needToChange, setNeedToChange}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
     <Flex sx={flexStyle}>
      <Stack maxW={"lg"} width={"100%"}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
          <Stack spacing={{ base: 0, md: 1 }}>

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
        </Box>
      </Stack>
    </Flex>
    </>
  )
}

export default ChangePassword