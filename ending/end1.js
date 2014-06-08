
var haikeinum = 0;

var stop2 = 0;

function test1()
{



stop2 = setInterval("movie()",400);



}//function test1()



function movie()
{
haikeinum = haikeinum + 1 ;
document.getElementById("gazou").src="ending"+haikeinum+".png";


if (haikeinum > 75 )
{

console.log(haikeinum);
clearInterval(stop2);
}






}





