import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, CardHeader, Divider, TextField, Typography, styled } from "@mui/material";
import * as yup from "yup"
import { useSnackbar } from "notistack";
import Center from "../../components/Center";
import authInstance from "../../logic/auth.logic";
import { useState } from "react";
import { Link } from "react-router-dom";



const AuthCard = styled(Card)(({ theme }) => ({
  width: theme.spacing(50),
  maxWidth: '90%'
}))

const SignInForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}))

const AuthDriver = styled(Divider)(({theme}) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const AuthFooterLinks = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  flexDirection: 'column',
  alignItems: 'center'
}))


const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
}).required()

export default function SignIn() {

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })


  const onSubmit = (data) => {
    setLoading(true);
    authInstance.signInApi(data.email, data.password).catch(error => {
      const message = error.response.data.message;
      if (message) {
        enqueueSnackbar(message, { variant: 'error' })
      }
    }).finally(() => setLoading(false))
  }


  return (
    <Center>
      <AuthCard>
        <CardHeader title={<Typography variant="h6" component='h1' textAlign="center">Login</Typography>} />
        <CardContent>
          <SignInForm onSubmit={handleSubmit(onSubmit)}>
            <TextField variant="outlined" label="Email Id" fullWidth
              {...register("email")}
              helperText={errors.email?.message}
              error={!!errors.email}
            />
            <TextField type="password" variant="outlined" label="Password" fullWidth
              {...register("password")}
              helperText={errors.password?.message}
              error={!!errors.password}
            />
            <LoadingButton loading={loading} type="submit">Login</LoadingButton>
          </SignInForm>
          <AuthDriver />
          <AuthFooterLinks>
            <Typography component={Link} to="/forgot-password">Forgot password</Typography>
            <Typography component={Link} to="/sign-up">Create account</Typography>
          </AuthFooterLinks>

        </CardContent>
      </AuthCard>
    </Center>
  )
}
