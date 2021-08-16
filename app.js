const $ = document.querySelector.bind(document)

const button = $('button')

const body = $('body')

const getLink =  async() => {
    let fetchAPI = await fetch ('https://apple-resell-store.herokuapp.com/getlink')

    let JSONData = await fetchAPI.json()

    let {link } = JSONData

    return link
}

const injectLink = (link = '')=>{
    body.innerHTML  = `<a href="${link}">Linkk here </a>`
}

const renderer = async() => {
    let link =  await getLink()
    injectLink(link)
}

button.onclick = renderer