(async() => {
    // (Object) -> { sigla: string, nome: string }
    const optiontag = ({ sigla, nome }) => `<option value=${sigla}>${nome}</option>`

    // (Array, String)
    const filterRegion = (states, sigla) => 
        states.filter(state => state.regiao.sigla === sigla).sort((state1, state2) => {
            if(state1.nome > state2.nome)
                return 1
            if(state1.nome < state2.nome)
                return -1
            
            return 0
        })        

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

    const regions = {
        centerwest: { label: 'Região Centro-Oeste', states: filterRegion(states, 'CO') },
        northeast: { label: 'Região Nordeste', states: filterRegion(states, 'NE') },
        north: { label: 'Região Norte', states: filterRegion(states, 'N') },
        southeast: { label: 'Região Sudeste', states: filterRegion(states, 'SE') },
        south: { label: 'Região Sul', states: filterRegion(states, 'S') },
    }

    Object.keys(regions).forEach(key => {
        const region = regions[key]
        
        const optgroup = createOptGroup(region.label, region.states.map(state => optiontag(state)))

        addOptGroup(optgroup)
    })
})()