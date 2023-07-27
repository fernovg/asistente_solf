/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
var persistenceAdapter = getPersistenceAdapter();
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const languageStrings = require('./localisation');
const asyncFunctions = require('./asyncFunctions');
const DOCUMENT_ID = "equipo";
const DOCUMENT_ID2 = "jugador";
const DOCUMENT_ID3 = "liga";
const DOCUMENT_ID4 = "tabla_pos";
const DOCUMENT_ID5 = "bienvenidaDocument";
const DOCUMENT_ID6 = "cancelar";
const DOCUMENT_ID7 = "parar";
const datasource = {
    "equipo": {
        "t1": "Nombre:",
        "nombre": "Barcelona",
        "t2": "Liga:",
        "liga": "Espanola",
        "imagenSource": "data:image/png;base64,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",
        "pie": "COMUDE"
    },
    "jugador": {
        "t1": "Nombre:",
        "nombre": "Leonel Messi",
        "t2": "Equipo:",
        "equipo": "Barcelona",
        "t3": "Goles:",
        "goles": "10",
        "imagenSource": "https://st1.uvnimg.com/98/f4/9b4500ef4da7a3129b32c906df97/lionel-messi.jpeg",
        "pie": "COMUDE"
    },
    "liga": {
        "t1": "Nombre:",
        "nombre": "Liga espanola",
        "t2": "Descripcion:",
        "liga": "De espana xD",
        "imagenSource": "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/09/22/15691844156647.jpg",
        "pie": "COMUDE"
    },
    "dataTable": {
        "type": "object",
        "back": "Back",
        "properties": {
            "headings": [],
            "rows": [
                {
                    "backgroundColor": "green",
                    "cells": [
                        {
                            "text": "",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "120%"
                        }
                    ]
                },
                {
                    "backgroundColor": "green",
                    "cells": [
                        {
                            "text": "",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "1",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "2",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "3",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "4",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "5",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "6",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "7",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "8",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "10",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "black",
                    "cells": [
                        {
                            "text": "10",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "4%"
                        },
                        {
                            "text": "Equipo",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "20%"
                        },
                        {
                            "text": "PJ",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%",
                            "textAlign": "center"
                        },
                        {
                            "text": "PG",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "PP",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GF",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "GE",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        },
                        {
                            "text": "Pts",
                            "istext": "True",
                            "backgroundColor": "white",
                            "color": "black",
                            "width": "10%"
                        }
                    ]
                },
                {
                    "backgroundColor": "green",
                    "cells": [
                        {
                            "text": "",
                            "istext": "True",
                            "backgroundColor": "green",
                            "color": "black",
                            "width": "120%"
                        }
                    ]
                }
            ]
        }
    },
    "Bienvenida": {
        "type": "object",
        "objectId": "detailImageRightSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.ibb.co/Vg20DDS/fondosolf2.png",
                    "size": "large"
                }
            ]
        },
        "title": "Sistema de organizacion de ligas de futbol",
        "image": {
            "contentDescription": "",
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": "Bienvenido"
            },
            "locationText": {
                "type": "PlainText",
                "text": "Enterate de lo que pasa en la liga"
            }
        },
        "logoUrl": {
            "sources": [
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                },
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                },
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                }
            ]
        }
    },
    "cancelar": {
        "type": "object",
        "objectId": "detailImageRightSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.ibb.co/Vg20DDS/fondosolf2.png",
                    "size": "large"
                }
            ]
        },
        "title": "Sistema de organizacion de ligas de futbol",
        "image": {
            "contentDescription": "",
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": "Cancelaste",
                "color": "violet"
            },
            "locationText": {
                "type": "PlainText",
                "text": "Haz decido cancelar!<br />Que tengas bonito dia, vuelve pronto<br />"
            }
        },
        "logoUrl": {
            "sources": [
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                },
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                },
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                }
            ]
        }
    },
    "parar": {
        "type": "object",
        "objectId": "detailImageRightSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.ibb.co/Vg20DDS/fondosolf2.png",
                    "size": "large"
                }
            ]
        },
        "title": "Sistema de organizacion de ligas de futbol",
        "image": {
            "contentDescription": "",
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": "Haz decido parar!",
                "color": "violet"
            },
            "locationText": {
                "type": "PlainText",
                "text": "Si gustas puedes volver a ejecutar la skill<br />"
            }
        },
        "logoUrl": {
            "sources": [
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                },
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                },
                {
                    "url": "https://i.ibb.co/CJCCdXg/lgn.png",
                    "size": "large"
                }
            ]
        }
    }
    
};


