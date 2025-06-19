import zero from "../assets/zero.png";
import twentyfive from "../assets/twentyfive.png";
import fifty from "../assets/fifty.png";
import seventyfive from "../assets/seventyfive.png";

export const getPercentImage = (a) =>{
  if( a === 0 || a === null){
    return zero;
  }
  else if(0 < a && 51 > a){
    return twentyfive;
  }
  else if(50 < a && 100 > a){
    return fifty;
  }
  else if(a === 100){
    return seventyfive;
  }
}