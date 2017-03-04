$(document).ready(function() {

	// declaring variables
	var time = 20,
		correct = 0,
		incorrect = 0,
		current = 0,
		trivia = [],
		timer,
		display,
		i,
		randomizedArray

	// click to start the game
	$('#start').click(function() {
		game.new();
	});

	// click to reset the game
	$('#reset').click(function() {
		game.reset();
	})

	// game functions
	var game = {
		// pick 5 questions from trivia questions array
		randomizeQuestions: function() {
			randomizedArray = triviaQuestions.sort(function(a, b) {
				return 0.5 - Math.random();
			});
			for (var i = 0; i < 5; i++) {
				trivia.push(randomizedArray.pop());
			}
		},
		// randomize order of answer choices
		randomizeChoices: function() {
			for (var i = 0; i < trivia.length; i++) {
				var randomChoice = trivia[i].choices.sort(function(a, b) {
					return 0.5 - Math.random();
				});
			}
		},
		// start the timer
		new: function() {
			$('#start').hide();
			game.timerReset();
			timer = setInterval(game.countdown, 1000);
			game.data();
		},
		// display timer and count as incorrect if time expires
		countdown: function() {
			if (time > 0) {
				time--;
				$('#timer').html(time);
			} else {
				incorrect++;
				clearInterval(timer);
				$('#timer').html("TIME'S UP!");
				$('#question').html("The correct answer is: " + i.correct + ".");
				game.displayAnswer();
			}
		},
		// reset the timer
		timerReset: function() {
			time = 20;
			$('#timer').html(time);
		},
		// check user answer
		check: function() {
			if ($(this).text() == i.correct) {
				game.correct();
			} else {
				game.incorrect();
			}
		},
		// if the answer is correct
		correct: function() {
			correct++;
			clearInterval(timer);
			$('#timer').html("You know it!");
			$('#question').empty();
			game.displayAnswer();
		},
		// if the answer is incorrect
		incorrect: function() {
			incorrect++;
			clearInterval(timer);
			$('#timer').html("WRONG!");
			$('#question').html("The correct answer is " + i.correct + ".");
			game.displayAnswer();
		},
		// display the questions
		data: function() {
			i = trivia[current];
			current++;
			$('#question').html(i.question);
			$.each(i.choices, function(index, value) {
				var answer = $('<button>')
					.addClass('btn choice')
					.html(i.choices[index])
					.on('click', game.check);
				$('#answer').append(answer);
			});
		},
		displayAnswer: function() {
			var gif = $('<img>')
				.addClass('img-rounded image center-block')
				.attr('src', 'assets/images/' + i.image);
			$('#answer').html(gif);
			display = setTimeout(game.nextQuestion, 5000);
		},
		// next question and end game
		nextQuestion: function() {
			if (current !== trivia.length) {
				time = 20;
				$('#answer').empty();
				game.new();
			} else {
				game.endGame();
			}
		},
		// show results when game ends
		endGame: function () {
			clearInterval(timer);
			$('#timer').hide();
			$('#question').html("GAME OVER!");
			$('#answer').html("Correct answers: " + correct + "<br>Incorrect answers: " + incorrect);
			var reset = $("<button>")
				.addClass('btn')
				.html("Let's play again!")
				.attr('id', 'reset');
			$('#reset').html(reset);
		},
		// reset the game
		reset: function() {
			time = 20;
			correct = 0;
			incorrect = 0;
			current = 0;
			timer = undefined;
			choice = undefined;
			display = undefined;
			randomizedArray = undefined;
			i = trivia[current];
			triviaQuestions = triviaQuestions.concat(trivia);
            trivia = [];
            $('#timer').show();
            $('#timer').empty();
            $('#question').empty();
            $('#answer').empty();
            $('#reset').empty();
            game.randomizeQuestions();
            game.randomizeChoices();
            game.new();
		}
	};

	//array of all the question and answer objects
    var triviaQuestions = [{
        question: "Which Saturday Night Live cast member first portrayed republican vice presidential candidate Sarah Palin in 2008?",
        choices: ["Amy Poehler", "Cecily Strong", "Tiny Fey", "Kristen Wiig"],
        correct: "Tina Fey",
        image: "tina-fey.gif",
    }, {
        question: "Which SNL cast member played both Watergate-besieged President Richard Nixon and President Carter in the 1970s?",
        choices: ["Dan Aykroyd", "John Belushi", "Chevy Chase", "George Coe"],
        correct: "Dan Aykroyd",
        image: "dan-aykroyd.gif",
    }, {
        question: "Which of the following SNL cast members has NOT portrayed Hillary Clinton on the show?",
        choices: ["Kate McKinnon", "Kristen Wiig", "Amy Poehler", "Vanessa Bayer"],
        correct: "Kristen Wiig",
        image: "hillary-clinton.gif",
    }, {
        question: "Which gifted impersonator and SNL cast member once portrayed George H.W. Bush using the famous line, ‘Not gonna do it. Wouldn’t be prudent at this juncture.’?",
        choices: ["Mike Meyers", "Phil Hartman", "Kevin Nealon", "Dana Carvey"],
        correct: "Dana Carvey",
        image: "dana-carvey.gif",
    }, {
        question: "Which failed presidential candidate played himself as the future president in a cold open on SNL after he lost the election?",
        choices: ["George H.W. Bush", "Al Gore", "John Kerry", "Walter Mondale"],
        correct: "Al Gore",
        image: "al-gore.gif",
    }    ];


    game.randomizeQuestions();
    game.randomizeChoices();

});









