

export default function GetLocation(i) {
   const loc = {};

   if (i< 3){
       loc.row = 1;
       loc.col = 1+ i*1;
   }else if (i<=5 && i >=3){

    loc.row= 2;
     loc.col= i-2;

   }else if (i<=8 && i >5){
       loc.row=3;
       loc.col= i-5;
   }else{ 
       return loc.assign({}, {col: null, row:null})
   }
console.log(loc)
   return loc;
  }
  