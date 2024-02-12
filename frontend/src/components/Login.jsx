import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {LoginUser,reset} from "../features/authSlice"
import logo from "../logo2.svg";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword] =useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,isError,isSuccess,isLoading,message} = useSelector((state)=>state.auth);
    const Auth =(e)=>{
        e.preventDefault();
        dispatch(LoginUser({email,password}));
    }

    useEffect(()=>{
        if(user ||isSuccess){
            navigate("/dashboard");
        }
        dispatch(reset());
    },[user,isSuccess,dispatch,navigate]);

  return (
    <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
                
                <form onSubmit={Auth} className='box'>
                    {isError && <p className='has-text-centered'>{message}</p>}
                    <img 
                        src={logo}
                      
                        width="152" 
                        height="80"
                        alt="logo"
                    />
                    <div className="field">
                        <label  className="label">Email</label>
                        <div className="control">
                            <input type="text" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Kωδικός πρόσβασης</label>
                        <div className="control">
                            <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="*********"/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <button type="submit" className="button is-success is-fullwidth">{isLoading ?"Loading..." : "Είσοδος"}</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;