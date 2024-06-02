import {  useState } from 'react'
import bgLogin from '../../public/bg-login.jpeg'
import logoItera from '../../public/logo-itera.png'
import logoBM from '../../public/logo-bm.png'
// import { useAuth } from '../hook/auth'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebash'

function Login() {
    // const { login } = useAuth();

    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    
    const handleLogin = async function (e) {
            e.preventDefault();
            setIsLoading(false);
        try {
            await signInWithEmailAndPassword(auth,email, password);
        alert('Login successful!');
        setIsLoading(false);
        navigate('/home');
        } catch (err) {
            setIsLoading(false);
        setError(err.message);
        }
    }

  return (
    <div>
    <div className="w-screen h-screen relative flex justify-center items-center">
        <div className="relative">
            <div>
                <img src={bgLogin} className="w-screen h-screen opacity-90" alt=""/>
            </div>
            <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-45">

            </div>
        </div>
        <div className="absolute top-0 left-0 w-screen h-screen">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center gap-2 justify-center mb-4">
                    <div>
                        <img src={logoItera} className="w-[100px] rounded-full" alt=""/>
                    </div>
                    <div>
                         <img src={logoBM} className="w-[100px] rounded-full" alt=""/>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="bg-white w-[400px] px-4 py-4 rounded-lg">
                    <div className="text-center text-[20px] font-bold">
                        Login
                    </div> 
                    <div className="py-4">
                        <input type="email" className="w-full border-2 rounded-md h-10 px-4 mb-6" placeholder="Masukkan Email Anda" value={email} onChange={(e) => setemail(e.target.value)}/>
                        
                        <input type="password" className="w-full border-2 rounded-md h-10 px-4" placeholder="Masukkan Password Anda" value={password} onChange={(e) => setPassword(e.target.value)}/>
                          </div>
                          {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <button type='submit' className="bg-[#0134b2] w-full py-2 rounded-md text-white font-bold">
                            {isLoading ? 'Loading...' : 'masuk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login
