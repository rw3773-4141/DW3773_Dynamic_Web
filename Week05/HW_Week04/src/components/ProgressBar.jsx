const ProgressBar = ({value, max = 100, label}) => {
  const safeValue = Math.min(Math.max(value, 0), max)
  const percentage = (safeValue / max) * 100

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div
        aria-label={label}
        aria-valuemax={max}
        aria-valuemin="0"
        aria-valuenow={safeValue}
        className="h-4 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{width: `${percentage}%`}}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
