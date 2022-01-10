import * as Yup from "yup";

export const ValidLoginFormSchema = Yup.object().shape({
  login: Yup.string()
    .required("Warning: Fields must not be empty")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Warning: Please use only latin characters and numbers"
    )
    .min(6, "Warning: Minimul characters 6")
    .max(24, "Warning: Maximum characters 24"),
  password: Yup.string()
    .required("Warning: Fields must not be empty")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Warning: Please use only latin characters and numbers"
    )
    .matches(/[0-9]+/, "Warning: Must have one or more digits")
    .min(8, "Warning: Minimul characters 8")
    .max(24, "Warning: Maximum characters 24"),
});

export const ValidRegisterFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Warning: Field Email must not be empty")
    .email("Warning: Field Email must be a valid email")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})/,
      "Warning: Please use only latin characters and numbers"
    ),
  login: Yup.string()
    .required("Warning: Field Login must not be empty")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Warning: Please use only latin characters and numbers"
    )
    .min(6, "Warning: Minimul characters 6")
    .max(24, "Warning: Maximum characters 24"),
  password: Yup.string()
    .required("Warning: Field Password must not be empty")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Warning: Please use only latin characters and numbers"
    )
    .matches(/[0-9]+/, "Warning: Must have one or more digits")
    .min(8, "Warning: Minimul characters 8")
    .max(24, "Warning: Maximum characters 24"),
});
