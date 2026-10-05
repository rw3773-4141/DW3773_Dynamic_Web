import {useState} from 'react'
import Button from '../components/Button'
import Panel from '../components/Panel'
import ProgressBar from '../components/ProgressBar'

const ProgressBarPage = () => {
  const [progress, setProgress] = useState(50)

  return (
    <div>
      <h1 className="mb-4 text-3xl">Progress Bar</h1>
      <Panel className="max-w-md p-6">
        <ProgressBar label="Homework progress" value={progress} />
        <div className="mt-5 flex gap-3">
          <Button secondary onClick={() => setProgress(progress - 10)}>
            -10%
          </Button>
          <Button primary onClick={() => setProgress(progress + 10)}>
            +10%
          </Button>
        </div>
      </Panel>
    </div>
  )
}

export default ProgressBarPage
