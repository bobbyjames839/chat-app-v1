import React, { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signOutt = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-20">
      {room ? 
      <div>
        <Chat room={room}/>
      </div> :
      <div className="flex flex-col w-3/6 py-10 rounded-xl items-center bg-red-400">
        <label className="text-2xl font-semibold mb-2">Enter room name</label>
        <input ref={roomInputRef} className='w-120 rounded focus:outline-none px-3 h-10 italic'/>
        <button className="bg-red-600 mt-10 rounded-xl px-8 py-2 text-white hover:bg-red-700 duration-150" onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
      </div>
        }
        <button className="border border-black px-2 py-1 mt-10 rounded-xl" onClick={signOutt}>Sign Out</button>
    </div>
  )

}

export default App;
