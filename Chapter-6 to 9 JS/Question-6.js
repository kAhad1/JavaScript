let sub1 = prompt("Enter subject name : ");
let sub2 = prompt("Enter subject name : ");
let sub3 = prompt("Enter subject name : ");
let totalMarks = 100;
let obtMarks1 = prompt("Enter the obtained marks of " + sub1+" : ");
let obtMarks2 = prompt("Enter the obtained marks of " + sub2+" : ");
let obtMarks3 = prompt("Enter the obtained marks of " + sub3+" : ");


let obtMarks = sub1 + sub2 + sub3;

let percentage = (obtMarks / totalMarks) * 100;

let sub1Percentage = obtMarks1/totalMarks * 100;
let sub2Percentage = obtMarks2/totalMarks * 100;
let sub3Percentage = obtMarks3/totalMarks * 100;

document.write("Subject &nbsp; Total Marks &nbsp; Obtained Marks &nbsp; Percentage <br><br>");
document.write(sub1 +" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+totalMarks+" &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+obtMarks1 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + sub1Percentage);

document.write("<br>");

document.write(sub2 +" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+totalMarks+" &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+obtMarks2 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + sub2Percentage);


document.write("<br>");
document.write(sub3 +" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+totalMarks+" &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+obtMarks3 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + sub3Percentage);
