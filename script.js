const message = 'Table'

document.querySelector('#header').innerHTML = message

function loadData(url, onSuccess, onError) {
  const Http = new XMLHttpRequest()
  Http.open('GET', url, true)

  Http.onload = function () {
    if (Http.status === 200) {
      const data = JSON.parse(Http.responseText)
      onSuccess(data)
    } else {
      onError(Http.statusText)
    }
  };

  Http.onerror = function () {
    onError('Network error')
  }

  Http.send()
}

function loadTable(data) {
  const tableBody = document.querySelector('tbody')
  tableBody.innerHTML = ''

  data.forEach((row) => {
    const tr = document.createElement('tr')
    tableBody.appendChild(tr)

    Object.values(row).forEach((value) => {
      const td = document.createElement('td')
      td.textContent = value
      tr.appendChild(td)
    })
  })
}

function showError(message) {
  const error = document.createElement('div')
  error.className = 'error'
  error.textContent = message
  document.body.insertBefore(error, document.body.firstChild)
}

loadData('https://jsonplaceholder.typicode.com/posts', loadTable, showError);
