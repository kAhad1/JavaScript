// Q12) The Geometrizer: Calculate properties of a circle. a. Store a radius into a variable.b. Calculate the circumference based on the radius, and output "The circumference is NN".
// (Hint: Circumference of a circle = 2 πr, π=3.142)
// Calculate the area based on the radius, and output "The area is NN". (Hint: Area of a circle = π r2, π=3.142)

let radius = 10;
let circumference = 2 * 3.142 * radius;

document.write("Radius of a Circle is " + radius);
document.write("<br>The circumference is " + circumference);
let area = 3.142 * radius * radius;
document.write("<br>The area is " + area);

// The Lifetime Supply Calculator: Ever wonder how much a "lifetime supply" of your favorite snack is? Wonder no more.
// a. Store your favorite snack into a variable
// b. Store your current age into a variable.
// c. Store a maximum age into a variable.
// d. Store an estimated amount per day (as a number).
// e. Calculate how many would you eat total for the rest of your life.
// Output the result to the screen like so: "You will need NNNNN  to last you until the ripe old age of NN".   
let snack = "chocolate";
let age = 19;
let maxAge = 80;
let dailySnack = 2;
let totalSnack = (maxAge - age) * dailySnack;
document.write("<br><br>Favorite snack: " + snack);
document.write("<br>Current age: " + age);
document.write("<br>Maximum age: " + maxAge);
document.write("<br>Amount of snacks per day: " + dailySnack);
document.write("<br>You will need " + totalSnack + " " + snack + " to last you until the ripe old age of "+maxAge);







