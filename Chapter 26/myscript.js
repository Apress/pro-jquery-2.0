var flowers = [
    ["Aster", "Daffodil", "Rose"],
    ["Peony", "Primula", "Snowdrop"],
    ["Carnation", "Lily", "Orchid"]
]

$("<div id=row3 class=drow/>").appendTo("div.dtable");

var fTemplate = $("<div class=dcell><img/><label/><input/></div>");

for (var row = 0; row < flowers.length; row++) {
    var fNames = flowers[row];

    for (var i = 0; i < fNames.length; i++) {
        fTemplate.clone().appendTo("#row" + (row + 1)).children()
            .filter("img").attr("src", fNames[i] + ".png").end()
            .filter("label").attr("for", fNames[i]).text(fNames[i]).end()
            .filter("input").attr({ name: fNames[i], value: 0 })
    }
}