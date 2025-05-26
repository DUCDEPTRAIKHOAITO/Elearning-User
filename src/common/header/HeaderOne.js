import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import HeaderSticky from './HeaderSticky';
import ResponsiveMenu from './ResponsiveMenu';
import SearchCourseDropdown from '../../components/search/SearchCourseDropdown';

const HeaderOne = ({ styles, disableSticky }) => {
    const [offcanvasShow, setOffcanvasShow] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const onCanvasHandler = () => setOffcanvasShow(prev => !prev);

    useEffect(() => {
        const name = localStorage.getItem('username') || sessionStorage.getItem('username') || '';
        setUsername(name);
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchInput.trim()) {
                fetch(`http://localhost:8080/api/courses/search?keyword=${searchInput.trim()}`)
                    .then(res => res.json())
                    .then(data => setSearchResults(data))
                    .catch(err => console.error("Search error:", err));
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [searchInput]);

    const sticky = HeaderSticky(118);
    const classes = sticky ? 'sticky' : '';
    const stickyStatus = disableSticky ? '' : ' header-sticky';

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
            <header className={`edu-header disable-transparent ${stickyStatus} ${styles || ''} ${classes}`}>
                <div className="container">
                    <div className="row align-items-center">
                        {/* Logo */}
                        <div className="col-lg-2 col-xl-2 col-md-6 col-6">
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

                        {/* Menu */}
                        <div className="col-lg-6 d-none d-xl-block">
                            <nav className="mainmenu-nav d-none d-lg-block">
                                <Nav />
                            </nav>
                        </div>

                        {/* Search + Hello + Logout */}
                        <div className="col-lg-4 col-md-6 col-6 d-flex align-items-center justify-content-end gap-3">
                            {/* Tìm kiếm (bọc trong relative để dropdown không làm nhảy layout) */}
                            <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm khóa học..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '14px 20px',
                                            borderRadius: '999px',
                                            border: '1px solid #ccc',
                                            background: '#fff',
                                            fontSize: '18px',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                                            zIndex: 1,
                                        }}
                                    />
                                </form>

                                {/* Dropdown kết quả KHÔNG làm nhảy header */}
                                {searchInput && searchResults.length > 0 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            width: '100%',
                                            marginTop: '6px',
                                            zIndex: 9999,
                                        }}
                                    >
                                        <SearchCourseDropdown
                                            keyword={searchInput}
                                            courses={searchResults}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Hello + Logout */}
                            {username && (
                                <div className="d-flex align-items-center gap-2" style={{ whiteSpace: 'nowrap' }}>
                                    <span style={{
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        color: '#000'
                                    }}>
                                        👋 Hello, {username}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#f44336',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                            {/* Mobile menu */}
                            <div className="hamberger quote-icon d-block d-xl-none">
                                <button className="hamberger-button" onClick={onCanvasHandler}>
                                    <i className="ri-menu-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <ResponsiveMenu
                show={offcanvasShow}
                onClose={onCanvasHandler}
            />
        </>
    );
};

export default HeaderOne;
