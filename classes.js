class Sprite {
    constructor({
      position, 
      imageSrc, 
      scale = 1, 
      frameMax = 1, 
      offset = {x: 0, y: 0}
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 5
        this.offset = offset

    }
  draw() {
    c.drawImage(
        this.image,
        this.frameCurrent * (this.image.width / this.frameMax),
        0,
        this.image.width / this.frameMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.frameMax) * this.scale,
        this.image.height *this.scale 
        )
  } 

  animateFrames() {
      this.frameElapsed++

    if (this.frameElapsed % this.frameHold === 0){
      if (this.frameCurrent < this.frameMax - 1){
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }


  update () {
      this.draw()
      this.animateFrames()
  }
}

class Fighter extends Sprite{
    constructor({position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = {x:0, y:0},
        sprites,
        attackBox = { offset: {}, width: undefined, hegiht: undefined }
    }) {
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 5
        this.sprites = sprites
        this.dead = false

        for (const sprite in sprites) {
          sprites[sprite].image = new Image()
          sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites)
    }

  update () {
      this.draw()
      if (!this.dead) this.animateFrames()

      //attack boxes
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y
      
      // draw the attack box
      // c.fillRect(
      //   this.attackBox.position.x, 
      //   this.attackBox.position.y, 
      //   this.attackBox.width, 
      //   this.attackBox.height
      // )

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      
      if (this.position.y + this.height+ this.velocity.y >= canvas.height - 96) {
        this.velocity.y = 0
        this.position.y = 330
      } else this.velocity.y += gravity
      
  }
  attack () {
    this.switchSprite('attack1')
    this.isAttacking = true
  }

  takeHit() {
    this.health -= 20

    if (this.health <= 0) {
      this.switchSprite ('death')
    } else this.switchSprite('takeHit')
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image){
      if (this.frameCurrent === this.sprites.death.frameMax - 1) 
      this.dead = true
     return
    } 
    // overriding all other animations with the attack animation
    if (
      this.image == this.sprites.attack1.image && 
      this.frameCurrent < this.sprites.attack1.frameMax - 1
    ) 
        return

    // overriding when fighter gets hit
    if (
      this.image == this.sprites.takeHit.image && 
      this.frameCurrent < this.sprites.takeHit.frameMax - 1
    ) 
      return

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image){
        this.image = this.sprites.idle.image
        this.frameMax = this.sprites.idle.frameMax
        this.frameCurrent = 0
        }
        break
      case 'run':
        if(this.image !== this.sprites.run.image){
        this.image = this.sprites.run.image
        this.frameMax = this.sprites.run.frameMax
        this.frameCurrent = 0
        }
        break
      case 'jump':
        if(this.image !== this.sprites.jump.image){
        this.image = this.sprites.jump.image
        this.frameMax = this.sprites.jump.frameMax
        this.frameCurrent = 0
        }
        break
        case 'fall':
          if(this.image !== this.sprites.fall.image){
          this.image = this.sprites.fall.image
          this.frameMax = this.sprites.fall.frameMax
          this.frameCurrent = 0
          }
          break
        case 'attack1':
          if(this.image !== this.sprites.attack1.image){
          this.image = this.sprites.attack1.image
          this.frameMax = this.sprites.attack1.frameMax
          this.frameCurrent = 0
          }
          break
          case 'takeHit':
            if(this.image !== this.sprites.takeHit.image){
            this.image = this.sprites.takeHit.image
            this.frameMax = this.sprites.takeHit.frameMax
            this.frameCurrent = 0
            }
            break
            case 'death':
              if(this.image !== this.sprites.death.image){
              this.image = this.sprites.death.image
              this.frameMax = this.sprites.death.frameMax
              this.frameCurrent = 0
              }
              break
    }
  }
}