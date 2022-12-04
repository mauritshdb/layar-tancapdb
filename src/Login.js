import './Login.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from "react-router-dom";

function Login() {
  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // Movie DB auth step 1
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}authentication/token/new?api_key=${process.env.REACT_APP_APIKEY}`
        )
        .then((response) => {
          const requestToken = response.data.request_token;
          // console.log(requestToken);
          axios
            .post(
              `${process.env.REACT_APP_BASEURL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}`,
              {
                username: values.username, // priambudi.lintang
                password: values.password, // Fah63FaWT5e$4di
                request_token: requestToken,
              }
            )
            .then((res) => {
              const validatedRequestToken = res.data.request_token;
              // console.log(validatedRequestToken);
              axios
                .post(
                  `${process.env.REACT_APP_BASEURL}authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}`,
                  {
                    request_token: validatedRequestToken,
                  }
                )
                .then((res) => {
                  const sessionID = res.data.session_id;
                  // console.log(sessionID);
                  localStorage.setItem("session", sessionID);
                  localStorage.setItem("username", values.username)
                  // navigate('/profile');
                  // window.location.href = "/profile";
                  window.location.assign("/");
                });
            });
        });
    },
  });

  return (

    <div>
      <div className='titlePage'>
        <h1>Login</h1>
      </div>
      <div className='divdiv'>
        <div className='RilForm'>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div style={{ color: "red" }}>{formik.errors.username}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>

  );
}

export default Login;
