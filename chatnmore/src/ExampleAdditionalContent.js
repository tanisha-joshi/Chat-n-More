import React from 'react'
import Axios from "axios"
import {useStateValue} from './StateProvider'
function ExampleAdditionalContent({item,alert,setAlert}) {
    console.log(item);
    console.log(item.created_at.toString());
    const [{user},dispatch]=useStateValue();
    const deletePost=()=>{
        console.log(item.created_at);
        //let date = item.created_at.toLocaleDateString('en-ZA');
                //console.log(date);
                const utcTimestamp = item.created_at;
                const utcDate = new Date(utcTimestamp);
                const istOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short',hour12: false };
                const istDate = utcDate.toLocaleString('en-US', istOptions);
                console.log(istDate);
                console.log("ist date is",istDate);
                const dateString = istDate;
                let newDate="";
                let i=0;
                while(dateString[i]!='G')
                {
                  if(dateString[i]===',') i++;
                  newDate+=dateString[i];
                  i++;
                }
                // newDate=dateString.slice(5,10)+'/'+dateString.slice(0,2)+'/'+dateString.slice(3,5)+' '+dateString.slice(12,19);
                let datePart="";
                i=0;
                while(newDate[i]!=' ')
                {
                  datePart+=newDate[i];
                  i++;
                }
                let parts = datePart.split('/');
                
                let day = parts[1];
                let month = parts[0];
                let year = parts[2];
                if(day.length===1) day='0'+day;
                if(month.length===1) month='0'+month;
                datePart=year+'/'+month+'/'+day;
                while(i<newDate.length)
                {
                  datePart+=newDate[i]; i++;
                }
                console.log("Time of post to be deleted",datePart);
             Axios
            .post('http://localhost:3001/deletePost',{uid:user.uid,created_at: datePart})
            .then((response) => {
              console.log(response.data);
              console.log("done")
            })
            .catch((error) => {
              console.error(error);
              // Handle errors here if needed
            });
    }
    return (
      <>
        {/* <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
          More info about this info alert goes here. This example text is going to run a bit longer so that you can see
          how spacing within an alert works with this kind of content.
        </div> */}
        <div className="flex">
          <button
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
            onClick={()=>deletePost()}
          >
            Delete
          </button>
          <button
            type="button"
            className="rounded-lg border border-cyan-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-cyan-700 hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-cyan-300 dark:border-cyan-800 dark:text-cyan-800 dark:hover:text-white"
            onClick={()=>setAlert(false)}
          >
            Dismiss
          </button>
        </div>
      </>
    );
  }

export default ExampleAdditionalContent;