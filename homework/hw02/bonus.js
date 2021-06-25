function between(a,b){
    for(var n=a;n<b;n++)
    if (isPrime(n)){
        console.log(n)
    }
}
   
function isPrime(n){
    
    if(n<2)
    {
        return false
    }
    for (var z=2;z<n;z++)
    {
        if(n%z==0){
            return false
        }
        return true
    }
}

between(3,15)