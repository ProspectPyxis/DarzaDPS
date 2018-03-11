// Various functions

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {
    enumerable: false
});

function advOptionsToggle(selector) {
    if (selector.checked)
        document.getElementById('advoptions').style.display = 'block';
    else {
        document.getElementById('advoptions').style.display = 'none';
        document.getElementById('empoweredmod').checked = false;
        document.getElementById('furymod').checked = false;
        document.getElementById('armpiercemod').checked = false;
        document.getElementById('weakenedmod').checked = false;
        document.getElementById('dazedmod').checked = false;
    }

}

function setBoxes(selector) {
    // This is gonna be the longest function for all the wrong reasons

    var weppresets = {
        T0Spell: {
            name: "Destruction Spell",
            tier: 0,
            dmgmin: 30,
            dmgmax: 50,
            shots: 1,
            firerate: 100
        },
        T1Spell: {
            name: "Neo Burst Spell",
            tier: 1,
            dmgmin: 35,
            dmgmax: 55,
            shots: 1,
            firerate: 100
        },
        T2Spell: {
            name: "Fire Blast Spell",
            tier: 2,
            dmgmin: 45,
            dmgmax: 60,
            shots: 1,
            firerate: 100
        },
        T3Spell: {
            name: "Void Spell",
            tier: 3,
            dmgmin: 50,
            dmgmax: 70,
            shots: 1,
            firerate: 100
        },
        T4Spell: {
            name: "Detonation Spell",
            tier: 4,
            dmgmin: 60,
            dmgmax: 80,
            shots: 1,
            firerate: 100
        },
        T5Spell: {
            name: "Elemental Spell",
            tier: 5,
            dmgmin: 70,
            dmgmax: 100,
            shots: 1,
            firerate: 100
        },
        T6Spell: {
            name: "Fire Nova Spell",
            tier: 6,
            dmgmin: 80,
            dmgmax: 115,
            shots: 1,
            firerate: 100
        },
        T7Spell: {
            name: "Astral Burst Spell",
            tier: 7,
            dmgmin: 90,
            dmgmax: 130,
            shots: 1,
            firerate: 100
        },
        T8Spell: {
            name: "Tablet of Eternal Flame",
            tier: 8,
            dmgmin: 110,
            dmgmax: 150,
            shots: 1,
            firerate: 100
        },
        T9Spell: {
            name: "Tablet of the Sun",
            tier: 9,
            dmgmin: 125,
            dmgmax: 165,
            shots: 1,
            firerate: 100
        },
        T10Spell: {
            name: "Tablet of Mysterious Energy",
            tier: 10,
            dmgmin: 140,
            dmgmax: 180,
            shots: 1,
            firerate: 100
        },
        T11Spell: {
            name: "Tablet of Pure Destruction",
            tier: 11,
            dmgmin: 140,
            dmgmax: 200,
            shots: 1,
            firerate: 100
        },
        ASTSpell: {
            name: "Ancient Stone Tablet",
            tier: -1,
            dmgmin: 650,
            dmgmax: 850,
            shots: 2,
            firerate: 25
        },
        SantaSpell: {
            name: "Santa's List",
            tier: -1,
            dmgmin: 0,
            dmgmax: 100,
            shots: 2,
            firerate: 125
        },

        T0Axe: {
            name: "Rusty Axe",
            tier: 0,
            dmgmin: 40,
            dmgmax: 90,
            shots: 1,
            firerate: 100
        },
        T1Axe: {
            name: "Iron Axe",
            tier: 1,
            dmgmin: 55,
            dmgmax: 105,
            shots: 1,
            firerate: 100
        },
        T2Axe: {
            name: "Gilded Axe",
            tier: 2,
            dmgmin: 70,
            dmgmax: 105,
            shots: 1,
            firerate: 100
        },
        T3Axe: {
            name: "Steel Axe",
            tier: 3,
            dmgmin: 70,
            dmgmax: 120,
            shots: 1,
            firerate: 100
        },
        T4Axe: {
            name: "Refined Axe",
            tier: 4,
            dmgmin: 65,
            dmgmax: 140,
            shots: 1,
            firerate: 100
        },
        T5Axe: {
            name: "Bluesteel Axe",
            tier: 5,
            dmgmin: 80,
            dmgmax: 140,
            shots: 1,
            firerate: 100
        },
        T6Axe: {
            name: "Golden Axe",
            tier: 6,
            dmgmin: 80,
            dmgmax: 155,
            shots: 1,
            firerate: 100
        },
        T7Axe: {
            name: "Bloodrazor",
            tier: 7,
            dmgmin: 110,
            dmgmax: 170,
            shots: 1,
            firerate: 100
        },
        T8Axe: {
            name: "Mithril Battleaxe",
            tier: 8,
            dmgmin: 180,
            dmgmax: 250,
            shots: 1,
            firerate: 100
        },
        T9Axe: {
            name: "Great Battleaxe",
            tier: 9,
            dmgmin: 200,
            dmgmax: 270,
            shots: 1,
            firerate: 100
        },
        T10Axe: {
            name: "Emerald Battleaxe",
            tier: 10,
            dmgmin: 210,
            dmgmax: 310,
            shots: 1,
            firerate: 100
        },
        GSlayerAxe: {
            name: "Giant Slayer Axe",
            tier: -1,
            dmgmin: 600,
            dmgmax: 700,
            shots: 1,
            firerate: 33
        },
        JowlAxe: {
            name: "Demon Jowl Axe",
            tier: -1,
            dmgmin: 70,
            dmgmax: 130,
            shots: 3,
            firerate: 125
        },

        T0Bow: {
            name: "Wood Bow",
            tier: 0,
            dmgmin: 10,
            dmgmax: 40,
            shots: 1,
            firerate: 100
        },
        T1Bow: {
            name: "Graywood Bow",
            tier: 1,
            dmgmin: 15,
            dmgmax: 45,
            shots: 1,
            firerate: 100
        },
        T2Bow: {
            name: "Reinforced Bow",
            tier: 2,
            dmgmin: 20,
            dmgmax: 50,
            shots: 1,
            firerate: 100
        },
        T3Bow: {
            name: "Iron Bow",
            tier: 3,
            dmgmin: 25,
            dmgmax: 55,
            shots: 1,
            firerate: 100
        },
        T4Bow: {
            name: "Long Bow",
            tier: 4,
            dmgmin: 25,
            dmgmax: 55,
            shots: 2,
            firerate: 100
        },
        T5Bow: {
            name: "Yew Bow",
            tier: 5,
            dmgmin: 45,
            dmgmax: 65,
            shots: 2,
            firerate: 100
        },
        T6Bow: {
            name: "Brownheart Bow",
            tier: 6,
            dmgmin: 55,
            dmgmax: 70,
            shots: 2,
            firerate: 100
        },
        T7Bow: {
            name: "Blackwood Bow",
            tier: 7,
            dmgmin: 60,
            dmgmax: 75,
            shots: 2,
            firerate: 100
        },
        T8Bow: {
            name: "Blood Bow",
            tier: 8,
            dmgmin: 55,
            dmgmax: 70,
            shots: 3,
            firerate: 100
        },
        T9Bow: {
            name: "Bow of the Morning Sun",
            tier: 9,
            dmgmin: 60,
            dmgmax: 75,
            shots: 3,
            firerate: 100
        },
        T10Bow: {
            name: "Bow of Enlightenment",
            tier: 10,
            dmgmin: 65,
            dmgmax: 75,
            shots: 3,
            firerate: 100
        },
        T11Bow: {
            name: "Bow of Exalted Magic",
            tier: 11,
            dmgmin: 70,
            dmgmax: 85,
            shots: 3,
            firerate: 100
        },
        OminBow: {
            name: "Ominous Bow",
            tier: -1,
            dmgmin: 60,
            dmgmax: 70,
            shots: 2,
            firerate: 165
        },
        BoneBow: {
            name: "Bow of Cadaverous Greed",
            tier: -1,
            dmgmin: 300,
            dmgmax: 400,
            shots: 1,
            firerate: 50
        },
        PumpkinBow: {
            name: "Bow of the Scarborough Hunt",
            tier: -1,
            dmgmin: 300,
            dmgmax: 400,
            shots: 1,
            firerate: 50
        },

        T0Dagger: {
            name: "Standard Dagger",
            tier: 0,
            dmgmin: 20,
            dmgmax: 50,
            shots: 1,
            firerate: 100
        },
        T1Dagger: {
            name: "Thief's Dagger",
            tier: 1,
            dmgmin: 20,
            dmgmax: 60,
            shots: 1,
            firerate: 100
        },
        T2Dagger: {
            name: "Rose Thorn Dagger",
            tier: 2,
            dmgmin: 30,
            dmgmax: 60,
            shots: 1,
            firerate: 100
        },
        T3Dagger: {
            name: "Iced Dagger",
            tier: 3,
            dmgmin: 30,
            dmgmax: 70,
            shots: 1,
            firerate: 100
        },
        T4Dagger: {
            name: "Golden Dagger",
            tier: 4,
            dmgmin: 40,
            dmgmax: 90,
            shots: 1,
            firerate: 100
        },
        T5Dagger: {
            name: "Jeweled Dagger",
            tier: 5,
            dmgmin: 60,
            dmgmax: 110,
            shots: 1,
            firerate: 100
        },
        T6Dagger: {
            name: "Silver Dagger",
            tier: 6,
            dmgmin: 80,
            dmgmax: 130,
            shots: 1,
            firerate: 100
        },
        T7Dagger: {
            name: "Quicksilver Dagger",
            tier: 7,
            dmgmin: 100,
            dmgmax: 150,
            shots: 1,
            firerate: 100
        },
        T8Dagger: {
            name: "Insidious Dagger",
            tier: 8,
            dmgmin: 120,
            dmgmax: 170,
            shots: 1,
            firerate: 100
        },
        T9Dagger: {
            name: "Rageblade Dagger",
            tier: 9,
            dmgmin: 140,
            dmgmax: 190,
            shots: 1,
            firerate: 100
        },
        T10Dagger: {
            name: "Dagger of Treacherous Whispers",
            tier: 10,
            dmgmin: 150,
            dmgmax: 210,
            shots: 1,
            firerate: 100
        },
        ElkenDagger: {
            name: "Elkendire Dagger",
            tier: -1,
            dmgmin: 140,
            dmgmax: 280,
            shots: 1,
            firerate: 100
        }
    };

    // Ugh with that out of the way
    // Gonna be way easier to add new presets later
    // This is clunky but hey when loading json is ridiculous what are you gonna do

    var hunter = selector.value;

    document.getElementById('weaponname').value = weppresets[hunter].name;
    document.getElementById('weptier').value = weppresets[hunter].tier;
    document.getElementById('mindamage').value = weppresets[hunter].dmgmin;
    document.getElementById('maxdamage').value = weppresets[hunter].dmgmax;
    document.getElementById('shotcount').value = weppresets[hunter].shots;
    document.getElementById('fireratepercent').value = weppresets[hunter].firerate;

}

