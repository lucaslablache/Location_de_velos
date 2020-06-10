class Station
{
    constructor()
    {
        this.divReservation = $("#infoMarker");
        this.pVille = $("#villeReservation");
        this.pAdresse = $("#adresseReservation");
        this.pVelo = $("#veloReservation");
        this.button = $("#popSignature");
        this.fieldNom = $("#Nom");
        this.fieldPrenom = $("#Prenom");
        this.data = null;
    }
    //fin constructor

    showForm(data)
    {
        this.fieldNom.val(formulaire.getNom());
        this.fieldPrenom.val(formulaire.getPrenom());
        this.divReservation.removeClass( "d-none" ).addClass("d-block");

        if (data.totalStands.availabilities.bikes === 0)
        {
            this.button[0].setAttribute("disabled", "disabled");
            this.button.removeClass( "btn-primary" ).addClass("btn-secondary");
        }
        else
        {
            this.button[0].removeAttribute("disabled", "disabled");
            this.button.removeClass( "btn-secondary" ).addClass("btn-primary");
        }
    }

    display(data)
    {
        this.data = data;
        this.pVille.text("Ville : " + data.contractName);
        this.pAdresse.text("Adresse : " + (data.address ? data.address : "non renseignée"));
        if (formulaire.getReservationId() == this.getStationId())
        {
            this.newBikesAvailable = this.data.totalStands.availabilities.bikes-1;
            this.pVelo.text("il y a " + this.newBikesAvailable + " velos disponibles");
        }
        else
        {
            this.pVelo.text("il y a " + data.totalStands.availabilities.bikes + " velos disponibles");
        }
        this.showForm(data);
    }

    getStationId()
    {
        return this.data.contractName + ' ' + this.data.name;
    }
}
