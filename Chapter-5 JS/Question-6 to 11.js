// Q6) a. Store a Celsius temperature into a variable.
// b. Convert it to Fahrenheit & output "NNOC is NNOF".   

// c. Now store a Fahrenheit temperature into a variable.
// d. Convert it to Celsius & output "NNoF is NNOC"

let celsius = 30;
let fahrenheit = celsius * 9 / 5 + 32;
document.write(celsius + "C is " + fahrenheit+"F <br>");

let fahrenheit1 = 86;
let celcius1 = (fahrenheit1-32) * 5 / 9 ;
document.write(fahrenheit1 + "F is " + celcius1+"C");

// Q7) Write a program to implement checkout process of a shopping cart system for an e-commerce website. Store the following in variables
// a. Price of item 1
// b. Price of item 2
// c. Ordered quantity of item 1
// d. Ordered Quantity of item 2
// e. Shipping charges
// Compute the total cost & show the receipt in your browser.

let price1 = 100;
let price2 = 200;
let quantity1 = 2;
let quantity2 = 3;
let shipping = 10;
let total = (price1 * quantity1) + (price2 * quantity2) + shipping;
document.write("<br> <br> Receipt <br> Item 1 Price: $" + price1 +" <br> Quantity of item 1 is " + quantity1 + "<br> Item 2 Price: $" + price2 + " <br> Quantity of item 2 is " + quantity2+"<br> Shipping Charges " + shipping+"<br> Total cost of your order is : " + total); 


// Q8) Store total marks and marks obtained by a student in 2 variables. Compute the percentage and show the result in your browser.

let marks1 = 80;
let marks2 = 90;
let total1 = marks1 + marks2;
let percentage = (total1 / 200) * 100;

document.write("<br><br> <br> MARKSHEET ");
document.write("<br> Total Marks: 200 <br> Marks Obtained: " + total1);
document.write("<br> Percentage is " + percentage + "%");

 // Q9) Assume we have 10 US dollars & 25 Saudi Riyals. Write a script to convert the total currency to Pakistani Rupees. Perform all calculations in a single expression. (Exchange rates : 1 US Dollar = 104.80 Pakistani Rupee and 1 Saudi Riyal = 28 Pakistani Rupee.

 let totalPKR = 10 * 104.80 + 25 * 28;
 document.write("<br><br><br> Currency in PKR  " );
 document.write("<br> Total Currency in PKR is " + totalPKR);



 // Q10) Write a program to initialize a variable with some number and do arithmetic in following sequence:
// a. Add 5
// b. Multiply by 10
// c. Divide the result by 2
// Perform all calculations in a single expression

let number = 10;
let result = (number + 5) * 10 / 2 ;
document.write("<br><br><br> The result is : " + result);

// Q11) The Age Calculator: Forgot how old someone is? Calculate it!
// a. Store the current year in a variable.
// b. Store their birth year in a variable.
// c. Calculate their 2 possible ages based on the stored values.

let currentYear = 2016;
let birthYear = 1992;
let age1 = currentYear - birthYear;
let age2 = currentYear - birthYear - 1;
document.write("<br><br><br> Current Year is " + currentYear);
document.write("<br> Birth Year is " + birthYear);
document.write("<br> Age 1 is " + age1);
document.write("<br> Age 2 is " + age2);

