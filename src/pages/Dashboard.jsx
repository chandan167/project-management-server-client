import { Button } from "@mui/material";
import Center from "../components/Center";
import authInstance from "../logic/auth.logic";


export default function Dashboard() {
  return (
    <Center>
        <Button onClick={authInstance.logoutApi}>Logout</Button>
    </Center>
  )
}
