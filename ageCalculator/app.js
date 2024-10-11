function calculateAge() {
    
    let day = parseInt(prompt("Enter your birth day (1-31):"), 10);
    let month = parseInt(prompt("Enter your birth month (1-12):"), 10);
    let year = parseInt(prompt("Enter your birth year:"), 10);

    let birthDate = new Date(year, month - 1, day);


    let currentDate = new Date();

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();


    if (ageDays < 0) {
        ageMonths--;
        ageDays += 30; 
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }


    alert(`Your Age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days!`);

    console.log(`Age details: ${ageYears} years, ${ageMonths} months, ${ageDays} days.`);
    document.write(`<h2>Your Age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days!</h2>`);

}
