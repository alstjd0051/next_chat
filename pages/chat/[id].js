import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import SideBar from "../../src/components/layout/nav/SideBar";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../src/util/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../src/util/getOtherEmail";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Topbar = ({ email }) => {
  return (
    <Flex
      //
      bg="gray.100"
      h="81px"
      w="100%"
      align="center"
      p={5}
    >
      <Avatar src="" marginEnd={3} />
      <Heading color="black" size="lg">
        {email}
      </Heading>
    </Flex>
  );
};

const Bottombar = ({ id, user }) => {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <Flex p={3}>
        <Input
          placeholder="메시지를 입력하세요 ... "
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </Flex>
      <Button type="submit" hidden>
        submit
      </Button>
    </FormControl>
  );
};

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;

  const [user, loading, error] = useAuthState(auth);

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const [chat] = useDocumentData(doc(db, "chats", id));

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text} </Text>
        </Flex>
      );
    });
  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    ),
      100;
  }, [messages]);

  return (
    <Flex h="100vh">
      <Head>
        <title>ChatApp</title>
      </Head>
      <SideBar />
      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              width: "100%",
              borderRadius: "8px",
            },
          }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
