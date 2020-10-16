import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import EditIcon from "@material-ui/icons/Edit";
export const articlesHeader = [
  { title: "Code", className: "" },
  { title: "Désignation", className: "big-part" },
  { title: "Unité", className: "medium-part" },
  { title: "T.V.A (%)", className: "" },
  { title: "PU HT", className: "" },
];
export const clientsHeader = [
  { title: "Code", className: "" },
  { title: "Raison Sociale", className: "medium-part" },
  { title: "Adresse", className: "big-part" },
  { title: "Solde Facture", className: "" },
  { title: "Solde Global", className: "" },
];
export const fournisseursHeader = [
  { title: "Code", className: "" },
  { title: "Raison Sociale", className: "medium-part" },
  { title: "Adresse", className: "big-part" },
  { title: "Solde Facture", className: "" },
  { title: "Solde Global", className: "" },
];

export const sidebarContent = [
  // {
  //   id: 0,
  //   title: "CAF",
  //   submenu: [
  //     {
  //       id: 0,
  //       title: "Fiche client",
  //       icon: <i className="fas fa-user"></i>,
  //     },
  //     {
  //       id: 1,
  //       title: "Fiche article",
  //       icon: <i className="fas fa-cube"></i>,
  //     },
  //     {
  //       id: 2,
  //       title: "Fiche fournisseur",
  //       icon: <i className="fas fa-shopping-cart"></i>,
  //     },
  //     // {
  //     //   title: "Commande client et devis"
  //     // }
  //   ],
  //   icon: <i class="fas fa-money-check-alt"></i>,
  //   isOpen: false,
  //   tabsData: [],
  // },

  {
    id: 0,
    title: "Vente",
    submenu: [
      {
        id: 0,
        title: "Devis",
        icon: <i className="fas fa-tasks"></i>,
      },
      {
        id: 1,
        title: "Bon de commande",
        icon: <i className="fas fa-clipboard-list"></i>,
      },
      {
        id: 2,
        title: "Bon de Livraison",
        icon: <i className="fas fa-list-alt"></i>,
      },
      {
        id: 3,
        title: "Facture",
        icon: <i className="fas fa-file-invoice-dollar"></i>,
      },
      {
        id: 4,
        title: "Avoir Client",
        icon: <i className="far fa-sticky-note"></i>,
      },
      {
        id: 5,
        title: "Bon De Retour",
        icon: <i className="far fa-sticky-note"></i>,
      },
    ],
    icon: <i class="fas fa-money-check-alt"></i>,
    isOpen: false,
    tabsData: [],
  },

  {
    id: 1,
    title: "Stock",
    submenu: [
      {
        id: 0,
        title: "Fiche Article",
        icon: <i className="fas fa-cube"></i>,
      },
      {
        id: 1,
        title: "Bon entree",
        icon: <i class="fa fa-share" aria-hidden="true"></i>,
      },
      {
        id: 1,
        title: "Bon de sortie",
        icon: <i class="fa fa-reply" aria-hidden="true"></i>,
      },
    ],
    icon: <i class="fas fa-money-check-alt"></i>,
    isOpen: false,
    tabsData: [],
  },

  {
    id: 2,
    title: "Suivi Banque",
    submenu: [
      {
        id: 0,
        title: "Reglement",
        icon: <i className="fab fa-dashcube"></i>,
      },
      {
        id: 1,
        title: "Reglement Fournisseur",
        icon: <i className="fab fa-dashcube"></i>,
      },
    ],
    icon: <i class="fas fa-money-check-alt"></i>,
    isOpen: false,
    tabsData: [],
  },

  {
    id: 3,
    title: "Parametres",
    submenu: [
      {
        id: 0,
        title: "Nomenclature",
        icon: <i class="far fa-plus-square"></i>,
      },
    ],
    icon: <i class="far fa-plus-square"></i>,
    isOpen: false,
    tabsData: [],
  },

  // {
  //   id: 1,
  //   title: "Gestion des stocks",
  //   submenu: [
  //     { title: "Nomenclature" },
  //     { title: "Fiche article" },
  //     { title: "Mouvements du stock" },
  //     { title: "Gestion des inventaires" }
  //   ],
  //   icon: <i class="fas fa-cubes"></i>,
  //   isOpen: false
  // },
  // {
  //   id: 0,
  //   title: "Suivi clientèle",
  //   submenu: [
  //     { title: "Nomenclature" },
  //     { title: "Gestion des articles" },
  //     { title: "Mouvements du stock" },
  //     { title: "Gestion des inventaires" }
  //   ],
  //   icon: <i class="fas fa-tasks"></i>,
  //   isOpen: false
  // },
  // {
  //   id: 0,
  //   title: "Achat ",
  //   submenu: [{ title: "Fiche fournisseur" }],
  //   icon: <i class="fas fa-shopping-cart"></i>,
  //   isOpen: false
  // },
  // {
  //   id: 0,
  //   title: "gestion de caisse",
  //   submenu: [
  //     { title: "Mouvement du caisse" },
  //     { title: "Gestion des articles" },
  //     { title: "Mouvements du stock" },
  //     { title: "Gestion des inventaires" }
  //   ],
  //   icon: <i class="fas fa-cash-register"></i>,
  //   isOpen: false
  // }
];

