class Slider
{
  constructor()
  {
    this.imgIndex = 0;
    this.lock = false;
    this.pause = false;
    this.keyPressed = '';
    this.oldImage = [];
    this.timerOn = setTimeout(this.auto.bind(this) ,5000);
    const buttonForward = document.getElementById("buttonForward");
    const buttonBackward = document.getElementById("buttonBackward");
    const buttonPause = document.getElementById("buttonPause");
    this.imagePause = buttonPause.firstElementChild;
    buttonForward.addEventListener("click", this.slideForward.bind(this));
    buttonBackward.addEventListener("click", this.slideBackward.bind(this));
    buttonPause.addEventListener("click", this.pauseSlider.bind(this));
    document.addEventListener('keyup', this.getKey.bind(this));
  }

  makeImageVisible(imgDiv)
  {
    imgDiv.classList.remove("d-none");
    imgDiv.classList.add("d-block");
  }

  makeImageDisapear()
  {
    this.lock = false;
    this.oldImage.classList.remove("d-block");
    this.oldImage.classList.add("d-none");
    this.oldImage.classList.remove('custom-absolute');
    this.oldImage.zIndex = '0';
    this.oldImage.style.marginLeft = '';
  }

  slide(nbre)
  {
    const table = document.getElementsByClassName("img-container");
    this.oldImage = table[this.imgIndex];
    let minusChar =
        (nbre === 1) ?
        '-' :
        '';
    this.oldImage.style.marginLeft = minusChar + this.oldImage.clientWidth + 'px';
    this.lock = true;
    this.oldImage.classList.add('custom-absolute');
    this.oldImage.addEventListener('transitionend', this.makeImageDisapear.bind(this), false);
    this.imgIndex += nbre;
    if (this.imgIndex >= table.length)
    {
      this.imgIndex = 0;
    }
    else if (this.imgIndex < 0)
    {
      this.imgIndex = table.length-1;
    }
    this.makeImageVisible(table[this.imgIndex]);
  }

  slideForward()
  {
      if (! this.lock)
      {
        this.slide(1);
      }
  }

  slideBackward()
  {
    if (! this.lock)
    {
      this.slide(-1);
    }
  }

  pauseSlider()
  {
      if (this.timerOn == null)
      {
          this.timerOn = setTimeout(this.auto.bind(this) ,5000);
          this.imagePause.classList.remove("fa-play-circle");
          this.imagePause.classList.add("fa-pause-circle");
      }
      else
      {
          clearTimeout(this.timerOn);
          this.timerOn = null;
          this.imagePause.classList.remove("fa-pause-circle");
          this.imagePause.classList.add("fa-play-circle");
      }
  }

  auto()
  {
    if (! this.lock)
    {
      this.slide(1);
    }
    if (this.timerOn)
    {
        this.timerOn = setTimeout(this.auto.bind(this) ,5000);
    }
  }

  getKey(e)
  {
      this.keyPressed = e.key;
      if (this.keyPressed === 'ArrowRight')
      {
          this.slideForward();
      }
      else if (this.keyPressed === 'ArrowLeft')
      {
          this.slideBackward();
      }
  }
}
