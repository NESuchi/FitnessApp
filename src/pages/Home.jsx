import Intro from '../components/intro/intro';
import ImgA from '../assets/dummy.png';
import ImgB from '../assets/dummy.png';
import ImgC from '../assets/dummy.png';

import Seperator from '../components/seperator/seperator';
import ImgD from '../assets/Dummy-2.png';

import TextPic from '../components/textPic/textPic';
import ImgE from '../assets/dummy.png';

const Home = () => {
    return (
        <div>
            <Intro
                titel="Willkommen bei FuwaFitness"
                text="Mit dieser Fitness App kannst du deine Ernährung tracken, Übungen aufzeichnen und erstellen, verschiedene Profile erstellen und das alles in deinem Persönlichen Kalender aufzeichnen. Mit Fuwa Fitness behältst du immer den Überblick! Worauf wartest du Registriere dich kostenos oder melde dich sofort gleich an"
                imgHigh={ImgA}
                imgCenter={ImgB}
                imgLow={ImgC}
            />

            <Seperator
                titel="Lorem Ipsum"
                text="Lorem Ipsum dolor set Aminus"
                img={ImgD}
            />

            <TextPic
                titel="Willkommen bei FuwaFitness"
                text="Mit dieser Fitness App kannst du deine Ernährung tracken, Übungen aufzeichnen und erstellen, verschiedene Profile erstellen und das alles in deinem Persönlichen Kalender aufzeichnen. Mit Fuwa Fitness behältst du immer den Überblick! Worauf wartest du Registriere dich kostenos oder melde dich sofort gleich an"
                img={ImgE}
            />
        </div>
    )
}

export default Home;