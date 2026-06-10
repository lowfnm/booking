import styledLoader from './styled.module.css'

const Loader = () => {
  return (
    <div
      className={`${styledLoader.loaderDots} loader-dots relative mt-2 block h-5 w-20`}
    >
      {new Array(4).fill(null).map((_, i) => (
        <div
          key={i}
          className={`absolute top-0 mt-1 h-3 w-3 rounded-full bg-gray-300`}
        />
      ))}
    </div>
  )
}

export default Loader
