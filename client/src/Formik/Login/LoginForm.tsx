import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { LOGINIZATION } from "../../apollo/mutation";
import { saveTokenInLocalStorage } from "../../helpers/localStorage";
import { ValidLoginFormSchema } from "../../service/validation/validationSchema";
import style from "../form.module.sass";

interface formikProps {
  changeAuth: (arg: boolean) => void;
}

interface IPropertyValues<T> {
  login?: T;
  email?: T;
  password?: T;
}

interface IFieldProps {
  errors: IPropertyValues<string>;
  touched: IPropertyValues<boolean>;
}

export const LoginForm = ({ changeAuth }: formikProps) => {
  const startValue: IPropertyValues<string> = {
    login: "",
    password: "",
  };

  const [login] = useMutation(LOGINIZATION);

  return (
    <Formik
      initialValues={startValue}
      validationSchema={ValidLoginFormSchema}
      onSubmit={(values, { resetForm }) => {
        login({
          variables: {
            input: {
              login: values.login,
              password: values.password,
            },
          },
        })
          .then((res) => {
            if (res.data.login.status === 200) {
              saveTokenInLocalStorage({
                token: res.data.login.accessToken,
                refreshToken: res.data.login.refreshToken,
                validation: res.data.login.validation,
              });
              changeAuth(true);
            } else {
              throw new Error(res.data.login.message);
            }
          })
          .catch((error) => {
            alert(error);
          });
        resetForm({
          values: {
            login: "",
            password: "",
          },
        });
      }}
    >
      {({ ...formikProps }) => {
        return <FieldLogin {...formikProps} />;
      }}
    </Formik>
  );
};

const FieldLogin = ({ errors, touched }: IFieldProps) => {
  return (
    <Form
      className={style.form__wrapper}
      autoComplete="off"
      action="##"
      id="SignIn"
    >
      <Field
        className={style.inputs__based}
        type="text"
        placeholder="Your Login"
        name="login"
      />
      <span className={style.form_errors}>
        {touched.login && errors.login ? `${errors.login}` : null}
      </span>
      <Field
        className={style.inputs__based}
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="off"
      />
      <span className={style.form_errors}>
        {touched.password && errors.password ? `${errors.password}` : null}
      </span>
      <button className={style.form_button} type="submit">
        Sign In
      </button>
    </Form>
  );
};
