/**
 * Workshop: Password Checker (DOM Edition)
 *
 * Istället för att vi har lösenorden hårdkodade så låt användaren skriva in
 * ett lösenord att testa i ett input-fält.
 *
 * Hittar du inte hur du ska lösa något? Googla! En stor del av att vara
 * utvecklare är att kunna hitta information på egen hand. Det finns garanterat
 * någon som har haft samma problem som dig!
 *
 * 😊 STEG 1
 * När användaren klickar på knappen "Alright, let's hear it" så ska
 * lösenordet testas och användaren får se utfallet på sidan. Du kan använda
 * div:en med id "result" för att visa resultatet. Plocka bort klassen "hide"
 * från denna div för att visa resultatet.
 *
 * ⭐ STEG 2
 * Visa olika Bootstrap Alert beroende på utfall. Tips: Använd klasserna
 * `alert alert-success`, `alert alert-warning` och `alert alert-danger`.
 * Det finns redan en div med id "result" som du kan använda om du vill.
 * Plocka bort klassen "hide" från denna div för att visa resultatet.
 *
 * 🤔 STEG 3
 * Testa lösenordet löpande efterhand som användaren skriver in det.
 *
 * 🤩 STEG 4
 * Fördela ansvar för de olika delarna till olika funktioner så att en del
 * ansvarar för att hämta lösenordet som ska testas, en del testar själva
 * lösenordet och en tredje del uppdaterar DOM med resultatet.
 * Lägg även in så innehållet i lösenordsrutan rensas och resultatet döljs
 * när man trycker på "Screw it!".
 *
 */

const specialChars = [
	"@", "$", "%", "*", "^", "<", ">", "?", "!", "(", ")", "[", "]", "{", "}", "'"
];

const resultEl = document.querySelector("#result");
let inputPassword = "";
const passwordEl = document.querySelector("#inputPassword");
const submitBtn = document.querySelector(".btn-primary");
const resetBtn = document.querySelector(".btn-secondary");

/* Uppdaterar DOM enligt utfallet från passwordChecker(), default values nollställer formuläret när användare suddar password-input
	Nollställer även alert-classes ifall displayClass ändras, tex. från alert-danger till alert-warning
*/
const domUpdater = (result = "", displayClass = "hide") => {
	resultEl.classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
	resultEl.classList.add(displayClass);
	resultEl.innerText = `${result}`;
};

//får input.value och testar lösenordet och skickar vidare resultatet till domUpdater()
const passworChecker = (password) => {
	resultEl.classList.remove("alert-success", "alert-warning", "alert-danger");
	let specialCharCount = 0;
	let result;
	let displayClass;
	for (let i = 0; i < password.length; i++) {
		const char = password[i];	
		if (specialChars.includes(char)) {
			specialCharCount++;
			if (specialCharCount === 2) {  // If we found two special chars, break free from the loop
				break;  // i want to
			}
		}
	}
	// Har lösenordet minst 6 tecken OCH innehåller minst två specialtecken?
	if (password.length >= 6 && specialCharCount >= 2) {
		// Ja!
		result = "- ✅ Great! Such password, much secure, *VERY* hard to crack!";
		displayClass ="alert-success";
	
	// Har lösenordet minst 8 tecken OCH innehåller minst ett specialtecken?
	} else if (password.length >= 8 && specialCharCount >= 1) {
		// Ja!
		result = "- ✅ Great! Such password, much secure, very hard to crack!";
		displayClass = "alert-success";
	
	// Har lösenordet minst 12 tecken OCH innehåller minst ett bindestreck?
	} else if (password.length >= 12 && password.includes("-")) {
		// Ja!
		result = "- ✅ Great! That's a pretty good password!";
		displayClass ="alert-warning";
	
	// Har lösenordet minst 16 tecken?
	} else if (password.length >= 16) {
		// Ja!
		result = "- ✅ Great! That's a long password!";
		displayClass = "alert-warning";
	
	} else {
		// Nej!
		result = "- 🚨 Insecure password, my grandma can crack it!";
		displayClass = "alert-danger";
	}
	domUpdater(result, displayClass);
};
// kör skriptet om där finns minst ett tecken i input-value
passwordEl.addEventListener("input", (e) => {
	inputPassword = e.target.value;
	console.log(e.target);
	if (inputPassword.length > 0) {
	passworChecker(inputPassword);
	}else {
		domUpdater();
	}
});
// triggar checkern vid click, får upp en alert om där inte finns ett input-value
submitBtn.addEventListener("click", () => {
	if (inputPassword.length > 0) {
		passworChecker(inputPassword);
		}else {
			alert("OI! Skriv in något som vi kan testa🤡🤡🤡🤡🤡🤡")
			domUpdater();
		}
});
// Nollställer formuläret
resetBtn.addEventListener("click", () => {
	passwordEl.value = "";
	resultEl.textContent = "";
	resultEl.classList.add('hide');
});