import './ItemImages.scss'

export function ItemImages ({item, img, setImg}) {
    return (
        <div className="datailImages">
            {item.images.secondary.length!==0&&
                <div className="detailImagesColumn">
                    <img id={item.images.main}  onClick={(e) => setImg(e.currentTarget.id)} src={`${item.images.main}`} alt={item.name}/>
                    {item.images.secondary.map((image) => <img key={image} id={image} onClick={(e) => setImg(e.currentTarget.id)} src={`${image}`} alt={item.name}/>)}
                </div>
            }
            <img src={`${img}`} alt={item.name}/>
        </div>
    )
}