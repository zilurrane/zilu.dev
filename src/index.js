import React from 'react';
import ReactDOM from 'react-dom';

import CatImage from './assets/kitten.jpg';
import styles from './index.css';

const App = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.caption}>Welcome to React Webpack Starter</h1>
            <img src={CatImage} />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));
