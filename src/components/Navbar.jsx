// import React, { useState, useEffect } from 'react';
// import '../styles/Navbar.css';

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
    
//     // Close menu when resizing to desktop
//     const handleResize = () => {
//       if (window.innerWidth > 768 && menuOpen) {
//         setMenuOpen(false);
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [menuOpen]);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
  
//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       const menu = document.querySelector('.navbar-menu');
//       const toggle = document.querySelector('.navbar-toggle');
      
//       if (menuOpen && menu && toggle && 
//           !menu.contains(e.target) && 
//           !toggle.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     };
    
//     if (menuOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuOpen]);

//   // Prevent body scroll when menu is open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
    
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [menuOpen]);

//   return (
//     <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
//       <div className="navbar-container">
//         <div className="navbar-logo">
//           <span>TRAVIS</span>
//         </div>
        
//         <div 
//           className={`navbar-toggle ${menuOpen ? 'active' : ''}`} 
//           onClick={toggleMenu}
//           aria-expanded={menuOpen}
//           aria-label="Toggle navigation menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>

//         <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
//           {/* <li><a href="#models" onClick={() => setMenuOpen(false)}>Models</a></li> */}
//           <li><a href="#about-project" onClick={() => setMenuOpen(false)}>About Project</a></li>
//           <li><a href="#about-us" onClick={() => setMenuOpen(false)}>About Us</a></li>
//           <li><a href="#documentation" onClick={() => setMenuOpen(false)}>Documentation</a></li>
//           <li>
//             <a 
//               href="/login" 
//               className="get-started-btn"
//               rel="noopener noreferrer"
//               onClick={() => setMenuOpen(false)}
//             >
//               Get Started
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Close menu when resizing to desktop
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector('.navbar-menu');
      const toggle = document.querySelector('.navbar-toggle');
      
      if (menuOpen && menu && toggle && 
          !menu.contains(e.target) && 
          !toggle.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>TRAVIS</span>
        </div>
        
        <div 
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#models" onClick={() => setMenuOpen(false)}>Models</a></li>
          <li><a href="#about-project" onClick={() => setMenuOpen(false)}>About Project</a></li>
          <li><a href="#about-us" onClick={() => setMenuOpen(false)}>About Us</a></li>
          <li><a href="#documentation" onClick={() => setMenuOpen(false)}>Documentation</a></li>
          <li>
            <a 
              href="/login" 
              className="get-started-btn"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;