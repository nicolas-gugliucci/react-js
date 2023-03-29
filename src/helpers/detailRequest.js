import MOCK_DATA from "../data/MOCK_DATA.json"

export function detailRequest (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const itemDetail = MOCK_DATA.find((item) => item.id === Number(id))
            resolve(itemDetail)
        }, 500)
    })
}