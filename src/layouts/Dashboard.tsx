import { useRef } from 'react'
import './dashboard.css'
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../ProtectedRoute';


const Dashboard = () => {
    const arrowProcesos = useRef<HTMLButtonElement | null>(null);
    const arrowRegistros = useRef<HTMLButtonElement | null>(null);
    const arrowAdmin = useRef<HTMLButtonElement | null>(null);
    const menu = useRef<HTMLDivElement | null>(null);
    const sideBar = useRef<HTMLDivElement | null>(null);



    const handleArrowClick = (arrowRef: React.RefObject<HTMLButtonElement> | null) => {
        if (arrowRef !== null && arrowRef.current) {
            const parentElement = arrowRef.current.parentElement?.parentElement;
            if (parentElement) {
                parentElement.classList.toggle("showMenu");
                console.log(parentElement)
            }
        }
    };

    //Menu desplegable del usuario
    const handleToggleMenu = (menuRef: React.RefObject<HTMLDivElement>) => () => {
        if (menuRef.current) {
            menuRef.current.classList.toggle('active');
        }
    }

    const handleSideBarBTN = (sideBarRef: React.RefObject<HTMLDivElement>) => {
        console.log('sideabar')
        if (sideBarRef.current) {
            sideBarRef.current.classList.toggle('close');
        }
    };

    const { usuario, cerrarSesion } = useAuth()

    interface MenuItem {
        name: string;
        icon: string;
        sublinks: {
            name: string;
            link: string;
        }[];
        color: string;
        rol: ('administrador' | 'vendedor')[];
        handleArrowClick: React.RefObject<HTMLButtonElement> | null;
    }


    const menuItems: MenuItem[] = [
        {
            name: "Dashboard",
            icon: "bx bx-grid-alt dashboard-icon",
            sublinks: [{ name: "Dashboard", link: "#" }],
            color: "blue",
            rol: ['administrador'],
            handleArrowClick: null,
        },
        {
            name: "Procesos",
            icon: "bx bx-collection procesos-icon",
            sublinks: [
                { name: "Ventas", link: "/procesos/ventas" },
                { name: "Planillaje", link: "/procesos/planillaje" },
            ],
            handleArrowClick: arrowProcesos,
            rol: ['vendedor'],
            color: "green",
        },
        {
            name: "Registros",
            icon: "bx bx-add-to-queue registros-icon",
            sublinks: [
                { name: "Localidades", link: "/registros/localidades" },
                { name: "Rutas", link: "/registros/rutas" },
                { name: "Conductores", link: "/registros/conductores" },
                { name: "Propietarios", link: "/registros/propietarios" },
                { name: "Vehiculos", link: "/registros/vehiculos" },
                { name: "Agencias", link: "/registros/agencias" },
                { name: "Vendedores", link: "/registros/vendedores" },
                { name: "Administradores", link: "/registros/administradores" },
            ],
            handleArrowClick: arrowRegistros,
            rol: ['administrador'],
            color: "red",
        },
        {
            name: "Reportes",
            icon: "bx bx-pie-chart-alt-2 estadisticas-icon",
            sublinks: [{ name: "Reportes", link: "#" }],
            color: "purple",
            rol: ['administrador'],
            handleArrowClick: null,
        },
        {
            name: "Admin",
            icon: "bx bx-key administrador-icon",
            sublinks: [
                { name: "Admin 1", link: "#" },
                { name: "Admin 2", link: "#" },
            ],
            handleArrowClick: arrowAdmin,
            rol: ['administrador'],
            color: "orange",
        },
        {
            name: "Configurar",
            icon: "bx bx-cog configurar-icon",
            sublinks: [{ name: "Configurar", link: "#" }],
            color: "pink",
            rol: ['administrador', 'vendedor'],
            handleArrowClick: null,
        },
    ];



    return (
        <ProtectedRoute>
            <div ref={sideBar} className="sidebar">

                <div className="logo-details">
                    <i className='bx bxs-bus'></i>
                    <span className="logo_name">SafeBus</span>
                </div>

                <ul className="nav-links">
  {menuItems
    .filter((menuItem) => {
      // Verifica si usuario existe y si su rol está permitido en menuItem.rol
      return usuario ? menuItem.rol.includes(usuario.rol) : true;
    })
    .map((menuItem, index) => (
      <li key={index}>
        {menuItem.sublinks.length > 0 ? (
          <div className="icon-link">
            <a href="#">
              <i className={menuItem.icon}></i>
              <span className="link_name">{menuItem.name}</span>
            </a>
            {menuItem.handleArrowClick && (
              <i
                ref={menuItem.handleArrowClick}
                onClick={() => {
                  handleArrowClick(menuItem.handleArrowClick);
                }}
                className="bx bxs-chevron-down arrow"
              ></i>
            )}
          </div>
        ) : (
          <a href="#">
            <i className={menuItem.icon}></i>
            <span className="link_name">{menuItem.name}</span>
          </a>
        )}
        {menuItem.sublinks.length > 0 && (
          <ul className="sub-menu">
            {menuItem.sublinks.map((sublink, subIndex) => (
              <li key={subIndex}>
                <Link to={sublink.link}>{sublink.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
</ul>





            </div>

            <section className="home-section">
                <div className="home-content">
                    <i onClick={() => { handleSideBarBTN(sideBar) }} className='bx bx-menu'></i>

                    <div className="action" >
                        <div className="profile" onClick={handleToggleMenu(menu)} >
                            <img src="https://avatars.githubusercontent.com/u/71569136?s=400&u=2e359df633e9b41446484680f36f8c36943dd7fc&v=4" alt="Foto Perfil" />
                        </div>
                        <div ref={menu} className="menu">
                            <h3>{`${usuario?.nombres} ${usuario?.apellidos}`} <br /><span>{usuario?.rol}</span></h3>
                            <ul>
                                <li>
                                    <i className='bx bx-user-circle'></i>
                                    <a href="#">Mi perfil</a>
                                </li>

                                <li>
                                    <i className='bx bx-edit' ></i>
                                    <a href="#">Editar perfil</a>
                                </li>

                                <li>
                                    <i className='bx bx-envelope' ></i>
                                    <a href="#">Mensajes</a>
                                </li>

                                <li>
                                    <i className='bx bx-cog' ></i>
                                    <a href="#">Configuracion</a>
                                </li>

                                <li>
                                    <i className='bx bx-help-circle' ></i>
                                    <a href="#">Ayuda</a>
                                </li>

                                <li>
                                    <i className='bx bx-log-out-circle' ></i>
                                    <a href="#" onClick={() => { cerrarSesion() }}>Cerrar sesión</a>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>

                <div className="main-content">
                    <Outlet />

                </div>
            </section>
        </ProtectedRoute>
    )
}

export default Dashboard