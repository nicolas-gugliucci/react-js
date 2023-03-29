import MOCK_DATA from "../data/MOCK_DATA.json"

export function dataRequest () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(MOCK_DATA)
        }, 1000)
    })
}