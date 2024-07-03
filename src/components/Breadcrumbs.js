// // src/components/Breadcrumbs.js
// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import './Breadcrumbs.css';

// const Breadcrumbs = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <div className="breadcrumb">
//       <Link to="/" className={`breadcrumb__step ${pathnames.length === 0 ? 'breadcrumb__step--active' : ''}`}>Home</Link>
//       {pathnames.map((value, index) => {
//         const to = `/${pathnames.slice(0, index + 1).join('/')}`;
//         const isLast = index === pathnames.length - 1;
//         return (
//           <Link key={to} to={to} className={`breadcrumb__step ${isLast ? 'breadcrumb__step--active' : ''}`}>
//             {value}
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default Breadcrumbs;
