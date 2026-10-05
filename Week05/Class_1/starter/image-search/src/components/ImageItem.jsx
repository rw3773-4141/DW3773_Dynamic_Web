const ImageItem = (props) => {
  const {image} = props

  return (
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className="w-full mb-4 rounded"
    />
  )
}

export default ImageItem
