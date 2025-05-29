import { Default } from '../layouts/default'
import '../../css/single.css'
import Calendar from 'react-calendar';
import { AiFillStar } from 'react-icons/ai'
import LocationAwareMap from '../common/googlemap';
import { Galleria } from 'primereact/galleria';
import Loader from '../common/loader';
import Nodatafound from '../common/nodatafound';
import { Toast } from 'primereact/toast';

import { lazy, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const IMG_URL = process.env.REACT_APP_IMG_URL;

const NewSingle = () => {
    const data = useLoaderData()
    console.log(data,'data is this')
    const { slug } = useParams();
    const [isLoading,setIsLoading] = useState(true);
    const [facility,setFacility] = useState(null);
    const toast = useRef(null);
    const [galleryImages,setGalleryImages] = useState([])

          
    const getFacilityBySlug = async ({slug}) =>{
        await axios.get( `${BASE_URL}/get-facility-by-slug/${slug}`)
      .then((response) => {
        if(response.data.facility){
            let facilityResponse = response.data.facility;
        
            if(facilityResponse.featured_image){

            let imagesCopy = [ response.data.facility.featured_image ]

            if(response.data.facility.services && response.data.facility.services.length > 0){
                response.data.facility.services.map((item)=>{
                    let otherImages = item.featured_image;
                    if(otherImages) imagesCopy = [...imagesCopy,otherImages];
                })
            }

            setGalleryImages(imagesCopy);

            }
            
            setFacility(response.data.facility)
        }
        
        setIsLoading(false)
      })
      .catch((err) => {

        console.log(err);
        setIsLoading(false)
      });
    }
    
    useEffect(() => {   
        getFacilityBySlug({slug})
      }, [slug]);

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        let imgUrl = item.replace(/[\\"]/g, '');
        return <div className='carousel-img-wrapper-si'>
        <img src={`${IMG_URL}${imgUrl}`} alt={facility.official_name} className='carousel-img-si img-fluid' loading={lazy}/>
        <div className='img-overlay-si'>
            <h4 className='overlay-title-si'>{facility.official_name}</h4>
        </div>
    </div>;
    }

    const thumbnailTemplate = (item) => {
        let imgUrl = item.replace(/[\\"]/g, '');
        return <div className='carousel-img-wrapper-si'>
        <img src={`${IMG_URL}${imgUrl}`} alt={facility.official_name} className='carousel-img-si img-fluid' loading={lazy} />
        <div className='img-overlay-si'>
            <h4 className='overlay-title-si'>{facility.official_name}</h4>
        </div>
    </div>;
    }

    if(isLoading){
        return <Loader/>;
    }

    if(facility){
        return (
                <>
                <Toast ref={toast} position="bottom-right" />
                <Default>
                <section className='container single-page-container mt-3'>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            <h3 className='title-heading-si m-0'>{facility?.official_name}</h3>
                        </div>
                        <div className='col-8 img-carousel-container-si'>
                        <div className='pb-1'>
                            <Galleria 
                                value={galleryImages} 
                                responsiveOptions={responsiveOptions} 
                                numVisible={4} 
                                style={{ maxWidth: '100%' }} 
                                item={itemTemplate} 
                                thumbnail={thumbnailTemplate} 
                                circular 
                                autoPlay 
                                transitionInterval={3000} 
                                thumbnailsPosition="right"
                            />
                        </div>
                        <div className='card mt-4'>
                            <div className='d-flex px-4 py-3 align-items-center described-si'>
                            <p className='m-0 location-name-si'>
                                {facility.address}
                            </p>
            
                            <h6 className='rating-icon-si ms-4'>
                                <AiFillStar className='me-1'/>
                                4.5
                            </h6>
                            <span className='mx-4 rating-text-si'>(18 ratings)</span>
                            <span>
                                <a  className='rate-venue-si'>Rate Venue</a>
                            </span>
                            </div>
                        </div>
                        {facility.services.length > 0 ?  
                        <div className='mt-5 nav-tabs-si'>
                        <ul className="nav nav-tabs" id="singlePageTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                Overview
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-capitalize" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                Available {facility.category}
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Amenities</button>
                        </li>
                        </ul>
                        <div className="tab-content" id="singlePageTabContent">
        
                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                        <div className='tab-container-si'>
                            <h4 className='heading-si'>About the {facility.category}</h4>
                            <p className='desc-si'>{facility.description}</p>
                            <h4 className='heading-si'>Location Map</h4>
                            <LocationAwareMap height="40vh" coords={{lat:parseFloat(facility.lat),lng:parseFloat(facility.lng)}}/>
                        </div>
                        </div>
        
                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                        <div className='tab-container-si'>
                        <h4 className='heading-si text-capitalize'>{facility.category}</h4>
                        {facility.services.length > 0 ? <>
                        {facility.services.map((item,ind)=>{
                            const iconURL = item.icon ? item.icon.replace(/\\\//g, '/') : null;
                            return (<p className='mb-3 desc-si' key={item.name + ind}>
                            <span className='me-2 icon-si'>
                            <img src={`${IMG_URL}${iconURL}`}  alt={item.name} width='16'/>
                            </span>
                            <span className='text-capitalize'>{item.name}</span>
                            </p>)
                        })}
                        </> : null}
                        </div>
                        </div>
                        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                        <div className='tab-container-si'>
                        <h4 className='heading-si'>Amenities</h4>
                                <p className='mb-3 desc-si'>
                                <span className='me-2 icon-si'>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_115_1011)">
                                <path d="M6.875 26.25V18.125H6.25C5.5625 18.125 5 17.5625 5 16.875V11.25C5 9.875 6.125 8.75 7.5 8.75H11.25C12.625 8.75 13.75 9.875 13.75 11.25V16.875C13.75 17.5625 13.1875 18.125 12.5 18.125H11.875V26.25C11.875 26.9375 11.3125 27.5 10.625 27.5H8.125C7.4375 27.5 6.875 26.9375 6.875 26.25ZM22.5 26.25V20H24.5125C25.3625 20 25.9625 19.1625 25.7 18.35L23.075 10.4625C22.725 9.4375 21.775 8.75 20.7 8.75H20.55C19.475 8.75 18.5125 9.4375 18.175 10.4625L15.55 18.35C15.275 19.1625 15.875 20 16.7375 20H18.75V26.25C18.75 26.9375 19.3125 27.5 20 27.5H21.25C21.9375 27.5 22.5 26.9375 22.5 26.25ZM9.375 7.5C10.7625 7.5 11.875 6.3875 11.875 5C11.875 3.6125 10.7625 2.5 9.375 2.5C7.9875 2.5 6.875 3.6125 6.875 5C6.875 6.3875 7.9875 7.5 9.375 7.5ZM20.625 7.5C22.0125 7.5 23.125 6.3875 23.125 5C23.125 3.6125 22.0125 2.5 20.625 2.5C19.2375 2.5 18.125 3.6125 18.125 5C18.125 6.3875 19.2375 7.5 20.625 7.5Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_115_1011">
                                <rect width="30" height="30" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </span>
                                <span className='text-si'>
                                Washroom
                                </span>
                                <span className='ms-2 icon-si'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_310_3205)">
                                <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#50B748"/>
                                <path d="M12.1042 19.7641C12.296 19.727 12.4866 19.6842 12.6759 19.6358C12.9968 19.5461 13.313 19.4404 13.6234 19.3191C13.9341 19.1989 14.2387 19.0631 14.5359 18.9125C14.8332 18.7612 15.1227 18.5952 15.4034 18.415C15.6838 18.2347 15.9549 18.0406 16.2159 17.8333C16.4773 17.6257 16.7282 17.4052 16.9676 17.1725C17.2065 16.9404 17.4338 16.6964 17.6484 16.4416C17.8632 16.1866 18.0651 15.921 18.2534 15.6458C18.4416 15.3711 18.616 15.0871 18.7759 14.795C18.9358 14.5024 19.081 14.202 19.2109 13.895C19.3409 13.5878 19.4555 13.2744 19.5542 12.9558C19.6388 12.6769 19.711 12.3944 19.7709 12.1091L13.8292 6.16831C13.3275 5.66431 12.731 5.26452 12.0741 4.99193C11.4172 4.71934 10.7129 4.57934 10.0017 4.57997C9.2899 4.5792 8.58494 4.71912 7.92737 4.9917C7.26979 5.26429 6.67258 5.66415 6.17006 6.16831C5.66628 6.67098 5.2666 7.26809 4.99389 7.92544C4.72118 8.58279 4.58081 9.28747 4.58081 9.99914C4.58081 10.7108 4.72118 11.4155 4.99389 12.0728C5.2666 12.7302 5.66628 13.3273 6.17006 13.83L12.1042 19.7641Z" fill="#10A711"/>
                                <path d="M10.0008 4.5808C11.3858 4.5808 12.7708 5.10997 13.8308 6.16913C14.3345 6.67181 14.7342 7.26891 15.0069 7.92626C15.2796 8.58361 15.42 9.28829 15.42 9.99997C15.42 10.7116 15.2796 11.4163 15.0069 12.0737C14.7342 12.731 14.3345 13.3281 13.8308 13.8308C13.3281 14.3346 12.731 14.7343 12.0736 15.007C11.4163 15.2797 10.7116 15.4201 9.99992 15.4201C9.28825 15.4201 8.58356 15.2797 7.92621 15.007C7.26887 14.7343 6.67176 14.3346 6.16909 13.8308C5.6653 13.3281 5.26562 12.731 4.99291 12.0737C4.72021 11.4163 4.57983 10.7116 4.57983 9.99997C4.57983 9.28829 4.72021 8.58361 4.99291 7.92626C5.26562 7.26891 5.6653 6.67181 6.16909 6.16913C6.67161 5.66497 7.26882 5.26511 7.92639 4.99253C8.58396 4.71995 9.28892 4.58002 10.0008 4.5808ZM12.4674 8.33247C12.3885 8.34002 12.3134 8.36978 12.2508 8.4183L9.20575 10.7016L7.79492 9.29163C7.48909 8.9733 6.88659 9.57497 7.20575 9.8808L8.87242 11.5475C8.94467 11.6158 9.03833 11.657 9.13751 11.6642C9.2367 11.6713 9.3353 11.6439 9.41659 11.5866L12.7499 9.08663C13.0299 8.88247 12.8574 8.3383 12.5108 8.3333C12.4966 8.33258 12.4824 8.33258 12.4683 8.3333L12.4674 8.33247Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_310_3205">
                                <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </span>
                                </p>
                                <p className='mb-3 desc-si'>
                                <span className='me-2 icon-si'>
                                <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6719 4.23438C13.4375 4.46876 7.53125 10.4688 7.53125 15.4375C7.4548 16.3364 7.56586 17.2415 7.85741 18.0952C8.14896 18.949 8.61464 19.7329 9.22495 20.3974C9.83526 21.0618 10.5769 21.5922 11.4029 21.9551C12.2289 22.3179 13.1213 22.5053 14.0234 22.5053C14.9256 22.5053 15.818 22.3179 16.644 21.9551C17.47 21.5922 18.2116 21.0618 18.8219 20.3974C19.4322 19.7329 19.8979 18.949 20.1895 18.0952C20.481 17.2415 20.5921 16.3364 20.5156 15.4375C20.5156 10.4688 14.6094 4.51563 14.375 4.23438C14.331 4.18451 14.2769 4.14456 14.2163 4.1172C14.1557 4.08983 14.0899 4.07568 14.0234 4.07568C13.9569 4.07568 13.8912 4.08983 13.8306 4.1172C13.77 4.14456 13.7159 4.18451 13.6719 4.23438ZM15.875 18.625C16.6129 18.2262 17.2041 17.6021 17.5625 16.8438C17.624 16.7523 17.7159 16.6855 17.8218 16.655C17.9277 16.6245 18.041 16.6323 18.1418 16.6771C18.2425 16.7219 18.3243 16.8007 18.3726 16.8998C18.421 16.9988 18.4329 17.1118 18.4063 17.2188C17.9691 18.1528 17.247 18.9242 16.3438 19.4219H16.1094C16.0254 19.4052 15.9477 19.3659 15.8845 19.3081C15.8213 19.2504 15.7752 19.1765 15.751 19.0944C15.7269 19.0123 15.7256 18.9251 15.7475 18.8424C15.7694 18.7597 15.8135 18.6845 15.875 18.625Z" fill="black"/>
                                <path d="M2.28125 14.4062L4.15625 12.0625H2.79688C3.0428 9.35592 4.26019 6.82986 6.22404 4.9512C8.18788 3.07255 10.7654 1.9683 13.4802 1.84256C16.195 1.71682 18.8636 2.57809 20.9927 4.26718C23.1218 5.95627 24.5674 8.35899 25.0625 11.0312L26 10.8906C25.4744 7.97918 23.9078 5.35831 21.5923 3.51683C19.2767 1.67536 16.3704 0.73903 13.4154 0.882478C10.4604 1.02593 7.65844 2.23936 5.53216 4.29645C3.40588 6.35355 2.10046 9.11384 1.85938 12.0625H0.40625L2.28125 14.4062ZM23.8438 13.9375H25.2031C24.9572 16.6441 23.7398 19.1701 21.776 21.0488C19.8121 22.9274 17.2346 24.0317 14.5198 24.1574C11.805 24.2832 9.1364 23.4219 7.00731 21.7328C4.87822 20.0437 3.43255 17.641 2.9375 14.9687L2 15.1094C2.52556 18.0208 4.0922 20.6417 6.40773 22.4832C8.72326 24.3246 11.6296 25.261 14.5846 25.1175C17.5396 24.9741 20.3416 23.7606 22.4678 21.7035C24.5941 19.6464 25.8995 16.8862 26.1406 13.9375H27.5938L25.7188 11.5937L23.8438 13.9375Z" fill="black"/>
                                </svg>  
                                </span>
                                <span className='text-si'>
                                Drinking Water
                                </span>
                                <span className='ms-2 icon-si'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_310_3205)">
                                <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#50B748"/>
                                <path d="M12.1042 19.7641C12.296 19.727 12.4866 19.6842 12.6759 19.6358C12.9968 19.5461 13.313 19.4404 13.6234 19.3191C13.9341 19.1989 14.2387 19.0631 14.5359 18.9125C14.8332 18.7612 15.1227 18.5952 15.4034 18.415C15.6838 18.2347 15.9549 18.0406 16.2159 17.8333C16.4773 17.6257 16.7282 17.4052 16.9676 17.1725C17.2065 16.9404 17.4338 16.6964 17.6484 16.4416C17.8632 16.1866 18.0651 15.921 18.2534 15.6458C18.4416 15.3711 18.616 15.0871 18.7759 14.795C18.9358 14.5024 19.081 14.202 19.2109 13.895C19.3409 13.5878 19.4555 13.2744 19.5542 12.9558C19.6388 12.6769 19.711 12.3944 19.7709 12.1091L13.8292 6.16831C13.3275 5.66431 12.731 5.26452 12.0741 4.99193C11.4172 4.71934 10.7129 4.57934 10.0017 4.57997C9.2899 4.5792 8.58494 4.71912 7.92737 4.9917C7.26979 5.26429 6.67258 5.66415 6.17006 6.16831C5.66628 6.67098 5.2666 7.26809 4.99389 7.92544C4.72118 8.58279 4.58081 9.28747 4.58081 9.99914C4.58081 10.7108 4.72118 11.4155 4.99389 12.0728C5.2666 12.7302 5.66628 13.3273 6.17006 13.83L12.1042 19.7641Z" fill="#10A711"/>
                                <path d="M10.0008 4.5808C11.3858 4.5808 12.7708 5.10997 13.8308 6.16913C14.3345 6.67181 14.7342 7.26891 15.0069 7.92626C15.2796 8.58361 15.42 9.28829 15.42 9.99997C15.42 10.7116 15.2796 11.4163 15.0069 12.0737C14.7342 12.731 14.3345 13.3281 13.8308 13.8308C13.3281 14.3346 12.731 14.7343 12.0736 15.007C11.4163 15.2797 10.7116 15.4201 9.99992 15.4201C9.28825 15.4201 8.58356 15.2797 7.92621 15.007C7.26887 14.7343 6.67176 14.3346 6.16909 13.8308C5.6653 13.3281 5.26562 12.731 4.99291 12.0737C4.72021 11.4163 4.57983 10.7116 4.57983 9.99997C4.57983 9.28829 4.72021 8.58361 4.99291 7.92626C5.26562 7.26891 5.6653 6.67181 6.16909 6.16913C6.67161 5.66497 7.26882 5.26511 7.92639 4.99253C8.58396 4.71995 9.28892 4.58002 10.0008 4.5808ZM12.4674 8.33247C12.3885 8.34002 12.3134 8.36978 12.2508 8.4183L9.20575 10.7016L7.79492 9.29163C7.48909 8.9733 6.88659 9.57497 7.20575 9.8808L8.87242 11.5475C8.94467 11.6158 9.03833 11.657 9.13751 11.6642C9.2367 11.6713 9.3353 11.6439 9.41659 11.5866L12.7499 9.08663C13.0299 8.88247 12.8574 8.3383 12.5108 8.3333C12.4966 8.33258 12.4824 8.33258 12.4683 8.3333L12.4674 8.33247Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_310_3205">
                                <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </span>
                                </p>
                                <p className='mb-3 desc-si'>
                                <span className='me-2 icon-si'>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_115_1021)">
                                <path d="M15 27.1875C15.2589 27.1875 15.4688 26.9776 15.4688 26.7188C15.4688 26.4599 15.2589 26.25 15 26.25C14.7411 26.25 14.5312 26.4599 14.5312 26.7188C14.5312 26.9776 14.7411 27.1875 15 27.1875Z" fill="black"/>
                                <path d="M19.9828 21.2719C22.1228 20.1566 23.8267 18.3556 24.8218 16.1571C25.817 13.9587 26.0458 11.49 25.4717 9.14612C24.8975 6.80225 23.5536 4.71876 21.6551 3.22914C19.7566 1.73953 17.4132 0.929932 15 0.929932C12.5868 0.929932 10.2434 1.73953 8.3449 3.22914C6.44636 4.71876 5.10247 6.80225 4.52833 9.14612C3.9542 11.49 4.18301 13.9587 5.17815 16.1571C6.17329 18.3556 7.87722 20.1566 10.0172 21.2719C3.98906 21.7219 0.9375 23.0016 0.9375 25.0781C0.9375 28.3734 8.58281 29.0625 15 29.0625C21.4172 29.0625 29.0625 28.3734 29.0625 25.0781C29.0625 23.0016 26.0109 21.7219 19.9828 21.2719ZM7.03125 11.7188C7.03125 10.1427 7.49861 8.60201 8.37423 7.29155C9.24984 5.9811 10.4944 4.95972 11.9505 4.35659C13.4066 3.75345 15.0088 3.59565 16.5546 3.90312C18.1004 4.2106 19.5203 4.96955 20.6348 6.084C21.7492 7.19845 22.5082 8.61834 22.8156 10.1641C23.1231 11.7099 22.9653 13.3122 22.3622 14.7683C21.759 16.2244 20.7377 17.4689 19.4272 18.3445C18.1167 19.2201 16.5761 19.6875 15 19.6875C12.8875 19.6845 10.8623 18.844 9.36853 17.3502C7.87474 15.8564 7.03423 13.8313 7.03125 11.7188ZM15 28.125C6.90469 28.125 1.875 26.9578 1.875 25.0781C1.875 23.5406 5.23594 22.4766 11.0953 22.1391L12.0047 23.0531C9.06094 23.2172 5.15625 23.7 5.15625 25.0781C5.15625 26.6391 10.1344 27.0469 13.1016 27.1547H13.1156C13.1772 27.1559 13.2384 27.145 13.2957 27.1226C13.3531 27.1002 13.4054 27.0667 13.4498 27.024C13.4942 26.9814 13.5298 26.9304 13.5545 26.874C13.5792 26.8176 13.5925 26.7569 13.5938 26.6953C13.595 26.6338 13.5841 26.5726 13.5617 26.5152C13.5392 26.4579 13.5057 26.4055 13.4631 26.3611C13.4204 26.3167 13.3694 26.2812 13.313 26.2565C13.2566 26.2318 13.1959 26.2184 13.1344 26.2172C8.64375 26.0578 6.5625 25.4109 6.14531 25.0781C6.55781 24.75 8.57812 24.1219 12.9 23.9484L14.0766 25.125C14.3289 25.3475 14.6542 25.4693 14.9906 25.4672C15.3428 25.4677 15.6829 25.3393 15.9469 25.1063L17.1 23.9484C21.4219 24.1219 23.4422 24.75 23.8547 25.0781C23.4375 25.4109 21.3562 26.0578 16.8656 26.2172C16.7413 26.2197 16.6231 26.2714 16.5369 26.3611C16.4508 26.4508 16.4038 26.571 16.4062 26.6953C16.4087 26.8196 16.4605 26.9379 16.5502 27.024C16.6398 27.1102 16.7601 27.1572 16.8844 27.1547H16.8984C19.8656 27.0469 24.8438 26.6391 24.8438 25.0781C24.8438 23.7 20.9391 23.2172 17.9953 23.0531L18.9047 22.1391C24.7641 22.4766 28.125 23.5406 28.125 25.0781C28.125 26.9578 23.0953 28.125 15 28.125Z" fill="black"/>
                                <path d="M19.6875 9.60938C19.6861 8.61523 19.2906 7.6622 18.5876 6.95923C17.8847 6.25627 16.9316 5.86074 15.9375 5.85938H12.6562C12.2836 5.86049 11.9266 6.009 11.6631 6.27249C11.3996 6.53597 11.2511 6.89301 11.25 7.26562V16.1719C11.25 16.5448 11.3982 16.9025 11.6619 17.1662C11.9256 17.43 12.2833 17.5781 12.6562 17.5781C13.0292 17.5781 13.3869 17.43 13.6506 17.1662C13.9143 16.9025 14.0625 16.5448 14.0625 16.1719V13.3594H15.9375C16.9316 13.358 17.8847 12.9625 18.5876 12.2595C19.2906 11.5566 19.6861 10.6035 19.6875 9.60938ZM14.0625 8.67188H15.9375C16.1861 8.67188 16.4246 8.77065 16.6004 8.94646C16.7762 9.12228 16.875 9.36073 16.875 9.60938C16.875 9.85802 16.7762 10.0965 16.6004 10.2723C16.4246 10.4481 16.1861 10.5469 15.9375 10.5469H14.0625V8.67188Z" fill="black"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_115_1021">
                                <rect width="30" height="30" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </span>
                                <span className='text-si'>
                                Parking Area
                                </span>
                                <span className='ms-2 icon-si'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_310_3205)">
                                <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#50B748"/>
                                <path d="M12.1042 19.7641C12.296 19.727 12.4866 19.6842 12.6759 19.6358C12.9968 19.5461 13.313 19.4404 13.6234 19.3191C13.9341 19.1989 14.2387 19.0631 14.5359 18.9125C14.8332 18.7612 15.1227 18.5952 15.4034 18.415C15.6838 18.2347 15.9549 18.0406 16.2159 17.8333C16.4773 17.6257 16.7282 17.4052 16.9676 17.1725C17.2065 16.9404 17.4338 16.6964 17.6484 16.4416C17.8632 16.1866 18.0651 15.921 18.2534 15.6458C18.4416 15.3711 18.616 15.0871 18.7759 14.795C18.9358 14.5024 19.081 14.202 19.2109 13.895C19.3409 13.5878 19.4555 13.2744 19.5542 12.9558C19.6388 12.6769 19.711 12.3944 19.7709 12.1091L13.8292 6.16831C13.3275 5.66431 12.731 5.26452 12.0741 4.99193C11.4172 4.71934 10.7129 4.57934 10.0017 4.57997C9.2899 4.5792 8.58494 4.71912 7.92737 4.9917C7.26979 5.26429 6.67258 5.66415 6.17006 6.16831C5.66628 6.67098 5.2666 7.26809 4.99389 7.92544C4.72118 8.58279 4.58081 9.28747 4.58081 9.99914C4.58081 10.7108 4.72118 11.4155 4.99389 12.0728C5.2666 12.7302 5.66628 13.3273 6.17006 13.83L12.1042 19.7641Z" fill="#10A711"/>
                                <path d="M10.0008 4.5808C11.3858 4.5808 12.7708 5.10997 13.8308 6.16913C14.3345 6.67181 14.7342 7.26891 15.0069 7.92626C15.2796 8.58361 15.42 9.28829 15.42 9.99997C15.42 10.7116 15.2796 11.4163 15.0069 12.0737C14.7342 12.731 14.3345 13.3281 13.8308 13.8308C13.3281 14.3346 12.731 14.7343 12.0736 15.007C11.4163 15.2797 10.7116 15.4201 9.99992 15.4201C9.28825 15.4201 8.58356 15.2797 7.92621 15.007C7.26887 14.7343 6.67176 14.3346 6.16909 13.8308C5.6653 13.3281 5.26562 12.731 4.99291 12.0737C4.72021 11.4163 4.57983 10.7116 4.57983 9.99997C4.57983 9.28829 4.72021 8.58361 4.99291 7.92626C5.26562 7.26891 5.6653 6.67181 6.16909 6.16913C6.67161 5.66497 7.26882 5.26511 7.92639 4.99253C8.58396 4.71995 9.28892 4.58002 10.0008 4.5808ZM12.4674 8.33247C12.3885 8.34002 12.3134 8.36978 12.2508 8.4183L9.20575 10.7016L7.79492 9.29163C7.48909 8.9733 6.88659 9.57497 7.20575 9.8808L8.87242 11.5475C8.94467 11.6158 9.03833 11.657 9.13751 11.6642C9.2367 11.6713 9.3353 11.6439 9.41659 11.5866L12.7499 9.08663C13.0299 8.88247 12.8574 8.3383 12.5108 8.3333C12.4966 8.33258 12.4824 8.33258 12.4683 8.3333L12.4674 8.33247Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_310_3205">
                                <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </span>
                                </p>
                        </div>
                        </div>
                        </div>
                        </div>
                        :
                        <>
                        No {facility.category} available!
                        </>
                        }
                        </div>
                        {/* <div className='col-4'>
                            <div className='configure-container-si'>
                            <div className='card p-4 mb-3 px-4'>
                                <Calendar onChange={(newValue)=>{onChange(newValue);setSelectedService(null);setCourtId(null)}} 
                                    value={value}
                                    className="common-calendor-si"
                                    minDate={new Date()}
                                />
                            </div>
        
                            {value ? 
                            <>
                            <div className='card p-4 mb-3 px-4'>
                            <p className='heading-si text-capitalize'>Choose {facility.category}</p>
                            <div className='d-flex flex-wrap'>
                            {facility.services.length > 0 ? <>
                            {facility.services.map((item,ind)=>{
                            const iconURL = item.icon ? item.icon.replace(/\\\//g, '/') : null;
        
                            return (<button type='button' className={`btn choose-service-btn-si m-1  ${selectedService === item.id ? 'active':''}`} key={item.name + ind} onClick={()=>setSelectedService(item.id)} disabled={checkServiceDisabled(item.id)}>
                            <span className='me-1 icon-si'>
                            <img src={`${IMG_URL}${iconURL}`}  alt={item.name} width='16'/>
                            </span>
                            <span className='text-capitalize'>{item.name}</span>
                            </button>
                            )
                            })}
                            </> : 
                            <span className='text-capitalize'>No {facility.category} Available.</span>
                            }
                            </div>
                            
                            </div>
                            </>
                            :
                            null
                            }
        
                            {selectedService ? 
                            <>
                            <div className='card p-4 mb-3 px-4'>
                            <p className='heading-si text-capitalize'>Choose court</p>
        
                            {facility.services.find((item)=> item.id === selectedService).court.length > 0 ? 
                            <>
                            {facility.services.find((item)=> item.id === selectedService).court.map((items,ind)=>{
                                return (<button type='button' className={`btn choose-courts-btn-si ${courtId === items.id ? 'active': ''} `} key={items.court_name + ind} onClick={()=>handleCourtChange(items.id)}>
                                <p className='mb-1 text-start headingSi'>{items.court_name}</p>
                                <p className='mb-1 text-start'>Slot time: {items.duration} min</p>
                                <p className='mb-1 text-start'>Slot price: {items.slot_price} ₹</p>
                                </button>)
                            })}
                            </>    
                            :
                            <p>No courts Available</p>}
                            
                            </div>
                            </>
                            :
                            null}
        
                            {slots && courtId ? <>
                            <div className='card p-4 mb-3 px-4 singlePage-slots-wrapper'>
                            <p className='heading-si text-capitalize w-100'>Choose slot</p>
                            {slots.length > 0 ?
                            <>
                            {slots.map((item,ind)=>{
                                return (<button type='button' className={`btn choose-courts-btn-si m-2`} key={item.start_time + ind}>
                                <p className='mb-1 text-start headingSi'>{item.start_time} - {item.end_time}</p>
                                </button>)
                            })}
                            </>
                            : <p>No slots available.</p> }
                            </div>
                            </> : null}
        
                            {!state.userData ? 
                            <button type='button' className='btn book-now-btn-si mt-2' 
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                            onClick={() => {
                            resetLoginState(!state.loginState);
                            }}
                            >Book Now</button>
                            :
                            <button type='button' className='btn book-now-btn-si mt-2'  onClick={()=>handleClick()} disabled={!(value && courtId && selectedService)}>Book Now</button>
                            }
                            </div>
                        </div> */}
                    </div>
                </section>
            </Default>
        </>
        )
    }
    

    return (<Nodatafound/>);
}

export default NewSingle


