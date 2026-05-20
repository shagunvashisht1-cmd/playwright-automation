const excelJS = require('excelJS'); //import dependency into this file //const excelJS is class
const {test,expect} = require('@playwright/test'); //import dependency into this file

//For adding wait either use then() or async await
//1. Using then()
/* const workbook = new excelJS.Workbook(); //object created for the class and now we can access its methods like Workbook()

workbook.xlsx.readFile("C:/Users/Abhishek Sharma/Downloads/excelDownloadTest.xlsx").then(function() {//read the file and then we can access its methods like xlsx.readFile() and pass the path of the file //js is asynchronous language so we have to use then() to wait for the file to be read before we can access its methods like getWorksheet() and eachRow() etc.
//or use await before workbook and wrap entire function in async function & call the function to execute in end

// const worksheet=workbook.getWorksheet('Sheet1'); 

//print all values in the sheet by reading
worksheet.eachRow((row,rowNumber)=>{
    row.eachCell((cell,cellNumber)=>{
        console.log(cell.value);
    });
    console.log(row.values);
})
}); */ //js code run in terminal by giving node jsfilename.js command

//2. Using async await

async function readExcel() {
    const workbook = new excelJS.Workbook(); //object created for the class and now we can access its methods like Workbook()

    await workbook.xlsx.readFile("C:/Users/Abhishek Sharma/Downloads/excelDownloadTest.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    //print all values in the sheet by reading
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {
            console.log(cell.value);
        });
        console.log(row.values);
    })
};

//Scenario: If we want to find a specific value in the sheet and print its row and column numbers , we can do it like this:
async function findValueInExcel() {
    const workbook = new excelJS.Workbook(); //object created for the class and now we can access its methods like Workbook()

    await workbook.xlsx.readFile("C:/Users/Abhishek Sharma/Downloads/excelDownloadTest.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    //print all values in the sheet by reading
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === "Apple") {
                console.log(rowNumber, colNumber);
            }
        });
        // console.log(row.values);
    })
};  //ctrl+Alt+A to comment multiple lines


//Scenario: If we want to replace a specific value in the sheet and print its row and column numbers , we can do it like this:

//Update price for value "Mango" to 350 and write the changes to the file
async function replaceValueAndWriteInExcel(searchText, replacementText, change,fileName) {
    const workbook = new excelJS.Workbook(); //object created for the class and now we can access its methods like Workbook()

    await workbook.xlsx.readFile(fileName);
    const worksheet = workbook.getWorksheet('Sheet1');
    //print all values in the sheet by reading
    const output = await readExcelFunction(worksheet,searchText, replacementText,fileName); //ou

    /* if (output.column === -1) {
        console.log("Banana not found in the sheet");
        return;
    } */

    const cell = worksheet.getCell(output.row, output.column+change.colChange); //get the cell by its address row number and column number
   cell.value = replacementText; //replace the value of the cell";
    await workbook.xlsx.writeFile(fileName); //write the changes to the file   

    //read and write are async functions so we have to use await to wait for the changes to be written to the file before we can read it again
};

async function readExcelFunction(worksheet,searchText) {
    let output = { row: -1, column: -1 }; //initialize the output object with default values

       worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                //  console.log(output.row, output.column);
            }
        });
        console.log(row.values);
    })
    return output;
}

//replaceValueAndWriteInExcel("ReplacedFruit", "Kivi", "C:/Users/Abhishek Sharma/Downloads/excelTest.xlsx"); //call the function to execute
//findValueInExcel(); //call the function to execute
//readExcel(); //call the function to execute
//replaceValueAndWriteInExcel("Papaya", 250,{rowChange:0,colChange:2},"C:/Users/Abhishek Sharma/Downloads/download.xlsx"); //call the function to execute//findValueInExcel(); //call the function to execute
//readExcel(); //call the function to execute

 test("Upload and Download Excel", async ({ page }) => {
 await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
 //page.locator("#downloadButton").click();

//Extra steps for wait to ensure that the file is downloaded before we try to read it and write to it
const downloadPromise = page.waitForEvent("download"); //wait for the download event to be triggered and store the promise in a variable
const textSearch="Kivi";
const updatePriceValue='315';
 await page.getByRole("button", { name: "Download" }).click(); //From the role attribute value and the text of the button
await downloadPromise; //wait for the download to complete before proceeding to the next steps
 
await replaceValueAndWriteInExcel(textSearch, updatePriceValue,{rowChange:0,colChange:2},"C://Users/Abhishek Sharma/Downloads/download.xlsx"); //call the function to execute
await page.locator("#fileinput").click(); //From the role attribute value and the text of the butto
 //Choose File
await page.locator("#fileinput").setInputFiles("C://Users/Abhishek Sharma/Downloads/download.xlsx"); 
//setInputFiles works only when locator is of type file input and it will set the file to the input field and then we can click on the upload button to upload the file
 const searchTextElement = await page.getByText(textSearch);

 const desiredRow=await page.getByRole("row").filter({has:searchTextElement}); //From the role attribute value and the text of the cell
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatePriceValue); //From the role attribute value and the text of the cell
await page.pause(); //pause the execution to see the changes in the UI
});