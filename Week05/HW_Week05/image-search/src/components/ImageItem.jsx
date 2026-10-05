const ImageItem = (props) => {
  const {image} = props

  return (
    <figure className="mb-4 break-inside-avoid">
      <img src={image.urls.small} alt={image.alt_description} className="w-full rounded" />
      <figcaption className="pt-2 text-sm text-gray-600">
        Photo by{' '}
        <a
          href={image.user.links.html}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline"
        >
          {image.user.name}
        </a>{' '}
        on Unsplash
      </figcaption>
    </figure>
  )
}

export default ImageItem
