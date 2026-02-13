import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("მეილი არასწორია").required("მეილი აუცილებელია"),
  password: yup
    .string()
    .min(6, "პაროლი მინიმუმ 6 სიმბოლო უნდა იყოს")
    .required("პაროლი აუცილებელია"),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email("მეილი არასწორია").required("მეილი აუცილებელია"),

  password: yup
    .string()
    .min(6, "პაროლი მინიმუმ 6 სიმბოლო უნდა იყოს")
    .required("პაროლი აუცილებელია"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "პაროლები არ ემთხვევა")
    .required("გაიმეორე პაროლი"),
});
