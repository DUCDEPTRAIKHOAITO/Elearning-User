import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import ResponsiveMenu from './ResponsiveMenu';
import SearchCourseDropdown from '../../components/search/SearchCourseDropdown';

const HeaderTwo = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [offcanvasShow, setOffcanvasShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem('username') || sessionStorage.getItem('username') || '';
        setIsLoggedIn(!!name);
        setFullName(name);
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchInput.trim()) {
                axios.get('http://localhost:8080/api/courses/search', {
                    params: { keyword: searchInput.trim() },
                })
                    .then(res => setSearchResults(res.data))
                    .catch(err => console.error('Search error:', err));
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [searchInput]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <>
            <header
                className="edu-header header-default header-sticky sticky"
                style={{
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    padding: '12px 40px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <div className="row align-items-center w-100">

                    {/* Logo (using external URL) */}
                    <div className="col-lg-2 col-md-6 col-6">
                        <div className="logo">
                            <Link to="/">
                                <img
                                    src="https://i.pinimg.com/736x/7a/43/dd/7a43dd2411fda8c3685c393dafbc881c.jpg"
                                    alt="Main Logo"
                                    style={{ height: '50px', objectFit: 'contain' }}
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="col-lg-5 d-none d-xl-block">
                        <nav className="mainmenu-nav d-none d-lg-block">
                            <Nav />
                        </nav>
                    </div>

                    {/* Search and User Section */}
                    <div className="col-lg-5 col-md-6 col-6 d-flex align-items-center justify-content-end gap-4">

                        {/* Search Field */}
                        <form
                            onSubmit={handleSearchSubmit}
                            style={{
                                position: 'relative',
                                flex: 1,
                                maxWidth: '360px',
                                minWidth: '220px'
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 16px',
                                    borderRadius: '999px',
                                    border: '1px solid #ccc',
                                    background: '#f9f9f9',
                                    fontSize: '15px'
                                }}
                            />
                            <SearchCourseDropdown keyword={searchInput} courses={searchResults} />
                        </form>

                        {/* User Info / Auth Links */}
                        <div className="d-flex align-items-center gap-2">
                            {isLoggedIn ? (
                                <>
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            whiteSpace: 'nowrap',
                                            color: '#000',
                                            fontSize: '16px',
                                        }}
                                    >
                                        👋 Hello, {fullName}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            background: '#f44336',
                                            color: '#fff',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="edu-btn btn-sm btn-primary"
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            whiteSpace: 'nowrap',
                                            textDecoration: 'none',
                                            border: 'none',
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="edu-btn btn-sm btn-primary"
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            whiteSpace: 'nowrap',
                                            textDecoration: 'none',
                                            border: 'none',
                                        }}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <ResponsiveMenu
                show={offcanvasShow}
                onClose={() => setOffcanvasShow(false)}
            />
        </>
    );
};

export default HeaderTwo;
