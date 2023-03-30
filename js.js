let baixar = document.querySelector("#baixar")
let recarregar = document.querySelector("#recarregar")
let QR = document.querySelector("#QR")

function limpar() {
    let url_pesq = document.querySelector("#url")
    QR.style.display = "none"
    QR.src = undefined
    url_pesq.value = ""
}

document.addEventListener("keyup", ()=>{
    let url = document.querySelector("#url").value
    if(url.length >= 1) {
        QR.style.display = "block"
        let api = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${url}`
        QR.src = api
    } if(url.length === 0) {
        limpar()
    }
})

recarregar.addEventListener("click", ()=>{
    limpar()
})

baixar.addEventListener("click", ()=>{
    let url = document.querySelector("#url").value
    let a = document.createElement("a")
    a.style.display = "none"
    if(url.length >= 1) {
        fetch(`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${url}`)
        .then(resp => resp.blob())
        .then((resp)=>{
            a.href = URL.createObjectURL(resp)
            a.download = "qr.png"
            document.body.appendChild(a)
            a.click()
            URL.revokeObjectURL(a.href)
        })
    }
})