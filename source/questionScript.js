function displayAnswer() {
    let answer = "";

    switch(Math.floor(Math.random() * 10)){
        case 0:
            answer = "Don't count on it.";
            break;
        case 1:
            answer = "Without a doubt, yes.";
            break;
        case 2:
            answer = "I don't think I should answer that.";
            break;
        case 3:
            answer = "Certainly.";
            break;
        case 4:
            answer = "I doubt it.";
            break;
        case 5:
            answer = "Maybe you should ask someone else.";
            break;
        case 6:
            answer = "Nope.";
            break;
        case 7:
            answer = "Indeed.";
            break;
        case 8:
            answer = "Do I even need to answer?";
            break;
        case 9:
            answer = "That's correct.";
            break;
    }

    let pikachu = document.getElementById("pikachu-image");
    let question = document.getElementById("question");
    let button = document.getElementById("btnSubmit");
    let title = document.getElementById("title");
    let answerText = document.getElementById("answer");

    pikachu.src = "pikachu_still.gif";
    question.value = "";
    question.style.visibility = "visible";
    button.style.visibility = "visible";
    title.innerHTML = "Ask Pikachu your question.";
    answerText.innerHTML = '"' + answer + '"';
    answerText.style.visibility = "visible";
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("btnSubmit").addEventListener("click", function() {
        let question = document.getElementById("question");
        let title = document.getElementById("title");
        if (!(question.value)){
            title.innerHTML = "You need to type a question first.";
            return;
        }
        
        let pikachu = document.getElementById("pikachu-image");
        let button = document.getElementById("btnSubmit");

		document.getElementById("pikachu-image").src = "pikachu_spin.gif";
        document.getElementById("question").style.visibility = "hidden";
        document.getElementById("btnSubmit").style.visibility = "hidden";
        document.getElementById("title").innerHTML = "Thinking...";
        document.getElementById("answer").style.visibility = "hidden";

        setTimeout(displayAnswer, 4000);
	});
})