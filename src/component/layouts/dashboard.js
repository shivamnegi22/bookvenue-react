import React, { useState } from 'react'
import style from '../../css/dashboard.module.css';
import {RxDashboard} from 'react-icons/rx';
import {BsPerson, BsCheckSquare} from 'react-icons/bs';
import {AiOutlineSetting} from 'react-icons/ai';
import {VscOrganization} from 'react-icons/vsc';
import {IoLogOutOutline} from 'react-icons/io5';
import { MdOutlineArrowDropDown} from 'react-icons/md'
import {RxHamburgerMenu, RxCross1} from 'react-icons/rx'
import { Link, Outlet } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { lazy } from 'react';

const DashboardLayout = () => {
  const [sidebarOpen,setSidebarOpen] = useState(false)
  return (
    <>
        <section>
              <div className='row g-0'>
                  <aside className={`col-lg-2 ${style.customSidebar} ${sidebarOpen ? style.active : ''}`}>
                      <div>
                          <div className={` ${style.sidebarHead}`}>
                          <Link to='/'>
                            <img src={Logo} alt="Book Venue" loading={lazy} height='80'/>
                          </Link>
                          </div>
                          <hr />
                      </div>
                      <div className='ps-2 ps-xxl-3'>
                          <div className={style.sidebarMenu}>
                              <div className={`${style.menuItem} ${style.active}`}>
                                  <Link to='/management/dashboard'><span><RxDashboard className="me-2 me-xxl-3" /> Dashboard</span></Link>
                              </div>
                              <div className={style.menuItem}>
                                  <Link to='/management/dashboard'><span><BsPerson className="me-2 me-xxl-3" /> Profile</span></Link>
                              </div>
                              <div className={style.menuItem}>
                                  <Link to='/management/dashboard'><span><BsCheckSquare className="me-2 me-xxl-3" /> Bookings</span></Link>
                              </div>
                              {/* add accordion here */}
                              <div className={`accordion ${style.sidebarAccordion}`} id="accordionExample">
                                <div className={`accordion-item ${style.menuItem}`}>
                                    <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed btn d-flex align-items-center justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <div className='d-flex align-items-center'>
                                            <AiOutlineSetting className="me-2 me-xxl-3" /> 
                                            Configurations
                                        </div>
                                        <div className={`px-3 ${style.submenuDropdownIcon}`}>
                                            <MdOutlineArrowDropDown/>
                                        </div>
                                    </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className={`accordion-body ${style.sidebarSubMenu} py-0`}>
                                    <ul>
                                            <li>
                                            <Link to='/management/CreateFacility'><span>Add Facility</span></Link>
                                            </li>
                                            <li>
                                            <Link to='/management/addService'><span>Add Services</span></Link>
                                            </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                </div>
                              {/* accordion end */}
                              <div className={style.menuItem}>
                                  <Link to='/management/dashboard'><span><VscOrganization className="me-2 me-xxl-3" /> User Management</span></Link>
                              </div>
                          </div>
                      </div>
                      <div className={style.sidebarFooter}>
                        <div className='ps-3'>
                          <button type='button' className='btn'><IoLogOutOutline className="me-3" /> Logout</button>
                        </div>
                          <hr />
                          <span>© 2023 All Rights Reserved.<br />GIKS INDIA PVT. LTD.</span>
                      </div>
                      {sidebarOpen &&
                      <div className={style.sidebarClose} onClick={()=>{setSidebarOpen(!sidebarOpen)}}>
                        <RxCross1/>
                    </div>
                    }
                  </aside>
                  <div className={`col-12 col-lg-10 px-5 pb-5 pt-lg-5  ${style.sidebarContentWrapper} ${sidebarOpen ? style.customBackdrop : ''}`}>
                    <div className={`${style.sidebarOpen} py-3`}>
                    <button type='button' className={`btn ${style.sidebarOpen}`}  onClick={()=>{setSidebarOpen(!sidebarOpen)}}>
                    <RxHamburgerMenu />
                    </button>
                    </div>
                      <Outlet/>
                  </div>
              </div>
              
        </section>
    </>
  )
}

export default DashboardLayout