//localStorage.clear();
var mycanvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var character1 = new Image();
character1.src = "images/character0.png";
var charx = 0;
var chary = 0;
var planex2 = 599;
var planey2 = 200;
var pointsx = Math.floor(Math.random() * 500);
var pointsy = Math.floor(Math.random() * 300);
var speedx = 0;
var speedy = 0;

//Drawing my background image in.
var scene = new Image();
scene.src = "images/galaxy.jpg";

//Start Game button
document.getElementById("clickstart").onclick = function() {
    startGame();
};

function startGame() {
    function backgroundImage() {
        this.bgx = 0
        this.bgy = 0
        this.bgw = scene.width
        this.bgh = scene.height
        this.render = function() {
            ctx.drawImage(scene, this.bgx--, 0);
            if (this.bgx <= -605) {
                this.bgx = 0;
            }
        }


    }
    var background = new backgroundImage();

    //Drawing in my Character
    var character1 = new Image();
    character1.src = "images/character0.png";

    function createCharacter() {
        this.drawchar = function() {
            ctx.drawImage(character1, this.charx, this.chary);
        }
    }

    //Space Rocks - They wont end the game but may throw you off.
    var obstacle1 = new Image();
    obstacle1.src = "images/spacerocks.png";


    function obstacles() {
        this.planex = 599;
        this.planey = Math.floor(Math.random() * 500);
        this.draw = function() {
            ctx.drawImage(obstacle1, this.planex -= 3, this.planey);
            if (this.planex <= 0) {
                this.planex = 599;
                this.planey = Math.floor(Math.random() * 500);
            }
        }

    }

    //Ufo flying - Will definitely end the game
    var myobstacle = new obstacles();

    var badguys = [];
    for (var i = 0; i < 2; ++i) {
        badguys[i] = new obstacles();

    }

    //obstacle2
    var obstacle2 = new Image();
    obstacle2.src = "images/ufo.png";


    function obstacles2() {
        this.drawobstacles = function() {
            ctx.drawImage(obstacle2, this.planex2--, this.planey2);
            if (this.planex2 <= 0) {
                planex2 = 599;
            }
        }
    }

    // stars for points - Character collects stars to make space popsicles.
    var popsiclepoints = new Image();
    popsiclepoints.src = "images/star.png";

    function createpoints() {
        this.drawpoints = function() {
            ctx.drawImage(popsiclepoints, this.pointsx--, this.pointsy);
            if (pointsx <= 0) {
                pointsx = 599;
            }
        }
    }
    //This happens when the game is over. 
    function displayResults() {
        var score = document.getElementById('score').innerHTML = i++;
        document.getElementById('test').innerHTML = "Game Over. Your Score was " + score;
        document.getElementById('myform').style.display = "block";
        document.getElementById('scoreComment').style.display = "";
        playerlisted();
    }
    //Creating and handling a data structure (JSON, custom objects, etc)
    function playerlisted() {
        var form = document.querySelector('form')
        var ul = document.querySelector('ul')
        var playerinput = document.getElementById('playername');
        let playersArray = localStorage.getItem('playername') ? JSON.parse(localStorage.getItem('playername')) : []

        localStorage.setItem('playername', JSON.stringify(playersArray))
        var data = JSON.parse(localStorage.getItem('playername'))
        //DOM element creation, deletion or modification
        var playerlist = text => {
            var li = document.createElement('li')
            li.textContent = text
            ul.appendChild(li)
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault()

            playersArray.push(playerinput.value)
            localStorage.setItem('playername', JSON.stringify(playersArray))
            playerlist(playerinput.value)
            playerinput.value = ''
        })

        data.forEach(playername => {
            playerlist(playername)
        })


    }

    //Reset Button
    document.getElementById("resetgame").onclick = function() {
        resetGame();
    };

    function resetGame() {
        document.location.reload(true);

    }

    //closures
    function step() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.render();
        createCharacter();
        drawchar();
        createpoints();
        drawpoints();
        obstacles2();
        drawobstacles();

        if (charx >= pointsx && chary >= pointsy && charx <= pointsx + popsiclepoints.width && chary <= pointsy + popsiclepoints.height) {
            console.log("you gotit")
            var score = document.getElementById('score').innerHTML = i++;

            pointsx = 599;
            pointsy = Math.floor(Math.random() * 300);
        }
        if (charx >= planex2 && chary >= planey2 && charx <= planex2 + obstacle2.width && planey2 <= planey2 + obstacle2.height) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var score = document.getElementById('score').innerHTML = i++;
            displayResults();



        } else {
            requestAnimationFrame(step);
        }

        badguys.forEach(function(myplanes) {
            myplanes.draw();
            if (this.planex <= 0) {
                this.planex = 799;
                this.planey = Math.floor(Math.random() * 500);
            };
        });

        //this keeps my character from going too far of the top and left side of the screen
        collect();

        function collect() {


            if (charx < 0) {
                charx = charx + 1
            };
            if (chary < 0) {
                chary = chary + 1
            };


        };

    };
    myReq = requestAnimationFrame(step);



    //Capturing and handling events (beyond just a “Do it!” button
    //Character Movement
    function moveMe(e) {
        var keys = event.key
        if (keys === 'a' || event.keyCode == 37) {
            charx -= 30;
        } else if (keys === 'w' || event.keyCode == 38) {
            chary -= 30;
        } else if (keys === 'd' || event.keyCode == 39) {
            charx += 30;
        } else if (keys === 's' || event.keyCode == 40) {
            chary += 30;
        }
    }


    document.addEventListener('keydown', moveMe);

}







