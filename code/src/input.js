class Input {
  constructor() {
    this.keys = {
      "up": false,
      "down": false,
      "left": false,
      "right": false,
      "space": false,
    }

    document.addEventListener("keydown", this.keyboardDown.bind(this), false);
    document.addEventListener("keyup", this.keyboardUp.bind(this), false);
  }

  keyboardUp(event) {
    const keyCode = event.which;

    if (keyCode == 65) {
      this.keys.left = false;
    }

    if (keyCode == 68) {
      this.keys.right = false;
    }

    if (keyCode == 83) {
      this.keys.down = false;
    }

    if (keyCode == 87) {
      this.keys.up = false;
    }

    if (keyCode == 32) {
      this.keys.space = false;
    }
  }

  keyboardDown(event) {
    const keyCode = event.which;

    if (keyCode == 65) {
      this.keys.left = true;
    }

    if (keyCode == 68) {
      this.keys.right = true;
    }

    if (keyCode == 83) {
      this.keys.down = true;
    }

    if (keyCode == 87) {
      this.keys.up = true;
    }

    if (keyCode == 32) {
      this.keys.space = true;
    }
  }
}

export default Input;
