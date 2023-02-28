const container = document.querySelector('#example1');
const exampleConsole = document.querySelector('#output');
const autosave = document.querySelector('#autosave');
const load = document.querySelector('#load');
const save = document.querySelector('#save');

const hot = new Handsontable(container, {
  startRows: 8,
  startCols: 8,
  rowHeaders: true,
  colHeaders: [
    "id",
    "Company name",
    "Name",
    "Age",
    "Position",
    "Proggramming language",
    "Programming Framework",
    "Current address"
  ],
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  afterChange: function (change, source) {
    if (source === 'loadData') {
      return; //don't save this change
    }
y

    if (!autosave.checked) {
      return;
    }

    const data = hot.getData();
    localStorage.setItem('example1', JSON.stringify(data));

    exampleConsole.innerText = `Autosaved (${changes.length} cell${changes.length > 1 ? 's' : ''})`;
  }
});

load.addEventListener('click', () => {
  const data = localStorage.getItem('example1');
  if (data) {
    hot.loadData(JSON.parse(data));
    exampleConsole.innerText = 'Data loaded';
  }
});
save.addEventListener('click', () => {
  // save all cell's data
  fetch('https://handsontable.com/docs/scripts/json/save.json', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: hot.getData() })
  })
    .then(response => {
      exampleConsole.innerText = 'Data saved';
      console.log('The POST request is only used here for the demo purposes');
    });
});

autosave.addEventListener('click', () => {
  if (autosave.checked) {
    exampleConsole.innerText = 'Changes will be autosaved';
  } else {
    exampleConsole.innerText ='Changes will not be autosaved';
  }
});