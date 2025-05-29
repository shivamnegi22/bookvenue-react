import React, { lazy, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../common/loader';
import { Default } from '../layouts/default';
import Nodatafound from '../common/nodatafound';
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from 'axios';
import truncateString from '../../utils/truncateString';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const IMG_URL = process.env.REACT_APP_IMG_URL;

const SearchResult = () => {
    const { locationName } = useParams();
    const {state} = useLocation();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [facilities,setFacilities] = useState([]);

    const getFacilities = async ({lat,lng}) =>{
        await axios.post( `${BASE_URL}/searchLocation`, {lat,lng})
      .then((response) => {
        setFacilities(response.data.facility)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
      });
    }
    


    useEffect(() => {
        if(state){
            let {lat , lng} = state;
            getFacilities({lat , lng})
        }
        else{
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                locationName
              )}&key=${googleMapsApiKey}`;
            fetch(apiUrl).then((response) => response.json()).then((data) => {
            if (data.status === 'OK') {
              // Geocoding was successful
              const firstResult = data.results[0];
              getFacilities({lat : firstResult.geometry.location.lat , lng : firstResult.geometry.location.lng})
            } else {
                navigate('/')
            }
          })
          .catch(() => {
            navigate('/')
          });

        }

      }, [locationName]);
    
  return (
    <>
    {
        isLoading ?
        <>
        <Loader/>
        </>
        :
        <>
            <Default>
                {
                facilities.length > 0 ? 
                <>
      <section className='featured-venue-h py-5 mb-5'>
        <div className='container'>
        <h2 className='main-heading'>~Search Result~</h2>
        <div className='row'>
          {facilities.map((item,index)=>{
            const imgURL = item.featured_image.replace(/\\\//g, '/');
            return (<div className='col-4 venue-cart-container mb-5' key={`${item.official_name}-${index}`}>
            <div className="venue-card">
              <div className='venue-card-header'>
              <img src={`${IMG_URL}${imgURL}`} className="card-img-top" alt="venue card" loading={lazy}/>
              <div className='venue-rating'>
                4.5 <AiFillStar className='ms-1'/>
              </div>
              <div className='venue-detail'>
                <h6 className='venue-name'>{item.official_name}</h6>
                <p className='venue-distance'>(~{Math.round(item.distance * 100) / 100} Km)</p>
              </div>
              </div>
              <div className="venue-card-body">
              <div className='venue-icons'>
              {item.services && item.services.length > 0 ? item.services.map((services)=>{
                  const iconURL = services.icon ? services.icon.replace(/\\\//g, '/') : null;
                  return (<>
                  <span className='me-3'>
                    <img src={`${IMG_URL}${iconURL}`}  alt={services.name} width='16'/>
                </span>
                </>)
                }) : null}
                </div>
                <p className='venue-description'>
                  {truncateString(item.description,200)}
                </p>
                <Link to={`/facility/${item.slug}`} className='btn venue-booking-btn'>Book Now</Link>
              </div>
            </div>
          </div>)
          })}
        </div>
        </div>
      </section>
                </>
                :
                <>  
                    <Nodatafound/>
                </>
                }
            </Default>
        </> 
    }
    </>
  )
}

export default SearchResult