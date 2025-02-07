import { Box , Text , Button} from "@chakra-ui/react"
import { PinInput } from "./ui/pin-input"
import { useAppSelector ,useAppDispatch} from "../App/hook"
import { useState } from "react"
import axios from "axios"
import { Toaster , toaster} from './ui/toaster'
import { useNavigate } from "react-router"
import { setIsOtpGenerated } from "../App/appSlice"
export const OTPComponent = () => {

    const email = useAppSelector((state)=>state.app.userRegisterInfoState.Email);
    const isOtoGenerated = useAppSelector((state)=>state.app.isOtpGenerated);
    const [value, setValue] = useState(['','','',''])
    const [otp,setOtp] = useState<string>(''); // otp store
    const [otpNotMatched,setOtpNotMatched] = useState<boolean>(false);
    const userData = useAppSelector((state)=>state.app.userRegisterInfoState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading,setLoading] = useState<boolean>(false)
    
    async function postData() {
      
        try{
           //
           await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URI}/auth/v1/register?otp=${otp}`,{
            ...userData
           })
           toaster.success({
            title: "User Registration Successful",
            description: "Please Login to access your account",
          });
          setTimeout(()=>{
           navigate('/login');
           dispatch(setIsOtpGenerated(false))
          },1500)
        }catch(error) {
          alert('Error During Register Try later')
        }finally{
          //
          setOtp('');
        } 
    }

     function verifyOtp() {
      setLoading(true)
        axios.get(`${import.meta.env.VITE_BACKEND_BASE_URI}/auth/v1/verifyOtp?email=${email}&otp=${otp}`)
        .then((res)=>{
            // if success then we finally submit user data to register api
            setOtpNotMatched(false);
            postData(); //post user data to server
        }).catch((err)=>{
            // if err diaplay text otp not matched
            setOtpNotMatched(true);
        }).finally(()=>{
          setLoading(false)
        })
    }

  return (
    <>
    <Box width='100%' height="110%" bg='white'  zIndex='1000'  pos='absolute'
    top='-10%' left='0%' display='grid' justifyContent='center'
    placeItems='center'>
        <Box marginTop='18%'>
          <Text>A One Time Password sent to your email </Text>
          <Text color='blue'>{email}</Text>
          <br />
          <PinInput gap="4" size="2xl" placeholder="o"  value={value} onValueChange={(e) => {
            const str = e.value.join('');
            setOtp(str);
          }}/>
          <Text color='red'>{otpNotMatched == true ?('Otp not matched'):('')}</Text>
          <br />
           <Button size='md' w='40%' disabled={otp.length == 4 ? false : true}
           onClick={()=>verifyOtp()}>
            {
              loading == true ? (<i className="fa-solid fa-spinner fa-spin" style={{color:'white',fontSize:"25px"}}></i>) :
              ('Verify otp')
            }
           </Button>
        </Box>
        <Toaster/>
    </Box>
    </>
  )
}


