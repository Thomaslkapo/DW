(async() => {
    // (Object) -> { sigla: string, nome: string }
    const optiontag = ({ sigla, nome }, selected) => `<option value=${sigla}>${nome}</option>`

    // (Array, String)
    const filterRegion = (states, sigla) =>  
        states.filter(state => state.regiao.sigla === sigla)
              .sort(({ nome: nome1 }, { nome: nome2 }) => nome1.localeCompare(nome2))

    // (String, Array) 
    const createOptGroup = (region, options) => {
        const optgroup = document.createElement('optgroup')

        optgroup.innerHTML += options.join('\n')
        optgroup.label = region

        return optgroup
    }

    // (String)
    const addOptGroup = optgroup => {
        const selectContainer = document.querySelector('#uf')
        const children = [...selectContainer.children]

        children.includes(optgroup) || selectContainer.append(optgroup)
    }

    const states = await (await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')).json()

    const regions = [
        { label: 'Região Centro-Oeste', states: filterRegion(states, 'CO') },
        { label: 'Região Nordeste', states: filterRegion(states, 'NE') },
        { label: 'Região Norte', states: filterRegion(states, 'N') },
        { label: 'Região Sudeste', states: filterRegion(states, 'SE') },
        { label: 'Região Sul', states: filterRegion(states, 'S') },
    ]
  
    regions.forEach(region => {
        const optgroup = createOptGroup(region.label, region.states.map(state => optiontag(state)))

        addOptGroup(optgroup)
    })
})()