function addcolorize(name,b){
    var a=document.getElementsByClassName(name)
    for(var i=0;i<a.length;i++){
    a[i].style.color = "#"+b
    }
}
addcolorize("owner","C27C0E")
addcolorize("adminp","206694")
addcolorize("admin","3498DB")
addcolorize("modp","1F8B4C")
addcolorize("mod","2ECC71")