import Button from '../components/Button'
import {GoBell, GoTrash} from 'react-icons/go'

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      <div className="mb-3">
        <Button primary onClick={() => console.log('Primary clicked!')}>
          <GoBell />
          Buy Now
        </Button>
      </div>
      <div className="mb-3">
        <Button secondary className='mt-8' >
          <GoTrash />
          Learn More
        </Button>
      </div>
      <div className="mb-3">
        <Button success>Buy Now</Button>
      </div>
      <div className="mb-3">
        <Button danger>Buy Now</Button>
      </div>
      <div className="mb-3">
        <Button warning>Buy Now</Button>
      </div>
      <div className="mb-3">
        <Button secondary outline>Buy Now</Button>
      </div>
      <div className="mb-3">
        <Button primary rounded>Buy Now</Button>
      </div>
      <div className="mb-3">
        <Button warning outline rounded>Buy Now</Button>
      </div>


      {/* error case, only one color variant can be used at a time */}
      {/* <div className="mb-3">
        <Button primary secondary rounded>Buy Now</Button>
      </div> */}


      {/* <button className="px-8 py-3 bg-blue-500 text-white border border-blue-500">Click Me</button> */}

    </>
  )
}


export default ButtonPage
