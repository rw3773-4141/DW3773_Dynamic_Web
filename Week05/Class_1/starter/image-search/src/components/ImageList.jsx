import ImageItem from './ImageItem'

const ImageList = (props) => {
  const {images} = props

  const renderedImages = images.map((image) => {
    return <ImageItem key={image.id} image={image} />
  })

  return <div className="columns-2 md:columns-3 gap-4 p-4">{renderedImages}</div>
}

export default ImageList
