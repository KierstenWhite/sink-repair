import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

const mainContainer = document.querySelector("#container")

// now then function invokes each import and adds it to html
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then (() => fetchCompletions())
        .then (
            () => {
        mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)