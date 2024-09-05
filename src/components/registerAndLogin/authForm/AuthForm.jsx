import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import googleIcon from "../../../assets/Logo-google-icon.png";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { flexStyle, inputFocus } from "./AuthForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define the validation schema with Yup
const validationSchema = (isRegister) =>
  Yup.object({
    firstName: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .when([], {
        is: () => isRegister,
        then: (schema) => schema.required("Name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .when([], {
        is: () => isRegister,
        then: (schema) => schema.required("Phone number is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .when([], {
        is: () => isRegister,
        then: (schema) => schema.required("Confirm password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

export default function AuthForm({
  isForgot,
  setIsForgot,
  isRegister,
  setIsRegister,
  isOtpSended,
  setIsOtpSended,
  setEmail,
}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    console.log("Form values:", values); // Check form values
    try {
      let response;

      if (isRegister) {
        response = await dispatch(registerUser(values));
        console.log("Registration response:", response); // Check response
        if (response.payload.openOtp) {
          setEmail(response.payload.email);
          setIsOtpSended(true);
        }
      } else {
        response = await dispatch(loginUser(values));
        console.log("Login response:", response); // Check response
        navigate("/");
      }
    } catch (error) {
      console.error("Error during form submission:", error); // Check errors
      toast.error(error.message || (isRegister ? "Registration failed" : "Login failed"));
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Flex sx={flexStyle}>
      <Stack maxW={"lg"} width={"100%"}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
          <Formik
            initialValues={{
              firstName: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={() => validationSchema(isRegister)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={{ base: 3, md: 2.5 }}>
                  {isRegister && (
                    <FormControl id="firstName">
                      <Field name="firstName">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter User Name"
                            width={"100%"}
                            sx={inputFocus}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="firstName"
                        component={FormHelperText}
                        style={{ color: "red", textAlign: "start" }} // Custom styles for error messages
                      />
                    </FormControl>
                  )}

                  <FormControl id="email">
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter Email"
                          width={"100%"}
                          sx={inputFocus}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component={FormHelperText}
                      style={{ color: "red", textAlign: "start" }} // Custom styles for error messages
                    />
                  </FormControl>

                  {isRegister && (
                    <FormControl id="phoneNumber">
                      <Field name="phoneNumber">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter Phone Number"
                            width={"100%"}
                            sx={inputFocus}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="phoneNumber"
                        component={FormHelperText}
                        style={{ color: "red", textAlign: "start" }} // Custom styles for error messages
                      />
                    </FormControl>
                  )}

                  <FormControl id="password">
                    <InputGroup>
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            width={"100%"}
                            sx={inputFocus}
                            placeholder="Enter Password"
                          />
                        )}
                      </Field>
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() => setShowPassword((showPassword) => !showPassword)}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <ErrorMessage
                      name="password"
                      component={FormHelperText}
                      style={{ color: "red", textAlign: "start" }} // Custom styles for error messages
                    />
                  </FormControl>

                  {isRegister && (
                    <FormControl id="confirmPassword">
                      <InputGroup>
                        <Field name="confirmPassword">
                          {({ field }) => (
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              width={"100%"}
                              sx={inputFocus}
                              placeholder="Re-enter password"
                            />
                          )}
                        </Field>
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
                      <ErrorMessage
                        name="confirmPassword"
                        component={FormHelperText}
                        style={{ color: "red", textAlign: "start" }} // Custom styles for error messages
                      />
                    </FormControl>
                  )}

                  <Stack spacing={10} pt={2}>
                    {!isRegister && (
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Text color={"black"}>
                          <Link
                            onClick={() => setIsForgot(!isForgot)}
                            textDecoration={"underline"}
                          >
                            Verify email?
                          </Link>
                        </Text>
                        <Text color={"black"}>
                          <Link
                            onClick={() => setIsForgot(!isForgot)}
                            textDecoration={"underline"}
                          >
                            Forgot password?
                          </Link>
                        </Text>
                      </Stack>
                    )}
                    <Button
                      type="submit"
                      isLoading={isSubmitting || loading}
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

                  <Stack pt={6}>
                    <Text align={"center"}>
                      {isRegister ? "Have an account? " : "New member? "}
                      <Link
                        color={"Black"}
                        textDecoration={"underline"}
                        fontWeight={"bold"}
                        onClick={() => setIsRegister(!isRegister)}
                      >
                        {isRegister ? "Login Here" : "Register Here"}
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
