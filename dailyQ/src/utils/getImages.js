import tree from "../assets/tree.png";
import mushroom from "../assets/mushroom.png";
import suninjang from "../assets/suninjang.png";
import flower from "../assets/flower.png";

export function getImages(value){
  if(value === 1){
    return tree;
  }
  else if(value === 2){
    return suninjang;
  }
  else if(value === 3){
    return mushroom;
  }
  else if(value === 4){
    return flower;
  }
  else{
    return null;
  }
}