import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useSpring, animated} from 'react-spring';
import { useScroll } from "react-use-gesture";


const movies = [
    "https://cdn.onebauer.media/one/media/5d18/823d/2851/e25e/3066/1778/tcTjAGX9YPCMCrnXmbgXKKtECgh.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
    "https://cdn.onebauer.media/one/media/5d18/823d/2851/e25e/3066/1778/tcTjAGX9YPCMCrnXmbgXKKtECgh.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
    "https://cdn.onebauer.media/one/media/5d18/823d/2851/e25e/3066/1778/tcTjAGX9YPCMCrnXmbgXKKtECgh.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
    "https://cdn.onebauer.media/one/media/5d18/823d/2851/e25e/3066/1778/tcTjAGX9YPCMCrnXmbgXKKtECgh.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
    "https://cdn.onebauer.media/one/media/5d18/823d/2851/e25e/3066/1778/tcTjAGX9YPCMCrnXmbgXKKtECgh.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
];

const App = () => {
    const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
    }));

    // Helper function to clamp the delta value so it never gets more than 30 and less than -30. If delta value is more than 30, animation looks ugly.
    const clamp = (value, clampAt = 30) => {
        if (value > 0) {
            return value > clampAt ? clampAt : value;
        } else {
            return value < -clampAt ? -clampAt : value;
        }
    };

    const bind = useScroll(event => {
        set({
            transform: `perspective(500px) rotateY(${
                event.scrolling ? clamp(event.delta[0]) : 0
            }deg)`
        });
    });

    return (
        <>
            <h1>Use device simulation to see the scrolling animation</h1>
            <div className="container" {...bind()}>
                {movies.map(src => (
                    <animated.div
                        key={src}
                        className="card"
                        style={{
                            ...style,
                            backgroundImage: `url(${src})`
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
