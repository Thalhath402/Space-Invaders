
const field = document.querySelector('.field')
let shipIndex=369
let width=20
let direction = 1
let aliensId
let goingRight = true
let aliensRemoved = []
let results = 0
var shoot=new Audio("audios/shoot.wav");
var explotion=new Audio("audios/explosion.wav");
var kill=new Audio("audios/boo.mp3");
var win=new Audio("audios/win.mp3");
var lose=new Audio("audios/lose.wav");


  for (let i = 0; i < 400; i++) {
      const square = document.createElement('div')
      field.appendChild(square)
    }

  const squares = Array.from(document.querySelectorAll('.field div'))

  const aliens = [
      0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
      20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,
      40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,
      60,61,62,63,64,65,66,67,68,69,70,71,72,73,74      
    ]

  function draw() {
    for (let i = 0; i < aliens.length; i++) { 
      if(!aliensRemoved.includes(i)){
        squares[aliens[i]].classList.add('alien')
        }       
      }
    }
    draw()

    function remove() {
      for (let i = 0; i < aliens.length; i++) {
        squares[aliens[i]].classList.remove('alien')
      }
    }
  
  squares[shipIndex].classList.add('ship')

// To Start Game

function start(e){

  // To Move the shooter     

        function moveShip(e) {
          squares[shipIndex].classList.remove('ship')
          switch(e.key) {
            case 'ArrowLeft':
              if (shipIndex % width !== 0) shipIndex -=1
              break
            case 'ArrowRight' :
              if (shipIndex % width < width -1) shipIndex +=1
              break
          }
          squares[shipIndex].classList.add('ship')
        }
        document.addEventListener('keydown', moveShip)

  // To move Aliens

        function moveAliens() {
          const leftEdge = aliens[0] % width === 0
          const rightEdge = aliens[aliens.length - 1] % width === width -1
          remove()
        
          if (rightEdge && goingRight) {
            for (let i = 0; i < aliens.length; i++) {
              aliens[i] += width +1
              direction = -1
              goingRight = false
            }
          }
        
          if(leftEdge && !goingRight) {
            for (let i = 0; i < aliens.length; i++) {
              aliens[i] += width -1
              direction = 1
              goingRight = true
            }
          }
        
          for (let i = 0; i < aliens.length; i++) {
            aliens[i] += direction
          }
          draw()

          if (squares[shipIndex].classList.contains('alien', 'ship')) {
            squares[shipIndex].classList.add('explotion')
            document.getElementById('result2').style.display="block"
            document.getElementById('result2').innerHTML = "GAME OVER ";            
            explotion.play()

            clearInterval(aliensId)
          }        
          
            if(aliens[29] > (shipIndex)) {
              document.getElementById('result2').style.display="block"
              document.getElementById('result2').innerHTML = "GAME OVER ";
              lose.play()

              clearInterval(aliensId)
            }
          
          if (aliensRemoved.length === aliens.length) {
            document.getElementById('result2').style.display="block"
            document.getElementById('result2').innerHTML = "YOU WON ";
            win.play()
            clearInterval(aliensId)
          }
        }
        aliensId = setInterval(moveAliens, 400)

  // for shooting

      function bullet(e) {
        let bulletId
        let bulletIndex = shipIndex
        function moveBullet() {
         
          squares[bulletIndex].classList.remove('bullet')
          bulletIndex -= width
          squares[bulletIndex].classList.add('bullet')
                        
          if (squares[bulletIndex].classList.contains('alien')) {
            squares[bulletIndex].classList.remove('bullet')
            squares[bulletIndex].classList.remove('alien')
            squares[bulletIndex].classList.add('explotion')
            kill.play()
            setTimeout(()=> squares[bulletIndex].classList.remove('explotion'), 300)
            clearInterval(bulletId)
      
            const alienRemoved = aliens.indexOf(bulletIndex)
            aliensRemoved.push(alienRemoved)
            results++
            document.getElementById("result").innerHTML ="Score:"+ results*2
               
          }
      
          }
          switch(e.key) {
            case 'ArrowUp':
              shoot.play()
              bulletId = setInterval(moveBullet,100)
          }
        }
        document.addEventListener('keydown', bullet)
        

  switch(e.key) {
    case 'Mouse':    
      break
  }
  document.getElementById('result2').style.display="none"

}
  document.getElementById('result2').style.display="block"
  document.getElementById('result2').innerHTML="Click The Mouse To Start The Game" 

  window.addEventListener('click', start)

//  To reset

  function reset(){
    location.reload()
  }