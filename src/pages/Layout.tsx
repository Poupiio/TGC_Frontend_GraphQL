import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
   return (
      <main className="main-content">
         <Header />

         {/* Outlet sert à changer dynamiquement la page par rapport à ce qui est entré dans l'URL */}
         <Outlet />
      </main>
   );
};

export default Layout;