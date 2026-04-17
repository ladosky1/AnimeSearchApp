import { useState } from "react";
import { loginUser } from "../api/backend";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";
import toast from "react-hot-toast";


function Login(){
    const {setUser} = useAuth();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setloading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(loading) return;
        setError("");

        try {
            setloading(true);
            const data = await loginUser(form);
            setUser(data.user);
            toast.success("Login successful");

            navigate("/watchlist");
        } catch (err) {
            setError(err.message);
            toast.error("Could not login: " + err.message);
        } finally {
            setloading(false);
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center px-4">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-bgLight p-6 rounded-base shadow-xl">
                    <h2 className="text-xl font-semibold text-cyan mb-5 text-center">
                        Welcome Back
                    </h2>
                
                <div className="mb-4">
                    <label className="block text-sm text-textMuted mb-1">
                        Username
                    </label>
                    <input 
                        name="username"
                        onChange={handleChange}
                        value={form.username}
                        className="w-full px-3 py-2 rounded-base bg-transparent
                                    border border-white/10 text-sm outline-none
                                    focus:border-cyan transition" />
                </div>
                
                <div className="mb-4">
                <label 
                    className="block text-sm text-textMuted mb-1">
                    Password
                </label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            className="w-full px-3 py-2 pr-10 rounded-base bg-transparent border
                                        border-white/10 text-sm outline-none 
                                        focus:border-cyan transition" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-2 top-1/2 -translate-y-1/2
                                        text-textMuted hover:text-cyan transition">
                            {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </button>
                    </div>   
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-base bg-cyan text-bgDark
                                font-medium text-sm transition hover:opacity-90
                                disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Logging in..." : "Login"}
                </button>
                
                {error && 
                    <p className="text-pink text-xs mt-3 text-center">
                        {error}
                    </p>}

                <p className="text-xs text-textMuted mt-4 text-center">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-cyan cursor-pointer hover:underline">
                        Register
                    </span>
                </p> 
            </form>
        </div>
    )
}

export default Login;