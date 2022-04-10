
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';


/* const auth = getAuth(app); */
const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        setUser(result.user)
        console.log(result)
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.error(error);
      })
  }
  return (
    <div className="App">

      {
        (user.uid) ? <button onClick={handleSignOut}>Sign Out</button> : <>
          <button onClick={handleGoogleSignIn}>Google Sign IN</button>
          <button onClick={handleGithubSignIn}>Git hub Log In</button>
        </>}


      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <p> <img src={user.photoURL} alt="" /></p>
    </div>
  );
}

export default App;
