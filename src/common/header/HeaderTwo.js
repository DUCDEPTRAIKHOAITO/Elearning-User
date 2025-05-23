import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import Nav from './Nav';
import HeaderSticky from './HeaderSticky';
import ResponsiveMenu from './ResponsiveMenu';

const HeaderTwo = ({ styles, disableSticky, searchDisable, buttonStyle }) => {
    const [offcanvasShow, setOffcanvasShow] = useState(false);
    const [searchPopup, setSearchPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const onCanvasHandler = () => {
        setOffcanvasShow(prevState => !prevState);
    };

    const onSearchHandler = () => {
        setSearchPopup(prevState => !prevState);
    };

    useEffect(() => {
        // Lấy username từ localStorage hoặc sessionStorage
        const name =
            localStorage.getItem('username') ||
            sessionStorage.getItem('username') ||
            '';
        if (name) {
            setIsLoggedIn(true);
            setFullName(name);
        } else {
            setIsLoggedIn(false);
            setFullName('');
        }
    }, []);

    if (searchPopup) {
        document.body.classList.add('search-popup-active');
    } else {
        document.body.classList.remove('search-popup-active');
    }

    const sticky = HeaderSticky(200);
    const classes = `header-default ${sticky ? 'sticky' : ''}`;
    const stickyStatus = disableSticky ? '' : ' header-sticky';

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
            setSearchPopup(false);
        }
    };


    return (
        <>
            <header className={`edu-header ${stickyStatus} ${styles || ''} ${classes || ''}`}>
                <div className="row align-items-center">
                    <div className="col-lg-4 col-xl-3 col-md-6 col-6">
                        <div className="logo">
                            <Link to={process.env.PUBLIC_URL + "/"}>
                                <img className="logo-light" src="https://i.pinimg.com/736x/7a/43/dd/7a43dd2411fda8c3685c393dafbc881c.jpg" alt="Main Logo" style={{ width: '250', height: '250' }} />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 d-none d-xl-block">
                        <nav className="mainmenu-nav d-none d-lg-block">
                            <Nav />
                        </nav>
                    </div>

                    <div className="col-lg-8 col-xl-3 col-md-6 col-6">
                        <div className="header-right d-flex justify-content-end">
                            <div className="header-menu-bar">
                                {!searchDisable &&
                                    <div className="quote-icon quote-search">
                                        {/* <button className="white-box-icon search-trigger header-search" onClick={onSearchHandler}>
                                            <i className="ri-search-line"></i>
                                        </button> */}
                                    </div>
                                }
                                <div className="quote-icon quote-user d-none d-md-block ml--15 ml_sm--5">
                                    {isLoggedIn ? (
                                        <span className={`edu-btn btn-medium left-icon header-button ${buttonStyle || ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img src="https://i.pinimg.com/736x/7a/43/dd/7a43dd2411fda8c3685c393dafbc881c.jpg" alt="User Logo" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                                            Helllo, {fullName}
                                            <button
                                                style={{
                                                    marginLeft: '10px',
                                                    padding: '4px 12px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    background: '#f44336',
                                                    color: '#fff',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => {
                                                    localStorage.removeItem('token');
                                                    localStorage.removeItem('userEmail');
                                                    localStorage.removeItem('username');
                                                    sessionStorage.removeItem('token');
                                                    sessionStorage.removeItem('userEmail');
                                                    sessionStorage.removeItem('username');
                                                    window.location.reload();
                                                }}
                                            >
                                                logout
                                            </button>
                                        </span>
                                    ) : (
                                        <Link className={`edu-btn btn-medium left-icon header-button ${buttonStyle || ''}`} to={process.env.PUBLIC_URL + "/login"}>
                                            <img src="https://i.pinimg.com/736x/7a/43/dd/7a43dd2411fda8c3685c393dafbc881c.jpg" alt="Login Logo" style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }} />
                                            Please log in
                                        </Link>
                                    )}
                                </div>
                                <div className="quote-icon quote-search">
                                    <button className="white-box-icon search-trigger header-search" onClick={onSearchHandler}>
                                        <i className="ri-search-line"></i>
                                    </button>
                                     {/* {searchPopup && (
                                        <form onSubmit={handleSearchSubmit} style={{ position: 'absolute', right: 0, top: '48px', zIndex: 1000, background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #ccc', padding: '10px', minWidth: '220px' }}>
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm khóa học..."
                                                value={searchInput}
                                                onChange={e => setSearchInput(e.target.value)}
                                                autoFocus
                                                style={{ width: '100%', padding: '6px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                            />
                                        </form>
                                    )} */}
                                </div>
                                <div className="quote-icon quote-user d-block d-md-none ml--15 ml_sm--5">
                                    <Link to={process.env.PUBLIC_URL + "/login"} className="white-box-icon" href="#">
                                        <i className="ri-user-line"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="mobile-menu-bar ml--15 ml_sm--5 d-block d-xl-none">
                                <div className="hamberger">
                                    <button className="white-box-icon hamberger-button header-menu" onClick={onCanvasHandler}>
                                        <i className="ri-menu-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <ResponsiveMenu
                show={offcanvasShow}
                onClose={onCanvasHandler}
                showSearch={searchPopup}
                onSearch={onSearchHandler}
            />
        </>
    );
};

export default HeaderTwo;