let baixar = document.querySelector("#baixar")
let recarregar = document.querySelector("#recarregar")
let QR = document.querySelector("#QR")
let erro = document.querySelector("h2")

function limpar() {
    let url_pesq = document.querySelector("#url")
    QR.style.display = "none"
    QR.src = undefined
    url_pesq.value = ""
    baixar.style.background = "rgb(186,186,186)"
    recarregar.style.background = "rgb(186,186,186)"
}

document.addEventListener("keyup", ()=>{
    let url = document.querySelector("#url").value
    if(url.length >= 1) {
        QR.style.display = "block"
        let api = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${url}`
        QR.src = api
        baixar.style.background = "white"
        recarregar.style.background = "white"
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
            erro.style.display = "none"
            a.href = URL.createObjectURL(resp)
            a.download = "qr.png"
            document.body.appendChild(a)
            a.click()
            URL.revokeObjectURL(a.href)
        })
        .catch(()=>{
            erro.style.display = "block"
        })
    }
})