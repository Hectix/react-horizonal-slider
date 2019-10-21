import React from 'react';
import {useSpring, animated} from 'react-spring';
import { useScroll } from "react-use-gesture";

const movies = [
    "https://images-na.ssl-images-amazon.com/images/I/71cY3tnGi%2BL._SX425_.jpg",
    "https://cdn.dribbble.com/users/1195991/screenshots/2951227/narcos.jpg",
    "https://iamessex.files.wordpress.com/2019/04/umbrella-academy-wide-poster.jpg",
    "https://cdn.onebauer.media/one/media/5d18/823d/2851/e25e/3066/1778/tcTjAGX9YPCMCrnXmbgXKKtECgh.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
    "https://occ-0-2430-2433.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABfZPUk0kEnsnPzcCrUy2XZ1r20p5G9aadAQ9wzGMz4GhiTAH-UYg5O4pIFjExOoG9UWlWcTfLdtLb2ZFTD_U9uQ6TUSNBjJubjFmBSMazMrk0KeO4BOWGWBEBdwk.jpg?r=216"
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
