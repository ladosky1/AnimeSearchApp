import {useState, useEffect, useRef} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { previewAnime } from '../api/backend';
import { useAuth } from '../context/AuthContext';
import {MagnifyingGlass, List} from 'phosphor-react';
import toast from 'react-hot-toast';

function Navbar(){
    const { user, logout } = useAuth();
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [preview, setPreview] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceQuery = useDebounce(query);
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPreview(){
            if(!debounceQuery){
                setPreview([]);
                return;
            }

            const results = await previewAnime(debounceQuery);
            setPreview(results);
        }

        loadPreview();
    }, [debounceQuery]);

    useEffect(() => {
        setActiveIndex(-1);
    }, [preview]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current &&  !searchRef.current.contains(e.target)){
                setSearchOpen(false);
                setPreview([]);
                setActiveIndex(-1);
            }  
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
            if(!searchOpen) return;

            if (e.key === "ArrowDown"){
                e.preventDefault();
                setActiveIndex(prev => 
                    prev < preview.length - 1 ? prev + 1 : 0
                );
            }
            if (e.key === "ArrowUp"){
                e.preventDefault();
                setActiveIndex(prev => 
                    prev > 0 ? prev - 1 : preview.length - 1
                );
            }

            if(e.key === "Enter"){
                e.preventDefault();
                if (activeIndex >= 0 && preview[activeIndex]){
                    navigate(`/results?q=${preview[activeIndex].title}`)
                } else {
                    navigate(`/results?q=${query}`)
                }
                setSearchOpen(false);
            }
    }

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
    }
    
    return(
        <nav className='sticky top-0 z-50 bg-bgLight shadow-md
                        px-4 lg:px-8 py-3 flex justify-between
                        items-center'>

            <Link 
                to='/'
                className='text-cyan text-xl font-semibold tracking-wide
                            hover:opacity-80 transition'>
                aNiMeLad🌀
            </Link>

            <div className='flex items-center gap-3 relative'>
                <div 
                    ref={searchRef}
                    className='relative flex items-center'>
                    <button
                        onClick={() => {
                            setSearchOpen(true);
                            setTimeout(() => inputRef.current?.focus(), 0)}}
                        className='text-cyan p-1 hover:scale-110 transition'>
                        <MagnifyingGlass size={20} weight='bold'/>
                    </button>
                    <input
                        ref={inputRef} 
                        type="text"
                        placeholder='Search anime...'
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActiveIndex(-1);}}
                        onKeyDown={handleKeyDown}
                        className={`bg-transparent border-b-2 border-cyan outline-none
                                    text-sm text-textMain ml-2 transition-all duration-200
                                    ${searchOpen ? 
                                        "w-48 opacity-100 pointer-events-auto border-cyan" : 
                                        "w-0 opacity-0 pointer-events-none"}`} />

                    {searchOpen && preview.length > 0 && (
                        <div className='absolute top-12 right-0 w-96 bg-bgLight
                                        shadow-2xl overflow-hidden z-50
                                        border border-white/10'>
                            {preview.map((anime, index)=> (
                                <div 
                                    key={anime.id}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => navigate(`/results?q=${anime.title}`)}
                                    className={`flex gap-3 px-3 py-2 cursor-pointer transition
                                                border border-white/5
                                                ${index === activeIndex ? 
                                                    "bg-white/5 border-b-cyan" :
                                                    "hover:bg-cyan/10"}`}>
                                <img 
                                    src={anime.image} 
                                    alt={anime.title}
                                    className='w-12 h-16 object-cover rounded-sm'/>

                                <div className='flex flex-col justify-center'>
                                    <p className='text-xs font-medium leading-tight line-clamp-2'>
                                        {anime.title}
                                    </p>
                                    <span className='text-xs text-textMuted'>
                                        {anime.year}
                                    </span>
                                </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    {user ? (
                        <>
                            <div className='flex items-center gap-2 px-2 py-1 rounded-base bg-white/5'>
                                <div className='w-6 h-6 rounded-full bg-cyan text-bgDark text-xs
                                                flex items-center justify-center font-bold'>
                                    {user.username[0].toUpperCase()}
                                </div>
                                <span className='text-sm text-textMain font-medium'>
                                    {user.username}
                                </span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className='border border-cyan text-cyan px-3 py-1 rounded-base
                                            text-sm hover:bg-cyan hover:text-bgDark transition active:scale-95'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login"
                                className='border border-cyan text-cyan px-3 py-1 rounded-base text-sm
                                            hover:bg-cyan hover:text-bgDark transition'>
                                    Login
                            </Link>
                            <Link
                                to="/register"
                                className='border border-cyan text-cyan px-3 py-1 rounded-base text-sm
                                            hover:bg-cyan hover:text-bgDark transition'>
                                    Register
                            </Link>
                        </>
                    )}
                </div>

                <div className='relative'>
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className='text-cyan p-1 hover:scale-110 transition'>
                        <List size={22} weight='bold'/>
                    </button>
                    {menuOpen && (
                        <div className='absolute right-0 mt-2 w-44 bg-bgLight
                                        border border-white/10 shadow-xl overflow-hidden
                                        z-50 flex flex-col'>
                            <Link 
                                to='/'
                                className='block px-4 py-2 text-sm hover:bg-white/5 transition'>
                                Home
                            </Link>
                            <Link 
                                to='/watchlist'
                                className='block px-4 py-2 text-sm hover:bg-white/5 transition'>
                                Watchlist
                            </Link>
                            <div className='md:hidden border-t border-white/10 mt-1'>
                                {user ? (
                                    <button 
                                        onClick={handleLogout}
                                        className='w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition'>
                                            Logout
                                        </button>
                                ) : (
                                    <>
                                        <Link 
                                            to="/login"
                                            className='block px-4 py-2 text-sm hover:bg-white/5 transition'>
                                                Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className='block px-4 py-2 text-sm hover:bg-white/5 transition'>
                                                Register
                                        </Link>
                                    </>
                                )}

                            </div>
                        </div>
                    )}


                </div>
            </div>
        </nav>
    )
}

export default Navbar;