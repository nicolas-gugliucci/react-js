import './ItemSize.scss'

export function ItemSize ({item, radioValue, setRadioValue, size}) {

const sizes = [
    { name: 'XS', value: '0' },
    { name: 'S', value: '1' },
    { name: 'M', value: '2' },
    { name: 'L', value: '3' },
    { name: 'XL', value: '4' },
    { name: 'Unique size', value: '-1' }
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
            <h4>Size</h4>
            <form className="detailSize">
            {size?
                sizes.map((radio, idx) => (
                    <div key={idx} className={notSizeStyle(radio.value)}>
                        <input type="radio" id={radio.name} value={radio.value} name="size" onChange={(e) => setRadioValue(e.currentTarget.value)} disabled={item.availability.stock[radio.value]===0}/>
                        <label htmlFor={radio.name} className={sizeStyle(radio.value)}>{radio.name}</label>
                    </div>
                ))
                :
                <div className='uniqueSizeDiv'>
                    {setRadioValue("-1")}
                    <input type="radio" value={sizes[5].value} name="size" defaultChecked={item.availability.stock[0]!==0} disabled={item.availability.stock[0]===0}/>
                    <label htmlFor={sizes[5].name} className={item.availability.stock[0]?"available checked":"disabled"}>{sizes[5].name}</label>
                </div>
            }
            </form>
            <div className="detailStock">
                {radioValue === '-1' 
                    ? item.availability.stock[0]!= null
                        && <p>{`Stock: ${item.availability.stock[0]}`}</p>
                    : item.availability.stock[radioValue]!= null
                        &&<p>{`Stock: ${item.availability.stock[radioValue]}`}</p>
                }
            </div>
        </div>
    )
}