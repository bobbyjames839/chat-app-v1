import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = (props) => {

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set('auth-token', result.user.refreshToken);
      props.setIsAuth(true);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-3xl bg-[#9729cf] w-full text-center py-5 mb-10">Sign in with Google to continue</p>
      <button className="px-3 py-1 border-2 border-black rounded-xl hover:bg-slate-300 duration-300" onClick={signIn}>Sign in with Google</button>  
    </div>
  )
}