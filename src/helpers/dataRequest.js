import MOCK_DATA from "../data/MOCK_DATA"

export function dataRequest () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(MOCK_DATA)
        }, 0)
    })
}