const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};


function getPersistenceAdapter() {
    // This function is an indirect way to detect if this is part of an Alexa-Hosted skill
    function isAlexaHosted() {
        return process.env.S3_PERSISTENCE_BUCKET ? true : false;
    }

    const tableName = 'equipo_table';
    if(isAlexaHosted()) {
        const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
        return new S3PersistenceAdapter({ 
            bucketName: process.env.S3_PERSISTENCE_BUCKET
        });
    } else {
        // IMPORTANT: don't forget to give DynamoDB access to the role you're to run this lambda (IAM)
        const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
        return new DynamoDbPersistenceAdapter({ 
            tableName: tableName,
            createTable: true
        });
    }
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    
    // Recuperar atributos guardados del PersistenceAdapter
    const persistentAttributes = await attributesManager.getPersistentAttributes();
    const equipoGuardado = persistentAttributes.equipoFavorito || {};

    let speakOutput = '';
    if (equipoGuardado.nombre && equipoGuardado.liga) {
      // Si hay un equipo guardado en los persistentAttributes, mostrarlo
      const equipoNombreGuardado = equipoGuardado.nombre;
      const equipoLigaGuardada = equipoGuardado.liga;
      speakOutput = `Bienvenido a solf. El equipo guardado es ${equipoNombreGuardado} y juega en la liga ${equipoLigaGuardada}.`;
    } else {
      // Si no hay equipo guardado, mostrar el mensaje de bienvenida predeterminado
      speakOutput = requestAttributes.t('WELCOME_MSG');
    }
    
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID5, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(requestAttributes.t('Promt_MSG'))
      .getResponse();
  },
};



// Handler para el intent de búsqueda de la liga de fútbol
const BuscarLigaFutbolHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ligasIntent';
    },
    async handle(handlerInput) {
        const nombreLiga = Alexa.getSlotValue(handlerInput.requestEnvelope, 'liga');
        const dliga = await asyncFunctions.buscarLigaFutbol(nombreLiga);

        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();

        const nombre = dliga.nombre;
        const descripcion = dliga.descripcion;
        
        let speechText = '';
        if (dliga) {
            // speechText = `Nombre: ${nombre}. Descripcion: ${descripcion}.`;
            speechText = requestAttributes.t('League_MSG', nombre, descripcion);
        } else {
            // speechText = `No se encontró ninguna liga de fútbol con ese nombre. ${dliga},   ${nombreLiga}`;
            speechText = requestAttributes.t('ErrorLeague');
        }
        
        const datasource = {
            liga: {
            t1: "Nombre:",
            nombre: nombre.toString(),
            t2: "Descripcion:",
            equipo: descripcion.toString(),
            imagenSource: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/09/22/15691844156647.jpg",
            pie: "COMUDE"
            }
        }
        
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID3, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
};

const buscarJugadorHandler = {
    canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'jugaIntent';
    },
    async handle(handlerInput){
        const nombreJugador = Alexa.getSlotValue(handlerInput.requestEnvelope, 'jugador');
        const djug = await asyncFunctions.buscarJugador(nombreJugador);

        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();

        const nombre = djug.nombre +" "+ djug.apellidoP +" "+ djug.apellidoM;
        const equipo = djug.equipo.nombre;
        const foto = djug.img;
        const goles = '';

        let speechText = '';
        if(djug){
            // speechText = `Nombre: ${djug.nombre} ${djug.apellidoP} ${djug.apellidoM}, Juega en: ${djug.equipo.nombre} con el dorsal numero, posición: posición, Cuenta con numero goles`;
            speechText = requestAttributes.t('Player_MSG', nombre , equipo);
        }else{
            speechText = requestAttributes.t('ErrorPlayer');
        }
        
        
        const datasource = {
            jugador: {
            t1: "Nombre:",
            nombre: nombre.toString(),
            t2: "Equipo:",
            equipo: equipo.toString(),
            t3: "Goles:",
            goles: "8",
            imagenSource: foto.toString(),
            pie: "COMUDE"
            }
        }
        
    
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID2, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        
        
        return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
};

const buscarEquipoHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'equipoIntent'
    );
  },
  async handle(handlerInput) {
    const nombreEquipo = Alexa.getSlotValue(
      handlerInput.requestEnvelope,
      'nomEquipo'
    );
    const dequip = await asyncFunctions.buscarEquipo(nombreEquipo);

    // Recuperar atributos guardados del PersistenceAdapter
    const { attributesManager } = handlerInput;
    const equipoGuardado = (await attributesManager.getPersistentAttributes()) || {};

    const nombre = dequip.nombre;
    const liga = dequip.liga.nombre;
    const logo = dequip.img;

    // Obtener requestAttributes para el manejo de los mensajes
    const requestAttributes = attributesManager.getRequestAttributes();

    let speechText = '';
    if (dequip) {
      speechText = requestAttributes.t('Team_MSG', nombre, liga);
    } else {
      speechText = requestAttributes.t('ErrorTeam');
    }

    // Verificar si existe un equipo antes de guardar sus atributos
    if (nombre && liga && logo) {
      // Guardar atributos en el PersistenceAdapter
      equipoGuardado.equipo = {
        nombre: nombre.toString(),
        liga: liga.toString(),
        imagenSource: logo.toString(),
      };
      attributesManager.setPersistentAttributes(equipoGuardado);
      await attributesManager.savePersistentAttributes();
    }

    // Mostrar el contenido de equipoGuardado en el speechText
    if (equipoGuardado.equipo) {
      const equipoNombreGuardado = equipoGuardado.equipo.nombre;
      const equipoLigaGuardada = equipoGuardado.equipo.liga;
      speechText += ` El equipo guardado es ${equipoNombreGuardado} y juega en la liga ${equipoLigaGuardada}.`;
    }

    const datasource = {
      equipo: {
        t1: 'Nombre:',
        nombre: nombre.toString(),
        t2: 'Liga:',
        liga: liga.toString(),
        imagenSource: logo.toString(),
        pie: 'COMUDE',
      },
    };

    if (
      Alexa.getSupportedInterfaces(
        handlerInput.requestEnvelope
      )['Alexa.Presentation.APL']
    ) {
      const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
      handlerInput.responseBuilder.addDirective(aplDirective);
    }

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const PreguntaEquipoFavoritoHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'preguntaEquipoFavoritoIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const sessionAttributes = attributesManager.getSessionAttributes();

    // Obtener el nombre del equipo favorito del slot del intent
    const nombreEquipo = Alexa.getSlotValue(handlerInput.requestEnvelope, 'nomEquipo');

    // Consultar el equipo utilizando el código que proporcionaste (asyncFunctions.buscarEquipo)
    const dequip = await asyncFunctions.buscarEquipo(nombreEquipo);

    // Recuperar atributos guardados del PersistenceAdapter
    const equipoGuardado = (await attributesManager.getPersistentAttributes()) || {};

    // Obtener los detalles del equipo (nombre, liga y logo)
    const nombre = dequip.nombre;
    const liga = dequip.liga.nombre;
    const logo = dequip.img;

    let speechText = '';
    if (dequip) {
      // Si el equipo existe en la consulta, mostrar los detalles
      speechText = requestAttributes.t('Team_MSG', nombre, liga);
    } else {
      // Si el equipo no existe, mostrar un mensaje de error
      speechText = requestAttributes.t('ErrorTeam');
    }

    // Verificar si existe un equipo antes de guardar sus atributos
    if (nombre && liga && logo) {
      // Guardar los atributos del equipo favorito en el PersistenceAdapter
      equipoGuardado.equipoFavorito = {
        nombre: nombre.toString(),
        liga: liga.toString(),
        imagenSource: logo.toString(),
      };
      attributesManager.setPersistentAttributes(equipoGuardado);
      await attributesManager.savePersistentAttributes();
    }

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};



const TablaPosicionesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'TablaPosicionesIntent';
    },
    async handle(handlerInput) {
        const nombreLiga = Alexa.getSlotValue(handlerInput.requestEnvelope, 'nombreLiga');
        const tablaPosiciones = await asyncFunctions.buscarTablaPosiciones(nombreLiga);

        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();

        let speechText = '';
        if (tablaPosiciones) {
        // speechText = `La tabla de posiciones de la liga ${nombreLiga} es la siguiente:\n\n`;

        speechText = requestAttributes.t('IniTabPos_MSG', nombreLiga);
        
        
        tablaPosiciones.forEach((equipoPosicion, index) => {
            const equipo = equipoPosicion.equipo;
            const PJ = equipoPosicion.PJ;
            const PG = equipoPosicion.PG;
            const PE = equipoPosicion.PE;
            const PP = equipoPosicion.PP;
            const GF = equipoPosicion.GF;
            const GC = equipoPosicion.GC;
            const puntos = equipoPosicion.Puntos;
            const pos = index + 1;
            
            try {
                    datasource.dataTable.properties.rows[index + 2].cells[1].text = equipo;
                    datasource.dataTable.properties.rows[index + 2].cells[2].text = PJ;
                    datasource.dataTable.properties.rows[index + 2].cells[3].text = PG;
                    datasource.dataTable.properties.rows[index + 2].cells[4].text = PP;
                    datasource.dataTable.properties.rows[index + 2].cells[5].text = PE;
                    datasource.dataTable.properties.rows[index + 2].cells[6].text = GF;
                    datasource.dataTable.properties.rows[index + 2].cells[7].text = GC;
                    datasource.dataTable.properties.rows[index + 2].cells[8].text = puntos;
            } catch (error) {
                
                console.error('Error al manipular el datasource:', error);
                const speechText = 'Ocurrió un error al mostrar la tabla de posiciones';
                    return handlerInput.responseBuilder.speak(speechText).getResponse();
        }

            // speechText += `Posición ${index + 1}: ${equipo}\n`;
            // speechText += `PJ: ${PJ}, PG: ${PG}, PE: ${PE}, PP: ${PP}\n`;
            // speechText += `GF: ${GF}, GC: ${GC}, Puntos: ${puntos}\n\n`;
            // speechText += `Con ${puntos} puntos\n\n`;
            speechText += requestAttributes.t('TablaPos_MSG', pos, equipo, puntos)
        });
        } else {
            // speechText = `No se encontró la tabla de posiciones para la liga ${nombreLiga}.`;
            speechText = requestAttributes.t('ErrorTablaPos', nombreLiga);
        }
          
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID4, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speakOutput = requestAttributes.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MSG');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_ID6, datasource);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const speakOutput = requestAttributes.t('Fall_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationRequestInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
        lng: handlerInput.requestEnvelope.request.locale,
        overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
        resources: languageStrings,
        returnObjects: true
        });
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
        return localizationClient.t(...args);
        }
    }
};


const LoadAttributesRequestInterceptor = {
    async process(handlerInput) {
        if(handlerInput.requestEnvelope.session['new']){ //is this a new session?
            const {attributesManager} = handlerInput;
            const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
            //copy persistent attribute to session attributes
            handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
        }
    }
};

const SaveAttributesResponseInterceptor = {
    async process(handlerInput, response) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession);//is this a session end?
        if(shouldEndSession || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest') { // skill was stopped or timed out            
            attributesManager.setPersistentAttributes(sessionAttributes);
            await attributesManager.savePersistentAttributes();
        }
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        BuscarLigaFutbolHandler,
        buscarJugadorHandler,
        buscarEquipoHandler,
        PreguntaEquipoFavoritoHandler,
        TablaPosicionesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
            .addRequestInterceptors(
        LocalizationRequestInterceptor,
        LoggingRequestInterceptor,
        LoadAttributesRequestInterceptor
        )
    .addResponseInterceptors(
        LoggingResponseInterceptor,
        SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(persistenceAdapter) 
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();