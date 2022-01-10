import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { REGISTER_USER } from "../../apollo/mutation";
import { Loader } from "../../asset/common/Loader";
import { ValidRegisterFormSchema } from "../../service/validation/validationSchema";
import style from "../form.module.sass";

interface formikProps {
  switchAuth: (arg: boolean) => void;
}

interface IPropertyValues<T> {
  login?: T;
  email?: T;
  password?: T;
  rememberme: Boolean;
}

interface IFieldProps {
  errors: IPropertyValues<string>;
  touched: IPropertyValues<boolean>;
}

export const RegisterForm = ({ switchAuth }: formikProps) => {
  const startValue: IPropertyValues<string> = {
    login: "",
    email: "",
    password: "",
    rememberme: false,
  };
  const [registerUser, {loading}] = useMutation(REGISTER_USER);

  return (
    <Formik
      initialValues={startValue}
      validationSchema={ValidRegisterFormSchema}
      onSubmit={(values, { resetForm }) => {
        registerUser({
          variables: {
            input: {
              login: values.login,
              email: values.email,
              password: values.password,
              rememberme: values.rememberme,
            },
          },
        })
          .then((res) => {
            console.log(res.data.register.message);
            switchAuth(false);
          })
          .catch((e) => {
            console.log(e);
          });
        resetForm({
          values: {
            login: "",
            email: "",
            password: "",
            rememberme: false,
          },
        });
      }}
    >
      {({ ...formikProps }) => {
        return (loading ? <Loader/> : <FieldRegister {...formikProps}/>);
      }}
    </Formik>
  );
};

const FieldRegister = ({ errors, touched }: any) => {
  return (
    <Form
      className={style.form__wrapper}
      autoComplete="off"
      action="##"
      id="SignUp"
    >
      <Field
        className={style.inputs__based}
        type="text"
        placeholder="Your Login"
        name="login"
      />
      <span className={style.form_errors}>{touched.login && errors.login ? `${errors.login}` : null}</span>
      <Field
        className={style.inputs__based}
        type="text"
        placeholder="Your Email"
        name="email"
      />
      <span className={style.form_errors}>{touched.email && errors.email ? `${errors.email}` : null}</span>
      <Field
        className={style.inputs__based}
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="off"
      />
      <span className={style.form_errors}>{touched.password && errors.password ? `${errors.password}` : null}</span>
      <label className={style.rememberme}>
        <Field type="checkbox" name="rememberme" />
        {"Remember Me"}
      </label>
      <button className={style.form_button} type="submit">
        Sign Up
      </button>
    </Form>
  );
};
