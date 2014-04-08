window.addEventListener("load", function(){
    if ($.datepicker) {
        $( "#datepicker-user" ).datepicker();
    }
    $("#reloadList").button().click(fillSheetList);
    $("#loadV").button().click(loadV);
    $("#loadNormalize").button().click(loadNormalize);
    fillSheetList();
});

function loadNormalize() {
    $("head").append("<link rel='stylesheet' type='text/css' href='css/normalize.css' />");    $("#loadV").remove();
    $("#loadNormalize").remove();
}
function loadV() {
    //build-master.jaspersoft.com:7580/jrs-pro-feature-amber-embedded-report/client/visualize.js
    $.getScript("//localhost:8080/jasperserver-pro/client/visualize.js", function(){
        createReport();
    });
    $("#loadV").remove();
}

function createReport() {
    //var uri="/public/Samples/Reports/9.CustomerDetailReport";
    var uri="/public/viz/twoTable";
    //var serverUrl = "http://build-master.jaspersoft.com:7580/jrs-pro-feature-amber-embedded-report";
    var serverUrl = "http://localhost:8080/jasperserver-pro";

    visualize(function (v) {
        v("#vis").report({
            server: serverUrl,
            resource: uri,
            error: function (err) {
                alert(err.message);
            }
        });

    });
}


function fillSheetList() {
    var sheets = $("link");
    var checkboxLI = '<li><input type="checkbox" id="#id"><label for="#id" title="#title">#label</label></li>',
        sheetPath = '',
        sheetPathSplitted = '',
        html = "";

    $("#sheetList").html("");

    for (var i = 0; i < sheets.length; i++) {

        if (sheets[i].href === null) continue;
        sheetPath = sheets[i].href;

        sheetPathSplitted = sheetPath.split("/");
        html = checkboxLI.replace(/#id/g, "sheetItem_"+i)
            .replace("#title", sheetPath)
            .replace("#label", sheetPathSplitted[sheetPathSplitted.length-1]);

        $("#sheetList").append(html);
        $("#sheetItem_"+i).button().click(function(e){
            var id = this.id.split("_")[1];
            $("link")[id].disabled = $(this).is(':checked');
        });
    }
    $( "#sheetList" ).tooltip({
        position: {
            my: "left+15 center",
            at: "right center"
        },
        tooltipClass: "text_hard_wrap"
    });
}