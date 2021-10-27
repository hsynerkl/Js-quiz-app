let dbveri;

let baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        dbveri=JSON.parse(baglanti.responseText)
    soruGetir();
    }
    return dbveri;
};
baglanti.open("GET", "data.json", true);
baglanti.send();


const sonucAlani=document.getElementsByClassName("soruAlani");
const soru = document.getElementById("soru")
const secenekler =document.getElementsByName('secenek');
const aciklamaA=document.getElementById('aciklamaA');
const aciklamaB=document.getElementById('aciklamaB');
const aciklamaC=document.getElementById('aciklamaC');
const aciklamaD=document.getElementById('aciklamaD');
const gonder =document.getElementById('gonder')

let puan=0;
let sira =0;

function soruGetir(){
    secimiTemizle();
    let siradakiSoru=dbveri.sorular[sira];
    soru.innerHTML=siradakiSoru.soru
    aciklamaA.innerText=siradakiSoru.secenekA;
    aciklamaB.innerText=siradakiSoru.secenekB;
    aciklamaC.innerText=siradakiSoru.secenekC;
    aciklamaD.innerText=siradakiSoru.secenekD;
}

function secimiTemizle(){
    secenekler.forEach(secenek => secenek.checked=false)
}

function secimiAl(){
    let secim;
    secenekler.forEach(secenek=>{
        if(secenek.checked==true)
        {
            secim=secenek.id
        }
    }) 
    return secim;
}
gonder.addEventListener('click',()=>{
     const secilen = secimiAl();
     if(secilen){
         if(secilen===dbveri.sorular[sira].cevap){
             puan++;
         }
     }
     sira++;
     if(sira<dbveri.sorular.length){
         soruGetir();
     }
     else{
        soru.innerHTML=`
        <h2>Mevcut soruların içerisinden ${puan}/${dbveri.sorular.length} oranında başarı sağladınız.</h2>`
        gonder.setAttribute('onclick',"location.reload()");
        gonder.innerHTML='Yeniden başla'
     }
})