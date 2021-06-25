class Vector {
    constructor(array) {
      this.a = array
    }
    add(y) {
      var r = []
      var x  = this
      for (var i=0; i<x.a.length; i++) {
        r[i] = x.a[i]+y.a[i]
      }
      return new Vector(r)
    }
  
    sub(y) {
      var r=[]
      var x=this
      for(var i=0;i<x.a.length;i++){
        r[i] = x.a[i]-y.a[i]
      }
      return new Vector(r)
    }
    dot(y) {
      var r=[]
      var x=this
      var z=0
      for(var i=0;i<x.a.length;i++){
          r[i]=x.a[i]*y.a[i]
          z+=r[i]
      }
      return z
    }
    neg(y) {
        var r=[]
        var x=this
        for(var i=0;i<x.a.length;i++){
            r[i]=-x.a[i]
        }
        return new Vector(r)
    }


  }
  
  var x = new Vector([1,2,3])
  var y = new Vector([1,1,1])
  console.log('x.add(y)=', x.add(y)) 
  console.log("x.sub(y)=",x.sub(y))
  console.log("x.dot(y)",x.dot(y))
  console.log("x.neg(y)=",x.neg(y))

