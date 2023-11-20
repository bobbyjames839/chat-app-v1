import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const Chat = (props) => {

  const [newMessage, setNewMessage] = useState('');
  const messagesRef = collection(db, 'messages');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(messagesRef, where('room', '==', props.room), orderBy('createdAt'));
    const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });
      setMessages(messages)
    });

    return () => unSubscribe();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage, 
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: props.room,
    });
    setNewMessage('');
  }

  return (
    <div className="flex flex-col items-center w-80 border-2 border-black rounded-xl">
      <h1 className="mb-5 w-full bg-blue-300 rounded-tr-lg rounded-tl-lg text-center py-3 text-xl">Welcome to {props.room}</h1>
      <div className="w-full flex flex-col items-center py-5">{messages.map((message) => (
        <div className="flex items-center w-11/12 my-1" key={message.id}>
          <p>{message.text}<span className="text-xs ml-3 text-gray-600">{message.user}</span></p>
        </div>
      ))}</div>

      <form className="flex justify-between w-full px-3 pb-3" onSubmit={handleSubmit}>
        <input className="border-2 px-2 py-1 border-gray-400 rounded-bl rounded-tl w-10/12 focus:outline-none" placeholder="Type here..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
        <button className="border-r-2 border-t-2 border-b-2 px-2 py-1 border-gray-400 rounded-br rounded-tr w-2/12 flex justify-center focus:outline-none" type="submit">Send</button>
      </form>
    </div>
  )
}