function generateDamages(dmgmin, dmgmax, shots, firerate, atk, dex, armpierce, emp, fury, weak, daze) {

    // Let's explain the lots of parameters first
    // dmgmin and dmgmax is minimum damage and maximum damage in that order
    // shots is amount of shots per fire, firerate is self-explanatory
    // atk and dex are also self explanatory
    // armpierce is an optional boolean, says if weapon armor pierces or not
    // emp and fury are optional booleans, to say if empowered or fury is on respectively
    // same thing with weak and daze (dazed is basically weakened for dex, tentative name and calculation)

    if (typeof armpierce === 'undefined') {
        armpierce = false;
    }
    if (typeof emp === 'undefined') {
        emp = false;
    }
    if (typeof fury === 'undefined') {
        fury = false;
    }
    if (typeof weak === 'undefined') {
        weak = false;
    }
    if (typeof daze === 'undefined') {
        daze = false;
    }

    var piercemod = 1;
    var empmod = 1;
    var furymod = 1;
    var weakmod = 1;
    var dazemod = 1;

    if (armpierce === true) {
        piercemod = 0;
    }
    if (emp === true) {
        empmod = 1.5;
    }
    if (fury === true) {
        furymod = 1.5;
    }

    if (weak === true) {
        weakmod = 0;
        empmod = 1;
    }
    if (daze === true) {
        dazemod = 0;
        furymod = 1;
    }

    var dpsa = [];
    var dmgavg = (dmgmin + dmgmax) / 2;
    var dmgval = dmgavg * (0.5 + (atk / 50 * weakmod)) * empmod;
    var dexval = (2 + (6 * dex / 75 * dazemod)) * furymod;
    for (var c = 0; c < armarray.length; c++) {
        if (dmgval - (armarray[c] * piercemod) >= dmgval * 20 / 100)
            dpsa[c] = round((dmgval - (armarray[c] * piercemod)) * shots * (dexval * (firerate / 100)), 1);
        else
            dpsa[c] = round((dmgval * 20 / 100) * shots * ((2 + (6 * dex / 75)) * (firerate / 100)), 1);
        // This generates all the possible damages for each armor value up to 150
        // and puts it all in an array
        // Formula pieced together from the wiki, hopefully correct
    }
    return dpsa;
};

