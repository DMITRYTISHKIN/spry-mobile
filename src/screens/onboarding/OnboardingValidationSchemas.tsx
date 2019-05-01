import * as yup from "yup";

export const PhoneDetailsSchema = yup.object().shape({
  phoneNumber: yup.string().required("Required")
});

export const OTPDetailsSchema = yup.object().shape({
  otp: yup
    .string()
    .min(5, "Should be 5 digits")
    .max(5, "Should be 5 digits")
    .required("Required")
});

export const CardDetailsSchema = yup.object().shape({
  cardNumber: yup.string().required("Required"),
  cardExpiry: yup.string().required("Required")
});
