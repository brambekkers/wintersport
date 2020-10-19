export default {
    state: {
        skibus: [
            {
                name: "Lengau",
                number: 25,
                pos: { lat: 47.372473, lng: 12.537902 },
                line: [5, 6]
            },
            {
                name: "Wallegg",
                number: 24,
                pos: { lat: 47.373733, lng: 12.546353 },
                line: [5, 6]
            },
            {
                name: "Kolling",
                number: 23,
                pos: { lat: 47.374228, lng: 12.55787 },
                line: [5, 6]
            },
            {
                name: "Hochalmbahnen",
                number: 22,
                pos: { lat: 47.375204, lng: 12.561837 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Zwölfer-Nordbahn",
                number: 21,
                pos: { lat: 47.375279, lng: 12.565743 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Reichkendl",
                number: 20,
                pos: { lat: 47.375114, lng: 12.568041 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Lindlinghof",
                number: 19,
                pos: { lat: 47.375266, lng: 12.575144 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Stererfeldweg",
                number: 18,
                pos: { lat: 47.375874, lng: 12.582853 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Wiesern",
                number: 17,
                pos: { lat: 47.376632, lng: 12.587035 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Hinterglemm West (Zwölferkogel)",
                number: 16,
                pos: { lat: 47.376921, lng: 12.58899 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Hinterglemm Ost (Ellmauweg)",
                number: 15,
                pos: { lat: 47.380909, lng: 12.601657 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Hotel Theresia/Mitteregglift (Wiesenegg)",
                number: 14,
                pos: { lat: 47.382762, lng: 12.605067 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Linzerhaus",
                number: 13,
                pos: { lat: 47.384299, lng: 12.610886 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Seighof-Barbarahof (Seigweg)",
                number: 12,
                pos: { lat: 47.387453, lng: 12.617508 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Steinachbrücke",
                number: 11,
                pos: { lat: 47.388886, lng: 12.623396 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Siegmundshof",
                number: 10,
                pos: { lat: 47.390609, lng: 12.628485 },
                line: [2, 3, 5, 6]
            },
            {
                name: "Saalbach (Schattberg X-press)",
                number: 9,
                pos: { lat: 47.389796, lng: 12.635150 },
                line: [1, 2, 3, 5, 6]
            },
            {
                name: "Tourismusverband",
                number: 8,
                pos: { lat: 47.389192, lng: 12.640702 },
                line: [1, 5, 6]
            },
            {
                name: "Ronachgründe",
                number: 7,
                pos: { lat: 47.388543, lng: 12.645527 },
                line: [1, 5, 6]
            },
            {
                name: "Bergerkreuz",
                number: 6,
                pos: { lat: 47.386669, lng: 12.650634 },
                line: [1, 5, 6]
            },
            {
                name: "Rauchenbach",
                number: 5,
                pos: { lat: 47.384444, lng: 12.659970 },
                line: [1, 5, 6]
            },
            {
                name: "Reitermühle (Müllauerhof, Salitererhof)",
                number: 4,
                pos: { lat: 47.383459, lng: 12.665111 },
                line: [1, 5, 6]
            },
            {
                name: "Reitermühlsiedlung",
                number: 3,
                pos: { lat: 47.380448, lng: 12.670722 },
                line: [1, 5, 6]
            },
            {
                name: "Schönleitenbahn",
                number: 2,
                pos: { lat: 47.379357, lng: 12.676792 },
                line: [1, 5, 6, 7]
            },
            {
                name: "Jausern-Vorderglemm",
                number: 1,
                pos: { lat: 47.378492, lng: 12.681162 },
                line: [7]
            },
        ],
    },
    getters: {
        skibus(state) {
            return state.skibus;
        },

    },
    mutations: {


    },
    actions: {

    }
}