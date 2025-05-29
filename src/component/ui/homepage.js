import React, { lazy, useEffect, useState } from 'react'
import { Default } from '../layouts/default'
import LocationAwareMap from '../common/googlemap'
import '../../css/homepage.css'
import { AiFillStar } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import FacilityIcon from '../../assets/addFacility.svg'
import { Link, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import Loader from '../common/loader'
import truncateString from '../../utils/truncateString'

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const IMG_URL = process.env.REACT_APP_IMG_URL;

const Homepage = () => {
  const {allServices, recentFacility} = useLoaderData();
  var count = 0;
  const [isLoading,setIsLoading] = useState(true)
  const [allFacilities,setAllFacilities] = useState([])
  const [locationPermitted,setLocationPermitted] = useState(false)

  useEffect(()=>{
    checkLocationPermission();
  },[])

  const checkLocationPermission = () =>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocationPermitted(true)
        getInitialData({lat:latitude,lng:longitude})
        // You can use latitude and longitude as needed
      }, function(error) {
        getInitialData()
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      });
    } else {
      getInitialData()
    }
  }

  
  const getInitialData = async(coords) =>{
    const getAllFacilities = coords ? axios.get(`${BASE_URL}/get-all-facility`,{params:coords}) : axios.get(`${BASE_URL}/get-all-facility`);
    // you could also use destructuring to have an array of responses
    await axios.all([getAllFacilities]).then(axios.spread(function(res1) {
      setAllFacilities(res1.data.facility);
      setIsLoading(false)
    })).catch((error)=>{
      setIsLoading(false)
      console.log("Error geting initial data:"+error)
    });
  }

  return (<>
    
      <Default>
      <section>
        <div className='customize-map-box-shadow-h'></div>
        <LocationAwareMap 
        markerTitle="Your location"
        height="60vh"
        markers={allFacilities}
        />
      </section>
      {isLoading ?
        <Loader/>
      :
      <>
      <section className='search-wrapper-h py-3'>
      <div className='container'>
        <div className='row'>
          {allServices && allServices.length > 0 ? 
          <>
            {allServices.map((item)=>{
              const ServiceIconURL = item.icon ? item.icon.replace(/\\\//g, '/') : null;
              return (
              <div className={`col-${12 / allServices.length}`}>
            <label className='mb-1'>{item.name}</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2" data-bs-toggle="dropdown">
                {/* <MdSportsTennis className='custom-icons-h'/> */}
                <img src={`${IMG_URL}${ServiceIconURL}`} alt={item?.name} className='me-2' width="20"/>
              </span>
              <div className="dropdown custom-dropdown-h" id="basic-addon2">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"  disabled={item.services?.length > 0 ? false : true}>
                  Type of {item.name}
                </button>
                {item.services?.length > 0 ? 
                <ul className="dropdown-menu">
                  {item.services.map((items,index)=>{
                    const imgURL = items.icon ? items.icon.replace(/\\\//g, '/') : null;
                    return <li key={index}><Link to={`/${item.name}/${items.name}`} className="dropdown-item d-flex align-items-center" href=""><img src={`${IMG_URL}${imgURL}`} alt={items?.name} className='me-2' width="20"/>{items?.name}</Link></li>
                  })}
                </ul>
                : null}
              </div>
            </div>
          </div>
              )
            })}
          </>
          :
          null
        }
        </div>
      </div>
      </section>
      {allFacilities?.length > 0 ?
      <section className='featured-venue-h py-5 mb-5'>
        <div className='container'>
        <h1 className='main-heading'>~Featured Facility {locationPermitted ? " Near You" : null}~</h1>
        <div className='row'>
          {[...Array(4)].map((_,index)=>{
            const imgURL = allFacilities[index].featured_image ? allFacilities[index].featured_image.replace(/\\\//g, '/') : null;
            return (<div className='col-3 venue-cart-container' key={`${allFacilities[index].official_name}-${index}`}>
            <div className="venue-card">
              <div className='venue-card-header'>
              <img src={`${IMG_URL}${imgURL}`} className="card-img-top" alt="venue card" loading={lazy}/>
              <div className='venue-rating'>
                4.5 <AiFillStar className='ms-1'/>
              </div>
              <div className='venue-detail'>
                <h6 className='venue-name'>{allFacilities[index].official_name}</h6>
                <p className='venue-distance'>{ allFacilities[index].distance ? `(${allFacilities[index].distance.toFixed(2)}) Km` : null}</p>
              </div>
              </div>
              <div className="venue-card-body">
              <div className='venue-icons'>
                {allFacilities[index].services && allFacilities[index].services.length > 0 ? allFacilities[index].services.map((services)=>{
                  const iconURL = services.icon ? services.icon.replace(/\\\//g, '/') : null;
                  return (<>
                  <span className='me-3'>
                    <img src={`${IMG_URL}${iconURL}`}  alt={services.name} width='16'/>
                </span>
                </>)
                }) : null}
                </div>
                <p className='venue-description'>
                  {truncateString(allFacilities[index].description,200)}
                </p>
                <Link to={`/facility/${allFacilities[index].slug}`} className='btn venue-booking-btn'>Book Now</Link>
              </div>
            </div>
          </div>)
          })}
        </div>
        </div>
      </section> : null}
      
      <section className='add-facility-h'>
        <div className='container'>
          <div className='row'>
            <div className='col-7 d-flex align-items-center'>
              <div className='facility-content-f p-5'>
                <h2 className='facility-heading-f'>Looking to Add your Facility?</h2>
                <p className='facility-description-f'>Lorem ipsum dolor sit amet consectetur. Imperdiet id sed ut velit odio porttitor. Mi maecenas mauris scelerisque enim non felis elementum.</p>
                <button type='button' className='btn facility-button-f'>Click to Add your Facilities
                  <IoMdAddCircleOutline className='ms-2 add-icon'/>
                </button>
              </div>
            </div>
            <div className='col-5'>
              <div className='add-facility-icon-wrapper-f'>
                <img src={FacilityIcon} alt='Add Facility' className='add-facility-icon-f'  loading={lazy}/>
              </div>
            </div>
          </div>
        </div>
      </section>
      {allServices && allServices.length > 0 ? 
          <section className='recent-add-h'>
          <div className='container'>
          <h2 className='main-heading'>~Recently Added Sports~</h2>
            <div className='row g-3'>
              
              {allServices.map((item)=>{
                return (<>
                {item.services && item.services.length > 0 ? <>
                {item.services.map((items)=>{
                
                if(count > 5) return null;
                count ++;
                console.log(count,'count is this')
                const imgURL = items.featured_image ? items.featured_image.replace(/\\\//g, '/') : null;
                return(<div className='col-2 recent-add-sport-card-wrapper-h' key={`${items.id}-${items.name}`}>
                <div className='recent-add-sport-card-h'>
                  <img src={`${IMG_URL}${imgURL}`} alt={items.name} className='recent-add-sport-img-h mb-3' loading={lazy} width="80"/>
                  <h6 className='recent-add-sport-card-heading-h'>{items.name}</h6>
                  <p className='recent-add-sport-desc-h'>{truncateString(items.description,70)}</p>
                </div>
                </div>)
                })}
                </>
                :
                null}
                </>)
              })}
            </div>
          </div>
        </section>
          :
      null}

      {recentFacility?.length > 0 ? 
      <section className='recent-add-h recent-venue-h pt-5'>
        <div className='container'>
        <h2 className='main-heading pt-5'>~Recently Added Facilities~</h2>
          <div className='row'>
          {recentFacility.map((item,index)=>{
            const imgURL = item.featured_image ? item.featured_image.replace(/\\\//g, '/') : null;
            return(
            <div className='col-4 recent-add-card-wrapper-h' key={`${item.official_name}-${index}`}>
              <div className='recent-add-card-h p-4'>
                <img src={`${IMG_URL}${imgURL}`} alt="facility name" className='recent-add-img-h w-100' loading={lazy}/>
                <h6 className='recent-add-card-heading-h'>{item.official_name}</h6>
                <p className='recent-add-desc-h'>{truncateString(item.description,200)}</p>
              </div>
            </div>)
          })}
          </div>
        </div>
      </section>: null}
      </>
      }     
      {/* end recently added section */}
      </Default>
    </>
    
  )
}

export default Homepage