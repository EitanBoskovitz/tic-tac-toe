import Cookies from 'universal-cookie';
import './App.css';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { StreamChat } from "stream-chat";

function App() {
  const api_key = "eeubfvakebsc";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  if (token) {
    client.connectUser(
      {
        id: cookies.get("userID"),
        userName: cookies.get("userName"),
        hashPassword: cookies.get("hashPassword"),
      },
      token
    )
  }

  return (
    <div className="App">
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
