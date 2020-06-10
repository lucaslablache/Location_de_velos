class Canvas
{
    constructor()
    {
        this.canvas = $('#signature_');
        this.buttonClear = $('#clearCanvas');
        this.draw = false;
        this.drawn = false;
        this.cursorX = 0;
        this.cursorY = 0;

        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        this.context = this.canvas[0].getContext("2d");

        this.context.strokeStyle = "#000000";
        this.context.lineJoin = "round";
        this.context.lineWidth = 3;

        //la souris est pressée
        this.canvas.mousedown(this.startDrawing.bind(this));
        this.canvas[0].addEventListener('touchstart', this.startDrawing.bind(this), false);
        // la souris se déplace
        this.canvas.mousemove(this.drawing.bind(this));
        this.canvas[0].addEventListener("touchmove", this.drawing.bind(this), false);

        //la souris n'est plus pressée
        this.canvas.mouseup(this.stopDrawing.bind(this));
        this.canvas[0].addEventListener("touchend", this.stopDrawing.bind(this), false);

        //le curseur sort du canvas
        this.canvas.mouseleave(this.stopDrawing.bind(this));

        //clear canvas
        this.buttonClear.on('click',this.clearCanvas.bind(this));
    }
    //fin contructor

    cursorCoord(x, y, deplacement)
    {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(deplacement);
    }

    clearCanvas()
    {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = new Array();
        this.drawn = false;
    }

    startDrawing(e)
    {
        e.preventDefault();
        this.draw = true;
        this.drawn = true;
        if (e instanceof TouchEvent)
        {
            let touches = e.changedTouches;
            this.cursorX = touches[0].pageX - this.canvasOffset.left;
            this.cursorY = touches[0].pageY - this.canvasOffset.top;
        }
        else
        {
            this.cursorX = e.offsetX;
            this.cursorY = e.offsetY;
        }
        this.cursorCoord(this.cursorX, this.cursorY);
        this.context.beginPath();
        this.context.moveTo(this.cursorX, this.cursorY);

    }

    drawing(e)
    {
        if (this.draw)
        {
            e.preventDefault();
            if (e instanceof TouchEvent)
            {
                let canvasOffset = this.canvas.offset();
                let touches = e.changedTouches;
                this.cursorX = touches[0].pageX - canvasOffset.left;
                this.cursorY = touches[0].pageY - canvasOffset.top;
            }
            else
            {
                this.cursorX = e.offsetX;
                this.cursorY = e.offsetY;
            }
            this.cursorCoord(this.cursorX, this.cursorY, true);
            this.context.lineTo(this.cursorX, this.cursorY);
            this.context.stroke();
        }
    }

    stopDrawing()
    {
        this.draw = false;
        this.context.closePath();
    }

    // vérification si on a dessiné sur le canvas
    isDrawn()
    {
        return this.drawn;
    }

    getOffset()
    {
        this.canvasOffset = this.canvas.offset();
    }
}
