class Formulaire
{
    constructor()
    {
        this.signature = $("#popUp");
        this.form = $("#form");
        this.formNom = $("#Nom");
        this.formPrenom = $("#Prenom");
        this.subbmitSignature = $("#subbmitSignature");
        this.reservationDisplay = $("#reservationDisplay");

        this.constanteTimer = 1200000; //en ms
        this.constanteNom = '';
        this.constantePrenom = '';


        if (sessionStorage.getItem("dateResa"))
        {
            this.getNom();
            this.getPrenom();
            this.dateReservation = new Date(sessionStorage.getItem("dateResa"));
            this.dateActuelle = new Date();
            let diff = this.dateActuelle - this.dateReservation;
            this.timer = new Date(this.constanteTimer - diff);
            if (this.timer > 0)
            {
                this.intervalHandler = setInterval(this.countdown.bind(this) ,1000);
            }
            else
            {
                this.hideTimer();
            }
        }
        else
        {
            this.hideTimer();
        }

        //popup de la signature
        this.form.submit(this.showSignature.bind(this));
        this.subbmitSignature.on("click", this.validateSignature.bind(this));

    }
    //fin constructor


    showSignature(event)
    {
        this.signature.removeClass( "d-none" ).addClass("d-absolute").addClass("d-flex");
        event.preventDefault();
        canvas.getOffset();
    }

    checkSignature()
    {
        if (canvas.isDrawn())
        {
            this.validateSignature.bind(this);
        }
        else
        {
            alert("Veuillez signer le canvas");
        }
    }

    validateSignature()
    {
        if (canvas.isDrawn())
        {
            this.signature.removeClass( "d-absolute" ).removeClass("d-flex").addClass("d-none");
            localStorage.setItem('nom', this.formNom.val());
            localStorage.setItem('prenom', this.formPrenom.val());
            this.getNom();
            this.getPrenom();
            this.dateReservation = new Date();
            sessionStorage.setItem("dateResa", this.dateReservation);
            this.idStation = station.getStationId();
            sessionStorage.setItem("infostation", this.idStation);

            this.timer = new Date(this.constanteTimer);
            this.intervalHandler = setInterval(this.countdown.bind(this) ,1000);
            this.refreshTimer();
        }
    }

    countdown()
    {
        this.timer.setSeconds(this.timer.getSeconds()-1);

        if (this.timer < 0)
        {
            clearInterval(this.intervalHandler);
            sessionStorage.clear();
            this.hideTimer();
        }
        else
        {
            this.refreshTimer();
        }
    }

    getMinutes()
    {
        return ("0" + this.timer.getMinutes()).slice(-2);
    }

    getSeconds()
    {
        return ("0" + this.timer.getSeconds()).slice(-2);
    }

    refreshTimer()
    {
        this.reservationDisplay[0].innerText =
            `Vous avez une réservation au nom de ${this.constanteNom} ${this.constantePrenom} pendant
            ${this.getMinutes()} : ${this.getSeconds()}`;
    }

    hideTimer()
    {
        this.reservationDisplay[0].innerText =
            "Il n'y a pas de réservation en cours";
    }

    getReservationId()
    {
        return sessionStorage.getItem("infostation");
    }

    getNom()
    {
        this.constanteNom = localStorage.getItem('nom');
        return this.constanteNom;
    }
    getPrenom()
    {
        this.constantePrenom =  localStorage.getItem('prenom');
        return this.constantePrenom;
    }
}
