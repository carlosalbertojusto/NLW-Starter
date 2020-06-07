

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`

      }

    })
}
populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true


  fetch(url)
    .then(res => res.json())
    .then(cities => {

      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`

      }
      citySelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


//  Collect items
//  Take all of li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem() {
  const itemLi = event.target

  // add or remove a class with javaScript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  //console.log('ITEM ID: ', itemId)

  // check for selected items, if yes, 
  //choose those selected items

  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item === itemId
    return itemFound
  })


  // if it is already selected, uncheck
  if (alreadySelected >= 0) {
    //uncheck
    const filteredItems = selectedItems.filter(item => {

      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems

  } else {
    // if it isn't already selected, adcheck a selection
    selectedItems.push(itemId)

  }
  //console.log('selectedItems: ', selectedItems)
  // refresh the hidden field with the items selected
  collectedItems.value = selectedItems
}

