(function () {
  'use strict';

  var capacityInput = document.getElementById('capacityInput');
  var voltageInput = document.getElementById('voltageInput');
  var powerInput = document.getElementById('powerInput');
  var reserveInput = document.getElementById('reserveInput');
  var speedInput = document.getElementById('speedInput');

  var flightTimeOut = document.getElementById('flightTimeOut');
  var rangeOut = document.getElementById('rangeOut');
  var totalWhEl = document.getElementById('totalWh');
  var usableWhEl = document.getElementById('usableWh');

  function num(input) {
    var v = parseFloat(input.value);
    return isNaN(v) ? 0 : v;
  }

  function calc() {
    var capacityMah = num(capacityInput);
    var voltage = num(voltageInput);
    var power = num(powerInput) || 1;
    var reservePct = num(reserveInput);
    var speed = num(speedInput);

    var totalWh = (capacityMah / 1000) * voltage;
    var usableWh = totalWh * (1 - reservePct / 100);
    var flightMinutes = (usableWh / power) * 60;
    var rangeKm = (flightMinutes / 60) * speed;

    totalWhEl.textContent = totalWh.toFixed(1) + ' Wh';
    usableWhEl.textContent = usableWh.toFixed(1) + ' Wh';
    flightTimeOut.textContent = flightMinutes.toFixed(1) + ' 分钟';
    rangeOut.textContent = rangeKm.toFixed(1) + ' km';
  }

  [capacityInput, voltageInput, powerInput, reserveInput, speedInput].forEach(function (el) {
    el.addEventListener('input', calc);
  });

  document.querySelectorAll('.preset-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      powerInput.value = btn.dataset.power;
      calc();
    });
  });

  calc();
})();
