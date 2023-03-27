import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

//for Delete Button, when there is a click, you click the request associated with that id?
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: new Date().toISOString()

            }
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)

// converts the description to a list element
// "request_delete" button deletes targeted description based on the request id
export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

// the following keeps everything in the same list element so each description has the plumber selection and deletion button
const convertRequestToListElement = (requestObject) => {
    return `<li> ${requestObject.description}
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${requestObject.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
    </select>
    <button class="request_delete"
        id="request--${requestObject.id}">
        Delete
        </button>
    
    </li>`
}

    let html = `
        <ul>
            ${
                //going through each request object, finding the description, and then joining them together
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `
    return html
}