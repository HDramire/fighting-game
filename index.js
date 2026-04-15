// Copyright (c) 2026 Henry Ramirez. All rights reserved. Proprietary and confidential.
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    frameMax: 6,
    frameHold: 12
})

const player = new Fighter({
    position: {
        x: 140,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x:0,
        y:0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    frameMax: 8,
    scale: 2.5,
    frameHold: 6,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            frameMax: 8,
            frameHold: 9,
            offset: {
                x: 215,
                y: 157
            }
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            frameMax: 8,
            frameHold: 6,
            offset: {
                x: 215,
                y: 157
            }
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            frameMax: 2,
            frameHold: 8,
            offset: {
                x: 215,
                y: 157
            }
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            frameMax: 2,
            frameHold: 8,
            offset: {
                x: 215,
                y: 157
            }
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            frameMax: 6,
            frameHold: 5,
            offset: {
                x: 215,
                y: 157
            }
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            frameMax: 4,
            frameHold: 6,
            offset: {
                x: 215,
                y: 157
            }
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            frameMax: 6,
            frameHold: 7,
            offset: {
                x: 255,
                y: 157
            }
        }     
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 170,
        height: 50
    }
})



const enemy = new Fighter({
    position: {
    x: 760,
    y: 0
    },
    velocity: {
    x: 0,
    y: 0
    },
    color: 'blue',
    offset:{
        x: -50,
        y:0
    },
    imageSrc: './img/kenji/Idle.png',
    frameMax: 4,
    scale: 2.5,
    frameHold: 6,
    offset: {
        x: 238,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            frameMax: 4,
            frameHold: 9,
            offset: {
                x: 238,
                y: 167
            }
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            frameMax: 8,
            frameHold: 6,
            offset: {
                x: 228,
                y: 167
            }
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            frameMax: 2,
            frameHold: 8,
            offset: {
                x: 223,
                y: 167
            }
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            frameMax: 2,
            frameHold: 8,
            offset: {
                x: 229,
                y: 167
            }
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            frameMax: 4,
            frameHold: 5,
            offset: {
                x: 228,
                y: 167
            }
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            frameMax: 3,
            frameHold: 6,
            offset: {
                x: 228,
                y: 167
            }
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            frameMax: 7,
            frameHold: 7,
            offset: {
                x: 242,
                y: 167
            }
        }      
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false  
    },
    d: {
        pressed: false 
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }

}

decreaseTimer()

function animate() { 
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas. height)
    background.update()
    shop.update()
c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')   
    } else {
        player.switchSprite('idle')
    }

    // jumping
    if (player.velocity.y < 0 ){
        player.switchSprite('jump')
    }else if(player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')   
    } else {
        enemy.switchSprite('idle')
    }

      // jumping
      if (enemy.velocity.y < 0 ){
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // detect for collison & enemy gets hit
    if (
        reactangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking && 
        player.frameCurrent === 4
    ) {
        enemy.takeHit() 
        player.isAttacking = false

        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    //if player misses
    if (player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false
    }

    //this is where our player gets hit 
    if (
        reactangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking && 
        enemy.frameCurrent === 2
        ) {
            player.takeHit()
            enemy.isAttacking = false
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
    }

     //if player misses
     if (enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking = false
    }

    // End the game based on health
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player,enemy, timerId})
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead){

    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.jump()
            break
        case ' ': 
        player.attack()
        break
    }
}

    if(!enemy.dead){
    switch (event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey ='ArrowLeft'
            break
        case 'ArrowUp':
            enemy.jump()
            break
        case 'ArrowDown':
            enemy.attack()
            break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false  
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false  
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }

})
