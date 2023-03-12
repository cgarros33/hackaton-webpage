import { useSteps } from 'chakra-ui-steps';
import React, { useState } from 'react';
import {
  Heading,
  Box,
  Text,
  Button,
  VStack,
  useToast,
  HStack,
  Spacer,
  CircularProgress,

} from "@chakra-ui/react";

import FirstStep from './firstStep'
import ThirdStep from './thirdStep'
import FourthStep from './fourthStep';
import FifthStep from './fifthStep';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';


const HeadingSize = ['sm','sm','md','lg','xl']

const Register = () => {

  const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [participants, setParticipants] = useState([])
  const [teamDescription, setTeamDescription] = useState("");
  const [motivation, setMotivation] = useState("");

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const toast = useToast()
  const toastIdRef = React.useRef()
  const router = useRouter()
  // const registerUser = async () => {
  //   await fetch('/api/users', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       "email": email,
	//       "password": password,
  //       "name": name 
  //     }),
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //   })
  //   .then((response) => {response.json})
  //   .then((data) => console.log(data))
  //   .catch((e) => console.log(e.message))
  // }
  const finishInscription = async () => {
    const data = {
      name: name,
      email: email, 
      password: password,
      participants: participants,
      teamDescription:teamDescription, 
      motivation:motivation
    }
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/team`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      if(response.status!==200) throw new Error("Server error")
    }catch(err){
      toastIdRef.current =  toast({
        title:"¡La inscripción fue registrada!",
        status:'success',
        isClosable:true,
        duration:5000,
        render: ()=>{
          return(
            <Box backgroundColor='red.500' borderRadius='4px' p='4%' w='full'>
              <VStack>
                <HStack w='full'>
                  <CloseIcon/>
                  <Heading fontSize={HeadingSize}>¡Ocurrió un error!</Heading>
                  <Spacer/>
                  <Button onClick={()=>toast.close(toastIdRef.current)}>Volver</Button>
                </HStack>
                <HStack>
                  <Text>Por favor, intenta nuevamente en un momento</Text>
                  <CircularProgress isIndeterminate  color='grey' value={20}></CircularProgress>
                </HStack>
              </VStack>
            </Box>
          )
        },
        onCloseComplete:()=>{
          router.push('/') //No se si usar replace para que no vuelva
        }
      })
      console.log(err)
      return
    }
    toastIdRef.current =  toast({
      title:"¡La inscripción fue registrada!",
      status:'success',
      isClosable:true,
      duration:5000,
      render: ()=>{
        return(
          <Box backgroundColor='green' borderRadius='4px' p='4%' w='full'>
            <VStack>
              <HStack w='full'>
                <CheckCircleIcon/>
                <Heading fontSize={HeadingSize}>¡Inscripción exitosa!</Heading>
                <Spacer/>
                <Button onClick={()=>toast.close(toastIdRef.current)}>Volver</Button>
              </HStack>
              <HStack>
                <Text>En unos momentos te redigirimos a la pantalla de inicio</Text>
                <CircularProgress isIndeterminate  color='grey' value={20}></CircularProgress>
              </HStack>
            </VStack>
          </Box>
        )
      },
      onCloseComplete:()=>{
        router.push('/') //No se si usar replace para que no vuelva
      }
    })
  }

  const steps = [
    <FirstStep key="first" name ={name} setName={setName} nextStep={nextStep} /> ,
    <ThirdStep key="third" email={email} setEmail={setEmail} password={password} setPassword={setPassword} nextStep={nextStep} prevStep={prevStep}/> ,
    <FourthStep key="fourth" participants={participants} setParticipants={setParticipants} nextStep={nextStep} prevStep={prevStep}/>,
    <FifthStep key="fifth" desc1={teamDescription} setDesc1={setTeamDescription} desc2={motivation} setDesc2={setMotivation} nextStep={finishInscription} prevStep={prevStep}/>
 ];
 
  return (
    <>
    {/* progress bar (lo hice a mano para que quede animado) */}
    <Box>
      <Box borderRadius='2px' mt='2%' mx='10%' height='6px' backgroundColor='gray'>
        <Box borderRadius='2px' backgroundColor='CSBlue'  height='6px' width={`${(activeStep+1)*100.0/steps.length}%`} transition='1s ease' transitionDelay='0.1s'></Box>
      </Box>
      {steps[activeStep]}
    </Box>
        
    </>
  );
};

export default Register
