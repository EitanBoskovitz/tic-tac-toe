import Cookies from 'universal-cookie';
import './App.css';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import JoinGame from "./components/JoinGame";
import { StreamChat } from "stream-chat";
import { useState } from 'react'
import { Chat } from 'stream-chat-react'

function App() {
  const api_key = "eeubfvakebsc";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setIsAuth] = useState(false);

  if (token) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        hashedPassword: cookies.get("hashedPassword"),
      },
      token
    ).then((user) => {
      setIsAuth(true);
    })
  }

  //casing any component with the Chat component allowes us to have client as props for all the components cased inside
  return (
    <div className="App" >
       {isAuth ? (<Chat client={client}>
        <JoinGame />
      </Chat>) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
