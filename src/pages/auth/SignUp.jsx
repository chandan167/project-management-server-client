import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography, styled } from "@mui/material";
import * as yup from "yup"
import authInstance from "../../logic/auth.logic";
import { useState } from "react";
import { Link } from "react-router-dom";


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10)
}))

const AuthCard = styled(Card)(({ theme }) => ({
  width: theme.spacing(100),
  maxWidth: '90%'
}))

const SignUpForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}))

const AuthDriver = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const AuthFooterLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  flexDirection: 'column',
  alignItems: 'center'
}))


const schema = yup.object({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().optional().label('Last Name'),
  email: yup.string().email().required().label('Email'),
  phone: yup.string().optional().label('Phone'),
  password: yup.string().required().label('Password'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Confirm Passwords must match with (Password)').label('Confirm Password')
}).required()

export default function SignUn() {

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })


  const onSubmit = (data) => {
    setLoading(true);
    setErrorMessage(null)
    const temData = { ...data, confirmPassword: undefined };
    authInstance.signUpApi(temData).catch(error => {
      const message = error.response.data.message;
      if (message) {
        setErrorMessage(message)
      }
    }).finally(() => setLoading(false))
  }


  return (
    <Container>
      <AuthCard>
        <CardHeader title={<Typography variant="h6" component='h1' textAlign="center">Create Account</Typography>} />
        <CardContent>
          <SignUpForm onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <Alert color="error">{errorMessage}</Alert>}
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField variant="outlined" label="First Name" fullWidth
                  {...register("firstName")}
                  helperText={errors.firstName?.message}
                  error={!!errors.firstName}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField variant="outlined" label="Last Name" fullWidth
                  {...register("lastName")}
                  helperText={errors.lastName?.message}
                  error={!!errors.lastName}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField variant="outlined" label="Email Id" fullWidth
                  {...register("email")}
                  helperText={errors.email?.message}
                  error={!!errors.email}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField variant="outlined" label="Phone" fullWidth
                  {...register("phone")}
                  helperText={errors.phone?.message}
                  error={!!errors.phone}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField type="password" variant="outlined" label="Password" fullWidth
                  {...register("password")}
                  helperText={errors.password?.message}
                  error={!!errors.password}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField type="password" variant="outlined" label="Confirm Password" fullWidth
                  {...register("confirmPassword")}
                  helperText={errors.confirmPassword?.message}
                  error={!!errors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Box>
              <LoadingButton loading={loading} type="submit">Sign Up</LoadingButton>
            </Box>
          </SignUpForm>
          <AuthDriver />
          <AuthFooterLinks>
            <Typography component={Link} to="/sign-in">Sign In</Typography>
          </AuthFooterLinks>
        </CardContent>
      </AuthCard>
    </Container>
  )
}
