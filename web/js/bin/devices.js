var devices = [];

function loadDevices() {
    getServerDevices(() => {
        var maintable = document.getElementById("maintable")
        maintable.innerHTML = "";
        maintable.setAttribute("style", "background-color:#303030;width:auto");

        for (var y = 0; y < devices.length; y++) {
            var tr = document.createElement('tr');
            tr.setAttribute('style', 'padding:0px;margin:0px; width:100%;height:100%;')

            var index = y;
            if (index < devices.length) {
                tr.appendChild(new_dev(devices[index]));
                tr.appendChild(new_dev_control(devices[index]));
            }
        }
        maintable.appendChild(tr);

    })
}

function new_dev(device) {
    var td = document.createElement('td');
    td.setAttribute("style", "background-image:url(../../img/dev/" + device.ID + ".png);background-repeat: no-repeat;background-size: 200px 200px;height:200px;vertical-align: top;")
    var htm = "<div style='float:right'>";

    if (device.active) {
        htm += "<table class='table_tr' style=''>";
        td.setAttribute('class', 'table_tr');
    } else {
        htm += "<table style=''>";
    }
    htm += "<tr><td><div style='float:right;'><b style='font-size:14pt;color:white'>UUID: </td><td><b style='font-size:10pt;color:white'>" + device.UUID + "</td></tr><tr>";
    htm += "<tr><td><div style='float:right;'><b style='font-size:14pt;color:white'>Ativo: </td><td><b style='font-size:10pt;color:white'>" + device.active + "</td></tr><tr>";
    htm += "<tr><td><div style='float:right;'><b style='font-size:14pt;color:white'>Queue: </td><td></td></tr><tr>";
    for (var i = 0; i < device.queue.length; i++) {
        htm += "<tr><td></td><td><b style='font-size:10pt;color:white'>[" + i + "]: " + device.queue[i] + "</td></tr><tr>";
    }
    td.innerHTML = htm;

    return td;
}

function new_dev_control(device) {
    var td = document.createElement('td');
    td.setAttribute("style", "background-image:url(../../img/dev/" + device.ID + ".png);background-repeat: no-repeat;background-size: 200px 200px;height:200px;vertical-align: top;")
    var htm = "<div style='float:right'>";

    if (device.active) {
        htm += "<table class='table_tr' style=''>";
        td.setAttribute('class', 'table_tr');

        htm += "<tr><td><div style='float:right;'><b style='font-size:14pt;color:white'>Commands: </td><td></td></tr><tr>";
        for (var i = 0; i < device.Specs.Commands.length; i++) {
            htm += "<tr><td></td><td><div class='button' onClick='sendcommand(\"" + device.Specs.Commands[i].Name + "\",\"" + device.UUID + "\")' title='" + device.Specs.Commands[i].Description + "'><center><b style='font-size:14pt;color:white'>" + device.Specs.Commands[i].Name + "</div></td></tr><tr>";
        }
        td.innerHTML = htm;
    }
    return td;
}



function getServerDevices(callback) {

    var location = "http://192.168.130.30:8080/api/loaddevices";

    $.post(location, {}, function (result) {
        devices = result;
        console.log(devices)
        callback();
        setTimeout(() => {
            loadDevices();
        }, 1000);
    });
}

function sendcommand(command, UUID) {

    var location = "http://192.168.130.30:8080/api/input";

    $.post(location, { UUID: UUID, commands: command }, function (result) {
        console.log(result);
    });
}