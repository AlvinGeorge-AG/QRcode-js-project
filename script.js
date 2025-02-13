const input_element = document.getElementById('userInput');
const input_content = document.getElementById('userInput').value;
const download_btn = document.getElementById('download');
// for color picker
let colorcode;
let newcolorcode ='073959';
let colour_selector = document.getElementById('FGColor');
colour_selector.addEventListener('input',()=>{
    colorcode = JSON.stringify(colour_selector.value);
    newcolorcode = JSON.parse(colorcode.replace("#",""));
})

//Calls an API and generate the QR code
async function render(){
    const input_content = document.getElementById('userInput').value;
    if(input_content===''){alert("Enter something as Text!")}
    else{
        try{
            const imglink = await fetch("https://quickchart.io/qr?text="+input_content+"&dark="+newcolorcode+"&light=ffffff&ecLevel=H&format=png&size=400");
            document.getElementById('img').src=imglink;
        }
        catch(error){alert(error)};
    };
}

download_btn.addEventListener('click', async ()=>{
    const input_content = document.getElementById('userInput').value;
    if(input_content===''){
        alert("Enter something as Text!");
    }else{
            try{
                const imglink = await fetch("https://quickchart.io/qr?text="+input_content+"&dark="+newcolorcode+"&light=ffffff&ecLevel=H&format=png&size=400");
                const localfile = await imglink.blob()
                document.getElementById('img').src="https://quickchart.io/qr?text="+input_content+"&dark="+newcolorcode+"&light=ffffff&ecLevel=H&format=png&size=400";
                const link = document.createElement('a');
                link.href = URL.createObjectURL(localfile);
                link.download = 'QRimage.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }catch(error){alert(error)}
    }
});
//API USED =>
//"https://quickchart.io/qr?text=HelloWorld&light=blue&dark=white&ecLevel=H&format=png&size=400" 
//controls input and stimulate generate button
//document.getElementById('submit').disabled = true;
// async function input()
//     {
//         await new Promise((resolve)=>{input_element.addEventListener('input', ()=>{document.getElementById('submit').disabled = false;})});
//     }
// input()