function pushNewDataset(ary, name, color) {

    // I'm not even gonna bother to explain this, too janky

    var dts = {
        data: ary,
        label: name,
        pointRadius: 0,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        lineTension: 0.19
    };

    var samedmgcounter = 0;
    for (var i = 0; i < tdata.datasets.length; ++i) {

        if (tdata.datasets[i].data.equals(ary))
            samedmgcounter++;
    }

    var samedmgcount = 0;

    for (var j = 0; j < tdata.datasets.length; ++j) {
        if (samedmgcounter === 0) break;

        if (tdata.datasets[j].data.equals(ary)) {
            if (!tdata.datasets[j].borderDash) tdata.datasets[j].borderDash = [15, 0];
            tdata.datasets[j].borderDash[1] = samedmgcounter * 15;
            if (!tdata.datasets[j].borderDashOffset) tdata.datasets[j].borderDashOffset = samedmgcount * 15;
            samedmgcount++;
        }
    }

    if (samedmgcounter !== 0) {
        dts.borderDash = [15, 0];
        dts.borderDash[1] = samedmgcounter * 15;
        dts.borderDashOffset = samedmgcount * 15;
    }

    tdata.datasets.push(dts);
    // datas.push(dts);

    // damagearray.push(ary);

    dpsChart.update();
}

