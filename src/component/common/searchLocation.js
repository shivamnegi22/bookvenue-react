import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';

const SearchLocation = ({cb, className}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
    
        // Use Google Places Autocomplete API to fetch suggestions
        const autoCompleteService = new window.google.maps.places.AutocompleteService();
        autoCompleteService.getPlacePredictions(
          { input: inputValue,
            componentRestrictions: { country: 'IN' }, },
          (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setSuggestions(predictions);
            }
          }
        );
    };

    
  const handlePlaceSelect = (place) => {
    // Get the place details using the Place Details service
    const placeService = new window.google.maps.places.PlacesService(document.createElement('div'));
    placeService.getDetails(
      { placeId: place.place_id },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setQuery('');
          if(cb == undefined){
            navigate(`/location/${result.name}`, { state: { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() } });
          }
          else{
            cb({coords: { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }, result})
          }
        }
      }
    );
  };

  return (
    <div className={`search-container-head ${className ? className : ''}`}>
      <div className="input-group search-bar-wrapper">
        <span className="input-group-text" id="global-search"><BiSearchAlt2/></span>
        <input type='search'
         value={query}
         onChange={handleInputChange}
         className='form-control' 
         id="globalSearch" 
         placeholder='Search for cities, places...' 
         aria-label='Search for cities, places...' 
         aria-describedby="global-search"/>

         {query !== '' && query  && query.length > 1 ?  
         <ul className='suggestionList'>
         
         {suggestions.map((suggestion) => {
 
             let suggetionData = []
 
             if(suggestion.description.includes(',')){
                 suggetionData = suggestion.description.split(',', 2);
             }
 
         return <>
         {suggetionData.length == 2
         ? 
 
          (
             <li key={suggestion.place_id} onClick={() => handlePlaceSelect(suggestion)} className='suggestion-item'>
                <p className='suggestion-heading'>{suggetionData[0]}</p>
                <p className='suggestion-desc'>{suggetionData[1]}</p>
           </li>
         )
         :
          (<li key={suggestion.place_id} onClick={() => handlePlaceSelect(suggestion)} className='suggestion-item'>
            <p className='suggestion-heading'>{suggestion.description}</p>
             
         </li>)
         }
         </>
         }
         )}

         </ul>
         :
         null
         }
      </div>
    </div>
  )
}

export default SearchLocation