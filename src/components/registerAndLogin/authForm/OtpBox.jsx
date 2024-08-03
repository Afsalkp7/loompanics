'use client'

import { Center, Heading } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { otpBoxStyle } from './AuthForm'

export default function OtpBox({isRegister,setIsRegister,isForgot,setIsForgot,isOtpSended,setIsOtpSended}) {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      >
      <Stack
        w={'full'}
        maxW={'sm'}
        spacing={6}>
        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField sx={otpBoxStyle}/>
                <PinInputField sx={otpBoxStyle}/>
                <PinInputField sx={otpBoxStyle}/>
                <PinInputField sx={otpBoxStyle}/>
                <PinInputField sx={otpBoxStyle}/>
                <PinInputField sx={otpBoxStyle}/>
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'black'}
            color={'white'}
            _hover={{
              bg: 'gray.900',
            }}>
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}