import MOCK_DATA from "../data/MOCK_DATA.json"

export function colorVarietyRequest (originalItem) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const ItemsColors = MOCK_DATA.filter((item) => (item.name === originalItem.name)&&(item.color !== originalItem.color))
            resolve(ItemsColors)
        }, 1000)
    })
}