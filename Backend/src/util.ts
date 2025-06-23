export default function random(len:number){
  const str="qwertyuiopasdfghjklzxcvbnm1234567890";
  let length=str.length;
  let ans="";
  for (let i=0;i<len;i++){
    ans+=str[(Math.floor(Math.random() * length))]
  }
  return ans
}