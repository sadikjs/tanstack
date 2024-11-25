"use client"
import Papa from "papaparse"
const acceptableCSVFileTypes=".csv"
const csv = ()=>{
    const csvFileHanlde =(event)=>{
        console.log(event.target.files[0])
        const parseFile = event.target.files[0]; 

        Papa.parse(parseFile, {
            header: true, 
            skipEmptyLines: true, 
            complete: function(results) {
                console.log("Finished:", results.data);
            }
        });
    }
    return(
        <div>
            <label htmlFor="csvFile">CVS File</label>
            <input type="file" id="csvFile" accept={acceptableCSVFileTypes} onChange={csvFileHanlde} />
        </div>
    );
}
export default csv