function applyInputs() {

    var wepname = document.getElementById('weaponname').value;
    var wtier = parseInt(document.getElementById('weptier').value);
    var mindmg = parseInt(document.getElementById('mindamage').value);
    var maxdmg = parseInt(document.getElementById('maxdamage').value);
    var shotss = parseInt(document.getElementById('shotcount').value);
    var fr = parseInt(document.getElementById('fireratepercent').value);
    var attinput = parseInt(document.getElementById('attvalue').value);
    var dexinput = parseInt(document.getElementById('dexvalue').value);
    var colorinput = document.getElementById('linecolor').value;
    var emped = document.getElementById('empoweredmod').checked;
    var furyd = document.getElementById('furymod').checked;
    var piercd = document.getElementById('armpiercemod').checked;
    var weakd = document.getElementById('weakenedmod').checked;
    var dazd = document.getElementById('dazedmod').checked;

    for (var i = 0; i < tdata.datasets.length; ++i) {
        if (tdata.datasets[i].label === wepname) {
            window.alert("ERROR: You can't have two weapons with the same label!");
            return;
        }
    }

    pushNewDataset(generateDamages(mindmg, maxdmg, shotss, fr, attinput, dexinput, piercd, emped, furyd, weakd, dazd), wepname, colorinput);

    var wepdiv = document.createElement('div');
    wepdiv.className = 'wepodiv';
    document.getElementById('listcontainer').appendChild(wepdiv);

    var colbox = document.createElement('div');
    colbox.className = 'color-box';
    colbox.style = 'background-color: ' + colorinput;
    wepdiv.appendChild(colbox);

    var wepcont = document.createElement('div');

    var tier = '';
    if (wtier === -1) tier = 'UT';
    else tier = 'T' + wtier.toString();

    var damagemodifierarray = [];

    if (piercd === true) damagemodifierarray.push('Armor Piercing');
    if (emped === true) damagemodifierarray.push('Empowered');
    if (furyd === true) damagemodifierarray.push('Fury');
    if (weakd === true) damagemodifierarray.push('Weakened');
    if (dazd === true) damagemodifierarray.push('Dazed');

    var damagemodifiers = '';
    if (damagemodifierarray.equals([])) damagemodifiers = "</p><br/>";
    else damagemodifiers = "<br/><strong>" + damagemodifierarray.join(", ") + "</strong></p><br/>";

    wepcont.className = 'weaponcontainer';
    wepcont.innerHTML = '<strong>' + wepname + '</strong> ' + tier + '<br/>';
    wepcont.innerHTML += '<p><strong>Damage: </strong>' + mindmg.toString() + '-' + maxdmg.toString() + ' (' + ((mindmg + maxdmg) / 2).toString() + ')&emsp;' + '<strong>Shots: </strong>' + shotss.toString() + '&emsp;<strong>Firerate: </strong>' + fr.toString() + '%<br/><strong>Attack: </strong>' + attinput.toString() + '&emsp;<strong>Dexterity: </strong>' + dexinput.toString() + damagemodifiers;
    wepdiv.appendChild(wepcont);

    var clearingdiv = document.createElement('div');
    clearingdiv.style = 'clear:both;';
    wepdiv.appendChild(clearingdiv);

    $('#weprmselector').append($('<option>', {
        value: tdata.datasets.length,
        text: wepname + ' (' + tier + ')'
    }));

    if (document.getElementById('weprmselector').options.length > 1)
        $('#removebutton').prop('disabled', false);
}

