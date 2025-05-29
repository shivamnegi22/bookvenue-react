function truncateString(str, maxLength) {
  if(str){
    if (str.length <= maxLength) {
      return str; // No need to truncate if the string is already within the desired length
    }
    return str.substring(0, maxLength) + '...'; // Truncate and add ellipsis
  }
  
  return null;
  }

  export default truncateString;