Exemple de data pour une OrderConfirmation :

const data = {
    "recipient": "recipient@example.com",
    "subject": "Confirmation de commande",
    "template": "orderConfirmation",
    "variables": {
        "name": "Pierre",
        "orderId": "123456789",
        "products": [
            {
                "name": "Produit 1",
                "price": 10,
                "ref": "00001"
            },
            {
                "name": "Produit 2",
                "price": 20,
                "ref": "00002"
            },
            {
                "name": "Produit 3",
                "price": 30,
                "ref": "00003"
            }
        ],
        "total": 60
    }
};

Pour l'instant c'est en post sur /sendmail.