export const clientActions = [
  {
    icon: <i className="fas fa-print" style={{ fontSize: "20px" }}></i>,
    name: "Imprimer",
  },
  { icon: <EditIcon />, name: "modifier" },
  {
    icon: <i className="fas fa-trash-alt" style={{ fontSize: "20px" }}></i>,
    name: "Supprimer",
  },
  {
    icon: (
      <i className="fas fa-clipboard-list" style={{ fontSize: "20px" }}></i>
    ),
    name: "Devis",
  },
  {
    icon: <i class="fas fa-list-ul" style={{ fontSize: "20px" }}></i>,
    name: "Relevé ",
  },
  {
    icon: <i class="fas fa-list-ol" style={{ fontSize: "20px" }}></i>,
    name: "Relevé détaillé",
  },
  {
    icon: <i className="fas fa-calculator" style={{ fontSize: "20px" }}></i>,
    name: "Recalculer solde",
  },
  {
    icon: <i className="fas fa-shopping-cart" style={{ fontSize: "20px" }}></i>,
    name: "Bon de commande",
  },
  {
    icon: <i class="far fa-plus-square" style={{ fontSize: "20px" }}></i>,
    name: "Nomenclature",
  },
];

export const fournisseurActions = [
  { icon: <EditIcon />, name: "modifier" },
  {
    icon: <i className="fas fa-trash-alt" style={{ fontSize: "20px" }}></i>,
    name: "Supprimer",
  },
  {
    icon: <i className="fas fa-cube" style={{ fontSize: "20px" }}></i>,
    name: "Articles",
  },
  {
    icon: <i class="fas fa-list-ul" style={{ fontSize: "20px" }}></i>,
    name: "Relevé ",
  },
  {
    icon: <i class="fas fa-list-ol" style={{ fontSize: "20px" }}></i>,
    name: "Relevé détaillé ",
  },

  {
    icon: <i className="fas fa-tasks" style={{ fontSize: "20px" }}></i>,
    name: "Liste des pièces",
  },
];
export const categorieFiscaleOptions = [
  { number: 0, name: "Assujetti à la TVA" },
  { number: 1, name: "Non Assujetti à la TVA" },
  { number: 2, name: "Exonéré de la TVA et du FODEC (Export Total)" },
  { number: 3, name: "Exonéré de la TVA (Export Total)" },
  { number: 4, name: "Suspension de la TVA" },
  { number: 5, name: "Cession à Quai" },
  { number: 6, name: "Réduction de la TVA" },
];
export const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
