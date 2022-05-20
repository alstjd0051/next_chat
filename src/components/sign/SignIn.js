import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import Head from "next/head";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../util/firebaseconfig";

const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>

      <Center h="100vh">
        <Stack
          align="center"
          bgColor="gray.600"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="md"
          >
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>
          <Button
            boxShadow="md"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign In with Google
          </Button>
          <Button
            boxShadow="md"
            onClick={() => signInWithGithub("", { prompt: "select_account" })}
          >
            Sign In with Github
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default SignIn;
