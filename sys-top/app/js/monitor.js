const path = require('path');
const { ipcRenderer } = require('electron');
const { cpu, mem, os } = require('node-os-utils');

let cpuOverload;
let alertFrequency;

ipcRenderer.on('settings:get', (e, settings) => {
  cpuOverload = +settings.cpuOverload;
  alertFrequency = +settings.alertFrequency;
});

function secondsToDhms(seconds) {
  const newSeconds = +seconds;
  const d = Math.floor(newSeconds / (3600 * 24));
  const h = Math.floor((newSeconds % (3600 * 24)) / 3600);
  const m = Math.floor((newSeconds % 3600) / 60);
  const s = Math.floor(newSeconds % 60);

  return `${d}d, ${h}h ${m}m ${s}s`;
}

setInterval(() => {
  cpu.usage().then(info => {
    document.getElementById('cpu-usage').innerText = `${info}%`;
    document.getElementById('cpu-progress').style.width = `${info}%`;

    if (info >= cpuOverload) {
      document.getElementById('cpu-progress').style.backgroundColor = 'red';
    } else {
      document.getElementById('cpu-progress').style.backgroundColor = '#30c88b';
    }

    if (info >= cpuOverload && runNotify(alertFrequency)) {
      notifyUser({
        title: 'CPU Overload',
        body: `CPU is over ${cpuOverload}`,
        icon: path.join(__dirname, 'img', 'icon.png'),
      });

      localStorage.setItem('lastNotify', +new Date());
    }
  });

  cpu.free().then(info => {
    document.getElementById('cpu-free').innerText = `${info}%`;
  });

  document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime());
}, 2000);

// set model
document.getElementById('cpu-model').innerText = cpu.model();

// computer name
document.getElementById('comp-name').innerText = os.hostname();

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// total memory
mem.info().then(info => {
  document.getElementById('mem-total').innerText = info.totalMemMb;
});

function notifyUser({ title, ...options }) {
  new Notification(title, options);
}

function runNotify(frequency) {
  if (!localStorage.getItem('lastNotify')) {
    localStorage.setItem('lastNotify', +new Date());
    return true;
  }

  const notifyTime = new Date(parseInt(localStorage.getItem('lastNotify')));
  const now = new Date();
  const diffTime = Math.abs(now - notifyTime);
  const minutesPassed = Math.ceil(diffTime / (1000 * 60));

  if (minutesPassed > frequency) {
    notifyUser({
      title: 'CPU Overload',
      body: `CPU is over ${cpuOverload}`,
      icon: path.join(__dirname, 'img', 'icon.png'),
    });

    localStorage.setItem('lastNotify', +new Date());
  }
}
