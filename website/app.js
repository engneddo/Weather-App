/* Global Variables */
const apiKey = 'fc45d644b90e52a41b341cd246946824';
const generateBtn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let todayDate = new Date();
let newDate = ((todayDate.getMonth())+1) + '/'+ todayDate.getDay() +'/' + todayDate.getFullYear();

generateBtn.addEventListener('click', async()=>{
    const zipCode = document.querySelector('#zip').value;
    const content = document.querySelector('#feelings').value;
    //Call function to fetch data from API and then promises
    fetchApiData()
    .then(data=>{
        postData(data);
    })
    .then(updateForm)
    //function to fetch data from API 
    async function fetchApiData(){
        if(!zipCode){
            alert('Please Enter Zip Code First!');
        }else{
            try{
                //Get request to retreive data from API
                const apiData = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`)).json();
                const tempDegree = apiData.main.temp;
                return tempDegree;
            }
            catch(err){
                 //Print error message if error occured
                console.log("Error is : ",err);
            }
        }
    }
    //function to post data to server
    async function postData(temprature){
        //Post request to post data to server 
        await fetch('/post', {
            method: "POST",
            credentials:"same-origin",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                date: newDate,
                temp: temprature,
                content: content
            })
        });
    }
    //function to update UI Form
    async function updateForm(){
        try{
            //Retrieve data from server using GET request
            const data = await fetch('/get', {credentials: "same-origin"});
            //Reformat data to object  format
            const finalData = await data.json();
            //Update html elements with retreived data
            document.querySelector('#date').innerHTML="Date : "+finalData.date;
            document.querySelector('#temp').innerHTML="Temperature : "+finalData.temp;
            document.querySelector('#content').innerHTML="Felling : "+finalData.content;
        }
        catch(err){
            //Print error message if error occured
            console.log("Error is : ",err);
        }
        
    }
    
})
