import MOCK_DATA from "../data/MOCK_DATA.json"

export function dataRequest () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // const productsByCategory = MOCK_DATA.filter((item) => item.category === category)
            resolve(MOCK_DATA)
        }, 2000)
    })
}