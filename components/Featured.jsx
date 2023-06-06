import { useState } from "react"
import styles from "../styles/Featured.module.css"
import Image from "next/image"

const Featured = () => {
  const [imageNumber, setNumber] = useState(0);

  const images = [
    "/img/featured1.png",
    "/img/featured4.png",
    "/img/featured5.png",
  ]

  const handleArrow = (direction) => {
    if (direction === "l") {
      setNumber(imageNumber !== 0 ? imageNumber - 1 : 2)
    }
    if (direction === "r") {
      setNumber(imageNumber !== 2 ? imageNumber + 1 : 0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" fill={true} style={{ objectFit: "contain" }} />
      </div>
      <div className={styles.wrapper} style={{transform: `translateX(${-100*imageNumber}vw)`}}>
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}  >
            <Image src={img} alt="" fill={true} style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow("r")}>
        <Image src="/img/arrowr.png" alt="" fill={true} style={{ objectFit: "contain" }} />
      </div>
    </div>
  )
}

export default Featured