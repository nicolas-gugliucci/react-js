import './ItemSize.scss'

export function ItemSize ({item, radioValue, setRadioValue, size}) {

const sizes = [
    { name: 'XS', value: '0' },
    { name: 'S', value: '1' },
    { name: 'M', value: '2' },
    { name: 'L', value: '3' },
    { name: 'XL', value: '4' },
];

const notSizeStyle = (i) => (!item.availability.size[i]?"notAvailable":{})
const sizeStyle = (i) => {
    if (item.availability.size[i] && item.availability.stock[i]) {
        if (radioValue === i){
            return "available checked"
        }else{
            return "available"
        }
    }else{
        return "disabled"
    }
}

    return (
        <div>
            {size?
                <h4>Size</h4>
                :
                <div></div>
            }
            <form className="detailSize">
                {sizes.map((radio, idx) => (
                    <div key={idx} className={notSizeStyle(radio.value)}>
                        <input type="radio" id={radio.name} value={radio.value} name="size" onChange={(e) => setRadioValue(e.currentTarget.value)} disabled={item.availability.stock[radio.value]===0}/>
                        <label htmlFor={radio.name} className={sizeStyle(radio.value)}>{radio.name}</label>
                    </div>
                ))}
            </form>
            <div className="detailStock">
                {item.availability.stock[radioValue]!=null&&
                    <p>{`Stock: ${item.availability.stock[radioValue]}`}</p>
                }
            </div>
        </div>
    )
}