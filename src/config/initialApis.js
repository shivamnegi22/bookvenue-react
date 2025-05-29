import axios from "axios";

export const getHomepageData = async () => {

    const urls = [
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-recent-facility/3`,
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-all-services`,
      // Add more URLs as needed
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      let data = new Object;
      responses.map(res => {
        data = {...data,...res.data};
      })
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllService = async () => {

    const urls = [
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-all-services`,
      // Add more URLs as needed
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      let data = new Object;
      responses.map(res => {
        data = {...data,...res.data};
      })
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const getSinglePageData = async ({params}) => {
    console.log(params,'params is this')
    const urls = [
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-facility-by-slug/${params.slug}`,
      // Add more URLs as needed
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      let data = new Object;
      responses.map(res => {
        data = {...data,...res.data};
      })
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  

  export const getAllFacility = async () => {
    const urls = [
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-all-facility`,
      
      // Add more URLs as needed
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      let data = new Object;
      responses.map(res => {
        data = {...data,...res.data};
      })
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getFacilityByCategory = async ({params}) => {
    const {category,service} = params;
    const urls = [
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-facility-by-category/${category}/${service}`,
      // Add more URLs as needed
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      let data = new Object;
      responses.map(res => {
        data = {...data,...res.data};
      })
      return data;
    } catch (error) {
      throw error;
    }
  };

    
  export const getCreateFacilityPageData = async () => {
    const urls = [
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-all-amenities`,
      `${process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:8000/api'}/get-all-service-category`,
      // Add more URLs as needed
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => axios.get(url)));
      let data = new Object;
      responses.map(res => {
        data = {...data,...res.data};
      })
      return data;
    } catch (error) {
      throw error;
    }
  };