function removeWeapon() {
    console.log(document.getElementById('weprmselector').value);
    var toremove = parseInt(document.getElementById('weprmselector').value) - 1;

    tdata.datasets.splice(toremove, 1);
    $('#listcontainer .wepodiv').eq(toremove).remove();
    dpsChart.update();

    $('#weprmselector option:selected').remove();
    $('#weprmselector option').each(function(index) {
        $(this).attr('value', index + 1);

    });

    if ($('#weprmselector option').length <= 0)
        $('#removebutton').prop('disabled', true);
}

// Set up an array with a value from 0 to 150
// This is basically all the possible armor values

var armarray = [];
for (var i = 0; i <= 150; i++) {
    armarray[i] = i;
}

// Graph Data

var weaponsarray = [];
var enemyarray = [{

}]

var tdata = {
    labels: armarray,
    datasets: []
};

var cconf = {
    type: 'line',
    data: tdata,
    options: {
        scales: {
            xAxes: [{
                id: 'xAxis1',
                gridLines: {
                    drawOnChartArea: false,
                    color: "#C1C1C1"
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 30,
                    maxRotation: 0,
                    fontColor: "#FFFFFF"
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Armor',
                    fontColor: "#FFFFFF"
                }
            }],
            yAxes: [{
                id: 'yaxis1',
                gridLines: {
                    color: "#C1C1C1"
                },
                ticks: {
                    fontColor: "#FFFFFF"
                },
                scaleLabel: {
                    display: true,
                    labelString: 'DPS',
                    fontColor: "#FFFFFF"
                }
            }]
        },
        legend: {
            display: false
        },
        tooltip: {
            mode: 'index',
            intersect: false
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        animation: {
            duration: 0
        },
        responsive: false
    }
};

// Another array for storing damage values
// var damagearray = [];

var ctx = document.getElementById('myChart');

let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function() {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function() {
            ctx.save();
            ctx.shadowColor = '#000';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            _stroke.apply(this, arguments)
            ctx.restore();
        }
    }
});

dpsChart = new Chart(ctx, cconf);
