import {useState} from "react";
import styles from './App.module.scss';
import {Link, Outlet} from "react-router-dom";
import imageExample from '@/assets/imageExample.png';
import dThomas from '@/assets/D_Thomas.jpg';
import UlbiIcon from '@/assets/app-image.svg';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const errorHandler = () => {
        throw new Error('error')
    }

    return (
        <div data-testid={'AppDataTestId'}>
            <h1 data-testid={'Some test id'}>PLATFORM={__PLATFORM__}</h1>
            <div>
                <img width={300} src={imageExample} alt="imageExample"/>
                <img width={300} src={dThomas} alt="dThomas" />
                <UlbiIcon className={styles.icon} width={50} height={50} />
            </div>
            <Link to={'/'}>home</Link><br/>
            <Link to={'/about'}>about</Link><br/>
            <Link to={'/shop'}>shop</Link><br/>
            <h2 className={styles.value}>{count}</h2>
            <button className={styles.button} onClick={() => setCount(prevState => prevState - 1)}><span>-</span></button>
            <button className={styles.button} onClick={() => setCount(prevState => prevState + 1)}><span>+</span></button>
            <button onClick={errorHandler}>error</button>
            <Outlet />
        </div>
    )
}
