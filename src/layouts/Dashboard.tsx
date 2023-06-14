import { useEffect } from 'react'
import './dashboard.css'
import { Link, Outlet } from 'react-router-dom';


const Dashboard = () => {
  
    useEffect(() => {
        const handleArrowClick = (e: Event) => {
          const arrowParent = (e.target as HTMLElement).parentElement?.parentElement;
          console.log(arrowParent);
          if (arrowParent) {
            arrowParent.classList.toggle("showMenu");
          }
        };
    
        const handleSidebarBtnClick = () => {
          const sidebar = document.querySelector(".sidebar");
          if (sidebar) {
            sidebar.classList.toggle("close");
          }
        };
    
        const arrowList = document.querySelectorAll('.arrow');
        arrowList.forEach((arrow) => {
          arrow.addEventListener('click', handleArrowClick);
        });
    
        const sidebarBtn = document.querySelector(".bx-menu");
        if (sidebarBtn) {
          sidebarBtn.addEventListener("click", handleSidebarBtnClick);
        }
    
        return () => {
          arrowList.forEach((arrow) => {
            arrow.removeEventListener('click', handleArrowClick);
          });
    
          if (sidebarBtn) {
            sidebarBtn.removeEventListener("click", handleSidebarBtnClick);
          }
        };
      }, []);

  return (
        <>
            <div className="sidebar">

                <div className="logo-details">
                    <i className='bx bxs-bus'></i>
                    <span className="logo_name">SafeBus</span>
                </div>


                <ul className="nav-links">


                <li>
                        <a href="#">
                        <i className='bx bx-grid-alt dashboard-icon'></i>
                            <span className="link_name">Dashboard</span>
                        </a>

                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Dashboard</a></li>
                        </ul>
                    </li>


                    <li>
                        <div className="icon-link">
                            <a href="#">
                                <i className='bx bx-collection procesos-icon'></i>
                                <span className="link_name">Procesos</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow'></i>
                        </div>

                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Procesos</a></li>
                            <li><Link to={"/procesos/ventas"}>Ventas</Link></li>
                            <li><a href="#">Proceso 2</a></li>
                        </ul>
                    </li>


                    <li>
                        <div className="icon-link">
                            <a href="#">
                                <i className='bx bx-add-to-queue registros-icon'></i>
                                <span className="link_name">Registros</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow'></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Registros</a></li>

                            <li> <Link to={"/registros/localidades"}>Localidades</Link> </li>
                            <li><Link to="/registros/rutas">Rutas</Link></li>
                            <li><Link to="/registros/conductores">Conductores</Link></li>
                            <li><Link to="/registros/propietarios">Propietarios</Link></li>
                            <li><Link to="/registros/vehiculos">Vehiculos</Link></li>
                            <li><Link to="/registros/agencias">Agencias</Link></li>
                            <li><Link to="/registros/vendedores">Vendedores</Link></li>
                        </ul>

                    </li>

                    <li>
                        <a href="#">
                            <i className='bx bx-pie-chart-alt-2 estadisticas-icon'></i>
                            <span className="link_name">Reportes</span>
                        </a>

                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Reportes</a></li>
                        </ul>
                    </li>


                    <li>
                        <div className="icon-link">
                            <a href="#">
                                <i className='bx bx-key administrador-icon' ></i>
                                <span className="link_name">Admin</span>
                            </a>
                            <i className='bx bxs-chevron-down arrow'></i>
                        </div>
                        <ul className="sub-menu">
                            <li><a className="link_name" href="#">Administrador</a></li>
                            <li><a href="#">Admin 1</a></li>
                            <li><a href="#">Admin 2</a></li>
                        </ul>

                    </li>


                    <li>
                        <a href="#">
                            <i className='bx bx-cog configurar-icon'></i>
                            <span className="link_name">Configurar</span>
                        </a>

                        <ul className="sub-menu blank">
                            <li><a className="link_name" href="#">Configurar</a></li>
                        </ul>
                    </li>


                </ul>


            </div>

            <section className="home-section">
                <div className="home-content">
                    <i className='bx bx-menu'></i>
                    {/* <span className="text">🚧 Navbar 🚧</span> */}
                </div>

                <div className="main-content">
                    <Outlet />

                </div>
            </section></>
    )
}

export default Dashboard