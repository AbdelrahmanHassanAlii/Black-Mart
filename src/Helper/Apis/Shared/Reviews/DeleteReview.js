import axios from "axios"
import { getToken } from "../../../Funcation/LocalStorage/getToken"
const DeleteReview =async (id) => {
    const response=axios.delete(`http://localhost:3000/api/v1/review/${id}`,{
        headers:{
            "token":`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY1NWJiZTNjMTAzMjhlODA1N2JiZGMiLCJlbWFpbCI6ImhhbXpha2hhbGVkMUBibGFja21hcnQuY29tIiwidXNlcm5hbWUiOiJoYW16YWtoYWxlZDEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNzU2NjE2OCwiZXhwIjoxNzI3NTczMzY4fQ.ddkvKSjjvCB4M6RwhD1TXf1DtcZ_Kl7oVXIhLDjzehc`
        }
    })
  return (response)
}

export default DeleteReview
