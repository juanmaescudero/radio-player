import { ICardRadioCoverProps } from "./cards.interface";
import styles from "./cards.module.css"

export default function CardRadioCover (props: ICardRadioCoverProps) {
    const { cover, program } = props

    return (
        <div className={styles["card-radio-cover"]}>
            <img className={styles.cover} src={cover}/>
            <div className={styles["program-container"]}>
                <p className={styles.program}>{program}</p>
            </div>
        </div>
    )
}