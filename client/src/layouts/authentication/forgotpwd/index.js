import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useState} from "react";
// Authentication layout components
import axios from 'axios';
import CoverLayout from "layouts/authentication/components/CoverLayout";
import {ToastContainer, toast} from 'react-toastify';
// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Reset() {
  const img="https://images.unsplash.com/photo-1471734134930-fdd4b1af533e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1749&q=80"
  const initialValues = {
    email: "",
  };
  const [values, setValues] = useState(initialValues);
  const [isDisabled, setDisabled] = useState(false);
const apiUrl = 'http://localhost:5000';
// const apiUrl = process.env.REACT_APP_API_URL || 'https://9tnby7zrib.execute-api.us-east-1.amazonaws.com/test/Emp';
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const useremail = {
      email: values.email,
    };


    axios.post(`${apiUrl}/authentication/user/forget`,useremail)
    .then(()=>toast.success("Please check your Inbox 📬"))
    .catch(err=>toast.error(err.response.data+"😣"))
    console.log(useremail);
   setDisabled(true);
    // console.log(useremail);
  };

  return (
    <CoverLayout coverHeight="50vh" image={img}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Forgot Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput type="email" label="Email"  name="email"
                value={values.email}
                onChange={handleInputChange} fullWidth required />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info"  disabled={isDisabled} fullWidth>
                reset
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Back to Homepage{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="error"
                  fontWeight="medium"
                  textGradient
                >
                  Click here
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer/>
    </CoverLayout>
  );
}

export default Reset;
