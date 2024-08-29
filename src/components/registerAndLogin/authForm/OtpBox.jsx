import { useState } from "react";
import { Box, Center, Heading, Link, Text, Button, FormControl, Flex, Stack, HStack } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
export default function OtpBox({
  email,
  setIsOtpSended,
  isForgot,
  setIsForgot,
  onOtpVerificationSuccess, // New prop
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/auth/verify-otp", {
        email,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        if (onOtpVerificationSuccess) {
          toast.success(response.data.msg || "Email verified")
          onOtpVerificationSuccess(); 
        }
      } else {
        console.error("Verification failed:", response.data.msg);
        toast.error(response.data.msg)
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/resend-otp", { email });
      console.log("OTP Resent successfully");
    } catch (error) {
      console.error("Error Resending OTP:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack w={"full"} maxW={"sm"} spacing={6}>
        <FormControl>
          <Center>
            <HStack>
              <PinInput value={otp} onChange={handleOtpChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
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
            isLoading={loading}
            onClick={handleVerifyOtp}
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
              Not yet received?
              <Link textDecoration={"underline"} onClick={handleResendOtp}>
                Resend
              </Link>
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
