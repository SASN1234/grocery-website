import React, { useEffect, useState } from "react";
import { LoginInput } from "../Components";
import { FaEnvelope, FaLock, FcGoogle } from "../Assets/icons";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom"
import { buttonClick } from "../Animations";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Context/Actions/userActions";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { profile, validateUserJWTToken } from "../api";
import { alertInfo, alertNull, alertWarning } from "../Context/Actions/alertActions";



const Auth = () => {
  const dispatch =useDispatch();
  const [userInput, setUserInput] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
 const navigate =useNavigate();
 const user =useSelector((state)=>state.user)
 const alert=useSelector(state=>state.alert)
 useEffect(()=>{
  if(user && user?.email_verified===true){
    navigate("/", {replace:true})
  }
 },[user])

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });

            navigate("/", {replace:true})
          });
        }
      });
    });
  };
  const signInWithEmailPassword = async () => {
    if (userInput === "" || password === "") {
      dispatch(alertInfo("Required Field's should not be Empty"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    } else {
      setUserInput("");
      setPassword("");
      await signInWithEmailAndPassword(firebaseAuth, userInput, password)
        .then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              if (cred.emailVerified) {
                cred.getIdToken().then((token) => {
                  validateUserJWTToken(token).then((data) => {
                    dispatch(setUserDetails(data));
                    
                  
                  });
                });
              } else {
                dispatch(alertWarning("Your Email Id is not Verified...."));
                setTimeout(() => {
                  dispatch(alertNull());
                }, 3000);
              }
            } else {
              dispatch(alertWarning("Invalid Email Id or Password...."));
              setTimeout(() => {
                dispatch(alertNull());
              }, 3000);
            }
          });
        })
        .catch((error) => {
          // Handle authentication errors here
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Authentication Error:", errorMessage);
          // Display error message to the user
          dispatch(alertWarning("Invalid Email Id or Password...."));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
    }
  };
  
  const signUpWithEmailPassword = async () => {
    if (userInput === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Required Field's should not be Empty"))
      setTimeout(() => {
        dispatch(alertNull())
      }, 3000);
    } else {
      if (password === confirmPassword) {
        setUserInput("");
        setPassword("");
        setConfirmPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userInput,
          password
        ).then(async (userCred) => {
          const user=userCred?.user
          await sendEmailVerification(user);
          console.log(user)
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {  
                  validateUserJWTToken(token).then((data) => {
                    dispatch(setUserDetails(data));  
                 
                    
                  });
                  dispatch(alertInfo("An email verification link has been sent to the provided valid email address."))
                  setTimeout(() => {
                    dispatch(alertNull())
                  }, 3000);
                  // navigate("/", { replace: true });
              });
            }
          });
        });
      }
      else{
        dispatch(alertWarning("Confirm Password should be match with the Created Password"))
      }
    }
  };
  // useEffect(()=>{
  //  user && user?.email_verified ? dispatch(alertInfo("Verify Your Email Id.")):dispatch(alertInfo("Your EmailId is Verified now you can Sign In"))
  // },[user])

  return (
    <>
      <div className="max-w-md w-full bg-black bg-opacity-60 backdrop-blur-lg sm:rounded-lg">
        <div className=" bg-opacity-60 bg-lightOverLay  backdrop-blur-lg  rounded-lg flex flex-col gap-2 items-center justify-center max-w-md w-full px-6 py-8  overflow-hidden sm:rounded-lg">
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            <h1>LOGO</h1>
            <h1>NAME</h1>
          </div>

          <p className="text-3xl font-semibold text-white">
            {!isSignUp ? "SIGN_IN" : "SIGN_UP"}
          </p>
          <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
            <LoginInput
              placeHolder={"Enter Email"}
              icons={<FaEnvelope className="text-xl text-textColor" />}
              inputState={userInput}
              inputStateFunc={setUserInput}
              type={"email"}
              isSignUp={isSignUp}
            />
            <LoginInput
              placeHolder={!isSignUp ? "Enter Password" : "Create Password"}
              icons={<FaLock className="text-xl text-textColor" />}
              inputState={password}
              inputStateFunc={setPassword}
              type={"password"}
              isSignUp={isSignUp}
            />
            {isSignUp && (
              <LoginInput
                placeHolder={"Enter Confirm Password"}
                icons={<FaLock className="text-xl text-textColor" />}
                inputState={confirmPassword}
                inputStateFunc={setConfirmPassword}
                type={"password"}
                isSignUp={isSignUp}
              />
            )}

            {!isSignUp ? (
              <p>
                Doesn't have an Account?{" "}
                <motion.button
                  {...buttonClick}
                  className="text-yellow-600 underline cursor-pointer bg-transparent"
                  onClick={() => {
                    setIsSignUp(true);
                  }}
                >
                  Create Account
                </motion.button>
              </p>
            ) : (
              <p>
                If Already have an Account?{" "}
                <motion.button
                  {...buttonClick}
                  className="text-yellow-600 underline cursor-pointer bg-transparent"
                  onClick={() => {
                    setIsSignUp(false);
                  }}
                >
                  Sign_In
                </motion.button>
              </p>
            )}
     {
  !isSignUp ? (
    <motion.button
      {...buttonClick}
      onClick={signInWithEmailPassword}
      className="w-full px-4 py-2 rounded-md bg-yellow-500 cursor-pointer text-white text-xl capitalize hover:bg-yellow-600 transition-all duration-150"
    >
      {"sign_in"}
    </motion.button>
  ) : (
    <motion.button
      {...buttonClick}
      onClick={signUpWithEmailPassword}
      className="w-full px-4 py-2 rounded-md bg-yellow-500 cursor-pointer text-white text-xl capitalize hover:bg-yellow-600 transition-all duration-150"
    >
      {"sign_Up"}
    </motion.button>
  )
}

            
            <div className="flex items-center justify-center gap-16">
              <div className="w-24 h-[1px] rounded-md bg-white"></div>

              <h1 className="text-white">OR</h1>

              <div className="w-24 h-[1px] rounded-md bg-white"></div>
            </div>
            <motion.div
              {...buttonClick}
              className="flex items-center justify-center w-full px-10 py-2 bg-lightOverLay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
              onClick={loginWithGoogle}
            >
              <FcGoogle className="text-xl" />
              <p className="captilize text-base"> Sign_In with Google</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
