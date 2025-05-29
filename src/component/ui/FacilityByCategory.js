import React, { lazy } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { Default } from '../layouts/default';
import Nodatafound from '../common/nodatafound';
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import truncateString from '../../utils/truncateString';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const FacilityByCategory = () => {

    const {facility} = useLoaderData()
    const facilities =  facility;
    
    const {service} = useParams();

    return ( <Default>
                    {
                    facilities.length > 0 ? 
                    <>
          <section className='featured-venue-h py-5 mb-5'>
            <div className='container'>
            <h2 className='main-heading'>~Featured Facility for {service}~</h2>
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
                    {item.distance ? <p className='venue-distance'>(~{Math.round(item.distance * 100) / 100} Km)</p> : null}
                    
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
      )
}

export default FacilityByCategory