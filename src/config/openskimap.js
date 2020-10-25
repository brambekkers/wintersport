export default {
    "tilejson": "2.2.0",
    "name": "openskimap",
    "description": "A map containing ski lifts and runs from OpenStreetMap.",
    "version": "1.0.0",
    "attribution": "<a href='http://openstreetmap.org'>OSM contributors</a>",
    "scheme": "xyz",
    "format":"pbf",
    type: "vector",
    "tiles": [
      "https://tiles.skimap.org/openskimap/{z}/{x}/{y}.pbf"
    ],
    "minzoom": 0,
    "maxzoom": 15,
    "vector_layers": [
      {
        "id": "runs",
        "description": "Ski trails. Can be a way or an area."
      },
      {
        "id": "lifts",
        "description": "Ski lifts"
      },
      {
        "id": "skiareas",
        "description": "Ski areas"
      }
    ]
  }